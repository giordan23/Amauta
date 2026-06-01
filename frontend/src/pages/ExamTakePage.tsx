import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router';
import { examService, type ExamStartResponse } from '@/services/examService';

interface ExamConfig {
  timeDuration: number;
  showTimer: 'yes' | 'no' | 'last30';
  showResults: boolean;
  allowReview: boolean;
  autoSave: boolean;
}

const letters = ['A', 'B', 'C', 'D', 'E'];

export function ExamTakePage() {
  const navigate = useNavigate();
  const [examData, setExamData] = useState<ExamStartResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNavigator, setShowNavigator] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedRef = useRef<string>('');

  // Load exam from session storage
  useEffect(() => {
    const examId = sessionStorage.getItem('currentExamId');
    const configStr = sessionStorage.getItem('examConfig');
    
    if (!examId) {
      navigate('/app/exam/config');
      return;
    }

    const config: ExamConfig = configStr ? JSON.parse(configStr) : { timeDuration: 180, showTimer: 'yes', showResults: true, allowReview: false, autoSave: true };
    
    // Start timer if enabled
    if (config.showTimer !== 'no') {
      setTimeLeft(config.timeDuration * 60);
    }

    loadExam(examId);
  }, []);

  const loadExam = async (examId: string) => {
    try {
      setLoading(true);
      const response = await examService.getExam(examId);
      setExamData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar el examen');
    } finally {
      setLoading(false);
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSelectOption = useCallback((questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  }, []);

  const toggleFlag = useCallback((questionId: string) => {
    setFlagged(prev => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  }, []);

  // Auto-save debounce
  useEffect(() => {
    if (!examData) return;
    const configStr = sessionStorage.getItem('examConfig');
    const config: ExamConfig = configStr ? JSON.parse(configStr) : null;
    if (!config?.autoSave) return;

    const currentAnswersStr = JSON.stringify(answers);
    if (currentAnswersStr === lastSavedRef.current) return;

    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    setSaveStatus('saving');
    autoSaveTimerRef.current = setTimeout(async () => {
      const examId = sessionStorage.getItem('currentExamId');
      if (!examId) return;
      try {
        for (const question of examData.questions) {
          if (answers[question.id]) {
            await examService.answerQuestion(examId, question.id, answers[question.id]);
          }
        }
        lastSavedRef.current = currentAnswersStr;
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } catch {
        setSaveStatus('idle');
      }
    }, 1500);
  }, [answers, examData]);

  const handleNext = () => {
    if (examData && currentIndex < examData.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!examData) return;
    
    try {
      setSubmitting(true);
      const examId = sessionStorage.getItem('currentExamId');
      
      // Answer all unanswered questions
      for (const question of examData.questions) {
        if (answers[question.id]) {
          try {
            await examService.answerQuestion(examId!, question.id, answers[question.id]);
          } catch {
            // Ignore individual answer errors
          }
        }
      }
      
      // Complete exam
      const result = await examService.completeExam(examId!);
      
      // Store results
      sessionStorage.setItem('examResult', JSON.stringify(result));
      navigate('/app/exam/results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el examen');
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="exam-take-container">
        <div className="exam-take-content">
          <div className="flex-center" style={{ minHeight: '300px' }}>
            <div className="skeleton" style={{ width: '200px', height: '24px' }}></div>
            <p style={{ marginTop: 'var(--space-4)' }}>Cargando preguntas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !examData) {
    return (
      <div className="exam-take-container">
        <div className="exam-take-content">
          <div className="ui-card" style={{ borderColor: 'var(--color-error)' }}>
            <div className="ui-card-content">
              <p style={{ color: 'var(--color-error)', textAlign: 'center' }}>{error || 'Examen no encontrado'}</p>
              <button 
                className="ui-action-button"
                onClick={() => navigate('/app/exam/config')}
                style={{ marginTop: 'var(--space-4)' }}
              >
                Volver a configuración
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = examData.questions[currentIndex];
  const totalQuestions = examData.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="exam-take-container">
      {/* Header */}
      <header className="exam-take-header">
        <div className="exam-header-info">
          <span className="exam-header-title">Simulacro</span>
          <span className="exam-header-progress">{currentIndex + 1} / {totalQuestions}</span>
        </div>

        <div className="exam-header-actions">
          {/* Save status */}
          {saveStatus !== 'idle' && (
            <span className={`save-indicator save-indicator--${saveStatus}`}>
              {saveStatus === 'saving' ? 'Guardando...' : '✓ Guardado'}
            </span>
          )}
          {/* Toggle navigator */}
          <button
            className={`exam-navigator-toggle ${showNavigator ? 'active' : ''}`}
            onClick={() => setShowNavigator(v => !v)}
            title="Navegador de preguntas"
          >
            ☰
          </button>
          {timeLeft !== null && (
            <div className={`exam-timer ${timeLeft < 300 ? 'exam-timer-warning' : ''}`}>
              ⏱️ {formatTime(timeLeft)}
            </div>
          )}
        </div>
      </header>

      {/* Progress bar */}
      <div className="exam-progress-bar">
        <div className="exam-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question content */}
      <div className="exam-take-content">
        {/* Navigator sidebar (mobile: bottom sheet style) */}
        {showNavigator && (
          <div className="question-navigator">
            <div className="navigator-header">
              <span className="navigator-title">Preguntas</span>
              <button className="navigator-close" onClick={() => setShowNavigator(false)}>×</button>
            </div>
            <div className="navigator-stats">
              <span className="navigator-stat">
                <span className="navigator-dot navigator-dot--answered" />
                {answeredCount} respondidas
              </span>
              <span className="navigator-stat">
                <span className="navigator-dot navigator-dot--flagged" />
                {flagged.size} marcadas
              </span>
            </div>
            <div className="navigator-grid">
              {examData.questions.map((q, i) => {
                const isAnswered = !!answers[q.id];
                const isFlagged = flagged.has(q.id);
                const isCurrent = i === currentIndex;
                return (
                  <button
                    key={q.id}
                    className={`nav-question ${isCurrent ? 'nav-question--current' : ''} ${isAnswered ? 'nav-question--answered' : ''} ${isFlagged ? 'nav-question--flagged' : ''}`}
                    onClick={() => { setCurrentIndex(i); setShowNavigator(false); }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="exam-question-card">
          <div className="exam-question-number">
            <span>
              Pregunta {currentIndex + 1}
              {currentQuestion.difficulty && (
                <span className={`exam-difficulty exam-difficulty-${currentQuestion.difficulty.toLowerCase()}`}>
                  {currentQuestion.difficulty}
                </span>
              )}
            </span>
            <button
              className={`flag-button ${flagged.has(currentQuestion.id) ? 'flag-button--active' : ''}`}
              onClick={() => toggleFlag(currentQuestion.id)}
              title={flagged.has(currentQuestion.id) ? 'Desmarcar' : 'Marcar para revisar'}
            >
              ⚑
            </button>
          </div>

          <div className="exam-question-text">
            {currentQuestion.text}
          </div>

          {currentQuestion.imageUrl && (
            <div className="exam-question-image">
              <img src={currentQuestion.imageUrl} alt="Pregunta" />
            </div>
          )}

          <div className="exam-options-list">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentQuestion.id] === option.id;

              return (
                <button
                  key={option.id}
                  className={`exam-option ${isSelected ? 'exam-option-selected' : ''}`}
                  onClick={() => handleSelectOption(currentQuestion.id, option.id)}
                >
                  <span className="exam-option-letter">{letters[idx]}</span>
                  <span className="exam-option-text">{option.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="exam-navigation">
          <button
            className="exam-nav-button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            ← Anterior
          </button>

          <div className="exam-dots">
            {Array.from({ length: Math.min(totalQuestions, 20) }, (_, i) => {
              const q = examData.questions[i];
              const isAnswered = !!answers[q?.id];
              const isCurrent = i === currentIndex;
              return (
                <span
                  key={i}
                  className={`exam-dot ${isCurrent ? 'exam-dot-current' : ''} ${isAnswered ? 'exam-dot-answered' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                />
              );
            })}
            {totalQuestions > 20 && <span className="exam-dots-more">+{totalQuestions - 20}</span>}
          </div>

          {currentIndex < totalQuestions - 1 ? (
            <button
              className="exam-nav-button"
              onClick={handleNext}
            >
              Siguiente →
            </button>
          ) : (
            <button
              className="exam-nav-button exam-nav-button-submit"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Enviando...' : 'Terminar Simulacro'}
            </button>
          )}
        </div>

        {/* Stats footer */}
        <div className="exam-stats-footer">
          <span>Respondidas: {answeredCount}/{totalQuestions}</span>
          <button
            className="exam-submit-link"
            onClick={handleSubmit}
            disabled={submitting || answeredCount === 0}
          >
            Terminar y ver resultados →
          </button>
        </div>
      </div>
    </div>
  );
}
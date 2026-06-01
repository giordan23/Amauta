import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import type { ExamCompleteResponse } from '@/services/examService';

const letters = ['A', 'B', 'C', 'D', 'E'];

type QuestionResult = 'correct' | 'incorrect' | 'unanswered';

export function ExamReviewPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState<ExamCompleteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNavigator, setShowNavigator] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('examResult');
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        navigate('/app/exam/config');
      }
    } else {
      navigate('/app/exam/config');
    }
    setLoading(false);
  }, []);

  if (loading || !result) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="flex-center" style={{ minHeight: '300px' }}>
            <div className="skeleton" style={{ width: '200px', height: '24px' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const { examAttempt, answers, questions } = result;

  // Build a map of questionId -> answer for quick lookup
  const answerMap: Record<string, { selectedOptionId: string; isCorrect: boolean }> = {};
  answers.forEach(a => {
    answerMap[a.questionId] = a;
  });

  // Determine result for each question
  const getQuestionResult = (questionId: string): QuestionResult => {
    const answer = answerMap[questionId];
    if (!answer) return 'unanswered';
    return answer.isCorrect ? 'correct' : 'incorrect';
  };

  const correctCount = answers.filter(a => a.isCorrect).length;
  const totalQuestions = questions.length;
  const incorrectCount = totalQuestions - correctCount - answers.filter(a => !answerMap[a.questionId]?.isCorrect && answerMap[a.questionId]).length;
  const unansweredCount = totalQuestions - answers.length;

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answerMap[currentQuestion.id];
  const questionResult = getQuestionResult(currentQuestion.id);

  const handleBackToResults = () => {
    navigate('/app/exam/results');
  };

  const handleBackToHome = () => {
    sessionStorage.removeItem('currentExamId');
    sessionStorage.removeItem('examConfig');
    sessionStorage.removeItem('examResult');
    navigate('/app/home');
  };

  const getQuestionCardClass = (result: QuestionResult): string => {
    switch (result) {
      case 'correct': return 'review-card review-card--correct';
      case 'incorrect': return 'review-card review-card--incorrect';
      default: return 'review-card review-card--unanswered';
    }
  };

  const getOptionClass = (optionId: string, isCorrectOption: boolean, selectedOptionId: string | undefined) => {
    if (isCorrectOption) {
      return 'review-option review-option--correct';
    }
    if (selectedOptionId === optionId && !isCorrectOption) {
      return 'review-option review-option--incorrect';
    }
    return 'review-option';
  };

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Header */}
        <div className="review-header">
          <div className="review-header-info">
            <h2 className="review-title">Revisión de Respuestas</h2>
            <p className="review-subtitle">
              Universidad: {examAttempt.university?.name || 'N/A'}
            </p>
          </div>
          <div className="review-header-actions">
            <button className="ui-action-button" onClick={handleBackToResults}>
              ← Volver a resultados
            </button>
            <button className="ui-action-button" onClick={handleBackToHome}>
              🏠 Inicio
            </button>
          </div>
        </div>

        {/* Summary bar */}
        <div className="review-summary">
          <div className="review-stat review-stat--correct">
            <span className="review-stat-number">{correctCount}</span>
            <span className="review-stat-label">Correctas</span>
          </div>
          <div className="review-stat review-stat--incorrect">
            <span className="review-stat-number">{incorrectCount}</span>
            <span className="review-stat-label">Incorrectas</span>
          </div>
          <div className="review-stat review-stat--unanswered">
            <span className="review-stat-number">{unansweredCount}</span>
            <span className="review-stat-label">Sin responder</span>
          </div>
          <div className="review-stat">
            <span className="review-stat-number">{totalQuestions}</span>
            <span className="review-stat-label">Total</span>
          </div>
        </div>

        {/* Question navigator toggle */}
        <div className="review-navigator-toggle">
          <button
            className={`exam-navigator-toggle ${showNavigator ? 'active' : ''}`}
            onClick={() => setShowNavigator(v => !v)}
          >
            ☰ Navegador de preguntas
          </button>
        </div>

        {/* Main content area */}
        <div className="review-main">
          {/* Navigator sidebar */}
          {showNavigator && (
            <div className="question-navigator">
              <div className="navigator-header">
                <span className="navigator-title">Preguntas</span>
                <button className="navigator-close" onClick={() => setShowNavigator(false)}>×</button>
              </div>
              <div className="navigator-stats">
                <span className="navigator-stat">
                  <span className="navigator-dot navigator-dot--correct" />
                  {correctCount} correctas
                </span>
                <span className="navigator-stat">
                  <span className="navigator-dot navigator-dot--incorrect" />
                  {incorrectCount} incorrectas
                </span>
              </div>
              <div className="navigator-grid">
                {questions.map((q, i) => {
                  const result = getQuestionResult(q.id);
                  const isCurrent = i === currentIndex;
                  return (
                    <button
                      key={q.id}
                      className={`nav-question nav-question--review nav-question--${result} ${isCurrent ? 'nav-question--current' : ''}`}
                      onClick={() => { setCurrentIndex(i); setShowNavigator(false); }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question card */}
          <div className={getQuestionCardClass(questionResult)}>
            <div className="review-question-header">
              <span className="review-question-number">
                Pregunta {currentIndex + 1}
                <span className={`result-badge result-badge--${questionResult}`}>
                  {questionResult === 'correct' && '✓ Correcta'}
                  {questionResult === 'incorrect' && '✗ Incorrecta'}
                  {questionResult === 'unanswered' && '— Sin responder'}
                </span>
              </span>
              <span className="review-question-index">
                {currentIndex + 1} / {totalQuestions}
              </span>
            </div>

            <div className="review-question-text">
              {currentQuestion.text}
            </div>

            <div className="review-options-list">
              {currentQuestion.options.map((option, idx) => {
                const isCorrectOption = option.isCorrect;
                const selectedOptionId = currentAnswer?.selectedOptionId;
                const optionClass = getOptionClass(option.id, isCorrectOption, selectedOptionId);

                return (
                  <div key={option.id} className={optionClass}>
                    <span className="review-option-letter">{letters[idx]}</span>
                    <span className="review-option-text">{option.text}</span>
                    {isCorrectOption && (
                      <span className="review-option-badge review-option-badge--correct">✓</span>
                    )}
                    {selectedOptionId === option.id && !isCorrectOption && (
                      <span className="review-option-badge review-option-badge--incorrect">✗</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation if available */}
            {typeof (currentQuestion as any).explanation === 'string' && (currentQuestion as any).explanation && (
              <div className="review-explanation">
                <strong>Explicación:</strong> {(currentQuestion as any).explanation}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="review-navigation">
            <button
              className="exam-nav-button"
              onClick={() => setCurrentIndex(prev => prev - 1)}
              disabled={currentIndex === 0}
            >
              ← Anterior
            </button>

            <div className="exam-dots">
              {questions.slice(0, 20).map((q, i) => {
                const result = getQuestionResult(q.id);
                return (
                  <span
                    key={i}
                    className={`exam-dot exam-dot--review exam-dot--${result} ${i === currentIndex ? 'exam-dot-current' : ''}`}
                    onClick={() => setCurrentIndex(i)}
                  />
                );
              })}
              {totalQuestions > 20 && <span className="exam-dots-more">+{totalQuestions - 20}</span>}
            </div>

            {currentIndex < totalQuestions - 1 ? (
              <button
                className="exam-nav-button"
                onClick={() => setCurrentIndex(prev => prev + 1)}
              >
                Siguiente →
              </button>
            ) : (
              <button
                className="exam-nav-button exam-nav-button-submit"
                onClick={handleBackToResults}
              >
                Ver resultados
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
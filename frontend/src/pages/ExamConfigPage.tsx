import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { examService } from '@/services/examService';
import { universityService } from '@/services/universityService';

interface University {
  id: string;
  name: string;
  shortName: string;
  questionsCount?: number;
}

const TIME_OPTIONS = [
  { value: 180, label: '3 horas (180 minutos)' },
  { value: 120, label: '2 horas (120 minutos)' },
  { value: 60, label: '1 hora (60 minutos)' },
  { value: 30, label: '30 minutos' },
];

const TIMER_OPTIONS = [
  { value: 'yes', label: 'Sí, mostrar tiempo' },
  { value: 'no', label: 'No mostrar tiempo' },
  { value: 'last30', label: 'Solo últimos 30 minutos' },
];

const QUESTION_COUNT_OPTIONS = [
  { value: 10, label: '10 preguntas' },
  { value: 20, label: '20 preguntas' },
  { value: 30, label: '30 preguntas' },
  { value: 50, label: '50 preguntas' },
  { value: 100, label: '100 preguntas' },
];

export function ExamConfigPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState<University[]>([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [questionCount, setQuestionCount] = useState(10);
  const [timeDuration, setTimeDuration] = useState(180);
  const [showTimer, setShowTimer] = useState<'yes' | 'no' | 'last30'>('yes');
  const [showResults, setShowResults] = useState(true);
  const [allowReview, setAllowReview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  // Load universities on mount
  useEffect(() => {
    async function loadUniversities() {
      try {
        const unis = await universityService.getUniversities();
        // Only show universities that have questions
        const withQuestions = unis.filter(u => u.questionsCount && u.questionsCount > 0);
        setUniversities(withQuestions);
        if (withQuestions.length > 0) {
          setSelectedUniversity(withQuestions[0].id);
        }
      } catch (err) {
        console.error('Failed to load universities:', err);
        setError('No se pudieron cargar las universidades');
      } finally {
        setUniversitiesLoading(false);
      }
    }
    loadUniversities();
  }, []);

  const handleStartExam = async () => {
    if (!selectedUniversity) {
      setError('Por favor selecciona una universidad');
      return;
    }
    try {
      setLoading(true);
      setError(null);

      const result = await examService.startExam(selectedUniversity, questionCount);

      // Store exam attempt ID for the take page
      sessionStorage.setItem('currentExamId', result.examAttempt.id);
      sessionStorage.setItem('examConfig', JSON.stringify({
        timeDuration,
        showTimer,
        showResults,
        allowReview,
        autoSave,
      }));

      navigate('/app/exam/take');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar el examen');
      setLoading(false);
    }
  };

  const handleOptionChange = (option: 'showResults' | 'allowReview' | 'autoSave') => {
    if (option === 'showResults') setShowResults(!showResults);
    if (option === 'allowReview') setAllowReview(!allowReview);
    if (option === 'autoSave') setAutoSave(!autoSave);
  };

  return (
    <div className="exam-config-container">
      <div className="exam-config-content">
        {/* Header Section */}
        <header className="exam-config-header">
          <h1 className="exam-config-title">
            Simulacro de Admisión
          </h1>
          <p className="exam-config-description">
            Selecciona una universidad y la cantidad de preguntas para tu simulacro.
          </p>
        </header>

        {/* Form Sections */}
        <div className="page-content">
          {/* Section 1: University & Question Count */}
          <div className="ui-card">
            <div className="ui-card-header">
              <div className="ui-card-icon">🎯</div>
              <h3 className="ui-card-title">Configuración del Simulacro</h3>
            </div>
            <div className="ui-card-content">
              {universitiesLoading ? (
                <p style={{ color: 'var(--color-text-secondary)' }}>Cargando universidades...</p>
              ) : universities.length === 0 ? (
                <p style={{ color: 'var(--color-error)' }}>
                  No hay universidades disponibles con preguntas en la base de datos.
                </p>
              ) : (
                <div className="config-form-grid">
                  <div className="config-form-group">
                    <label className="config-form-label">
                      Universidad
                    </label>
                    <select
                      value={selectedUniversity}
                      onChange={(e) => setSelectedUniversity(e.target.value)}
                      className="config-form-select"
                      disabled={loading}
                    >
                      <option value="">-- Selecciona una universidad --</option>
                      {universities.map((uni) => (
                        <option key={uni.id} value={uni.id}>
                          {uni.name} ({uni.questionsCount} preguntas)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="config-form-group">
                    <label className="config-form-label">
                      Número de Preguntas
                    </label>
                    <select
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Number(e.target.value))}
                      className="config-form-select"
                      disabled={loading}
                    >
                      {QUESTION_COUNT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Summary of selected university */}
              {selectedUniversity && (
                <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--border-radius-md)' }}>
                  {(() => {
                    const uni = universities.find(u => u.id === selectedUniversity);
                    return uni ? (
                      <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                        <strong>{uni.name}</strong> — {uni.questionsCount} preguntas disponibles en el banco de datos.
                        Se seleccionarán {questionCount} preguntas aleatorias.
                      </p>
                    ) : null;
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Time Configuration */}
          <div className="ui-card">
            <div className="ui-card-header">
              <div className="ui-card-icon">⏱️</div>
              <h3 className="ui-card-title">Configuración de Tiempo</h3>
            </div>
            <div className="ui-card-content">
              <div className="config-form-grid">
                <div className="config-form-group">
                  <label className="config-form-label">
                    Duración del Examen
                  </label>
                  <select
                    value={timeDuration}
                    onChange={(e) => setTimeDuration(Number(e.target.value))}
                    className="config-form-select"
                  >
                    {TIME_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="config-form-group">
                  <label className="config-form-label">
                    Mostrar Cronómetro
                  </label>
                  <select
                    value={showTimer}
                    onChange={(e) => setShowTimer(e.target.value as 'yes' | 'no' | 'last30')}
                    className="config-form-select"
                  >
                    {TIMER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Additional Options */}
          <div className="ui-card">
            <div className="ui-card-header">
              <div className="ui-card-icon">⚙️</div>
              <h3 className="ui-card-title">Opciones Adicionales</h3>
            </div>
            <div className="ui-card-content">
              <div className="config-options-list">
                <label className="config-option">
                  <input
                    type="checkbox"
                    checked={showResults}
                    onChange={() => handleOptionChange('showResults')}
                    className="sr-only"
                  />
                  <div className={`config-option-checkbox ${showResults ? 'config-option-checkbox--checked' : ''}`}>
                    {showResults && (
                      <svg className="config-option-checkbox-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="config-option-text">Mostrar resultados al finalizar</span>
                </label>
                <label className="config-option">
                  <input
                    type="checkbox"
                    checked={allowReview}
                    onChange={() => handleOptionChange('allowReview')}
                    className="sr-only"
                  />
                  <div className={`config-option-checkbox ${allowReview ? 'config-option-checkbox--checked' : ''}`}>
                    {allowReview && (
                      <svg className="config-option-checkbox-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="config-option-text">Permitir revisión de respuestas</span>
                </label>
                <label className="config-option">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={() => handleOptionChange('autoSave')}
                    className="sr-only"
                  />
                  <div className={`config-option-checkbox ${autoSave ? 'config-option-checkbox--checked' : ''}`}>
                    {autoSave && (
                      <svg className="config-option-checkbox-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="config-option-text">Guardar progreso automáticamente</span>
                </label>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="ui-card" style={{ borderColor: 'var(--color-error)', marginBottom: 'var(--space-4)' }}>
              <div className="ui-card-content">
                <p style={{ color: 'var(--color-error)', margin: 0 }}>{error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="config-actions">
            <button
              className="config-action-button config-action-button--primary"
              onClick={handleStartExam}
              disabled={loading || !selectedUniversity || universitiesLoading}
              style={{ opacity: (loading || !selectedUniversity || universitiesLoading) ? 0.7 : 1 }}
            >
              {loading ? 'Iniciando...' : '🚀 Iniciar Simulacro'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

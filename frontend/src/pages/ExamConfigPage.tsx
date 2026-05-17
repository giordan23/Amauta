import { useState } from 'react';
import { useNavigate } from 'react-router';
import { examService } from '@/services/examService';

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

export function ExamConfigPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [timeDuration, setTimeDuration] = useState(180);
  const [showTimer, setShowTimer] = useState<'yes' | 'no' | 'last30'>('yes');
  const [showResults, setShowResults] = useState(true);
  const [allowReview, setAllowReview] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  const handleStartExam = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use UNMSM as the default university for quick start
      const universityId = 'unmsm';
      
      // Start exam with 100 random questions
      const result = await examService.startExam(universityId, 100);
      
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
            Simulacro de 100 Preguntas
          </h1>
          <p className="exam-config-description">
            Inicia un simulacro con 100 preguntas aleatorias del banco de preguntas. 
            Obtén tu puntaje al finalizar.
          </p>
        </header>

        {/* Summary Stats */}
        <div className="exam-config-summary">
          <div className="exam-summary-stat">
            <div className="exam-summary-value">100</div>
            <div className="exam-summary-label">Preguntas</div>
          </div>
          <div className="exam-summary-stat">
            <div className="exam-summary-value">{Math.floor(timeDuration / 60)}h</div>
            <div className="exam-summary-label">Duración</div>
          </div>
          <div className="exam-summary-stat">
            <div className="exam-summary-value">3</div>
            <div className="exam-summary-label">Universidades</div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="page-content">
          {/* Section 1: Exam Type - Quick Start */}
          <div className="ui-card">
            <div className="ui-card-header">
              <div className="ui-card-icon">🎯</div>
              <h3 className="ui-card-title">Tipo de Simulacro</h3>
            </div>
            <div className="ui-card-content">
              <div className="exam-type-grid">
                <div className="exam-type-option exam-type-option--selected">
                  <div className="exam-type-radio exam-type-radio--selected">
                    <div className="exam-type-radio-dot" />
                  </div>
                  <div className="exam-type-content">
                    <div className="exam-type-title">Simulacro Rápido</div>
                    <div className="exam-type-subtitle">100 preguntas aleatorias - 3 horas</div>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                Las preguntas se seleccionan aleatoriamente del banco de preguntas de UNMSM, UNSAAC y UNI.
              </p>
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
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Iniciando...' : '🚀 Iniciar Simulacro de 100 Preguntas'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
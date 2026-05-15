import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';

interface Subject {
  id: string;
  name: string;
  questions: number;
  selected: boolean;
}

interface ExamConfig {
  examType: 'complete' | 'custom';
  subjects: Subject[];
  timeDuration: number;
  showTimer: 'yes' | 'no' | 'last30';
  showResults: boolean;
  allowReview: boolean;
  autoSave: boolean;
}

const DEFAULT_SUBJECTS: Subject[] = [
  { id: 'matematica', name: 'Matemática', questions: 25, selected: true },
  { id: 'razonamiento-verbal', name: 'Razonamiento Verbal', questions: 25, selected: true },
  { id: 'razonamiento-matematico', name: 'Razonamiento Matemático', questions: 20, selected: true },
  { id: 'ciencias-naturales', name: 'Ciencias Naturales', questions: 15, selected: true },
  { id: 'historia-peru', name: 'Historia del Perú', questions: 10, selected: true },
  { id: 'geografia', name: 'Geografía', questions: 5, selected: true },
];

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

  const [config, setConfig] = useState<ExamConfig>({
    examType: 'complete',
    subjects: DEFAULT_SUBJECTS,
    timeDuration: 180,
    showTimer: 'yes',
    showResults: true,
    allowReview: false,
    autoSave: true,
  });

  const totalQuestions = useMemo(() => {
    return config.subjects
      .filter(s => s.selected)
      .reduce((sum, s) => sum + s.questions, 0);
  }, [config.subjects]);

  const handleExamTypeChange = (type: 'complete' | 'custom') => {
    setConfig(prev => ({ ...prev, examType: type }));
  };

  const handleSubjectToggle = (subjectId: string) => {
    setConfig(prev => ({
      ...prev,
      subjects: prev.subjects.map(s =>
        s.id === subjectId ? { ...s, selected: !s.selected } : s
      ),
    }));
  };

  const handleTimeDurationChange = (duration: number) => {
    setConfig(prev => ({ ...prev, timeDuration: duration }));
  };

  const handleShowTimerChange = (timer: 'yes' | 'no' | 'last30') => {
    setConfig(prev => ({ ...prev, showTimer: timer }));
  };

  const handleOptionChange = (option: keyof Pick<ExamConfig, 'showResults' | 'allowReview' | 'autoSave'>) => {
    setConfig(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleSaveConfig = () => {
    const payload = {
      examType: config.examType,
      subjects: config.subjects.filter(s => s.selected).map(s => ({ id: s.id, name: s.name, questions: s.questions })),
      timeDuration: config.timeDuration,
      showTimer: config.showTimer,
      showResults: config.showResults,
      allowReview: config.allowReview,
      autoSave: config.autoSave,
      totalQuestions,
    };
    console.log('Configuración guardada:', payload);
    alert('Configuración guardada exitosamente');
  };

  const handleStartExam = () => {
    const payload = {
      examType: config.examType,
      subjects: config.subjects.filter(s => s.selected).map(s => ({ id: s.id, name: s.name, questions: s.questions })),
      timeDuration: config.timeDuration,
      showTimer: config.showTimer,
      showResults: config.showResults,
      allowReview: config.allowReview,
      autoSave: config.autoSave,
      totalQuestions,
      startedAt: new Date().toISOString(),
    };
    console.log('Payload del examen:', JSON.stringify(payload, null, 2));
    navigate('/app/exam/take');
  };

  return (
    <div className="exam-config-container">
      <div className="exam-config-content">
        {/* Header Section */}
        <header className="exam-config-header">
          <h1 className="exam-config-title">
            Configurar Simulacro
          </h1>
          <p className="exam-config-description">
            Personaliza tu examen de simulacro eligiendo la cantidad de preguntas, tiempo y materias que deseas practicar
          </p>
        </header>

        {/* Summary Stats */}
        <div className="exam-config-summary">
          <div className="exam-summary-stat">
            <div className="exam-summary-value">{totalQuestions}</div>
            <div className="exam-summary-label">Preguntas</div>
          </div>
          <div className="exam-summary-stat">
            <div className="exam-summary-value">{Math.floor(config.timeDuration / 60)}h</div>
            <div className="exam-summary-label">Duración</div>
          </div>
          <div className="exam-summary-stat">
            <div className="exam-summary-value">{config.subjects.filter(s => s.selected).length}</div>
            <div className="exam-summary-label">Materias</div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="page-content">
          {/* Section 1: Exam Type */}
          <div className="ui-card">
            <div className="ui-card-header">
              <div className="ui-card-icon">📋</div>
              <h3 className="ui-card-title">Tipo de Simulacro</h3>
            </div>
            <div className="ui-card-content">
              <div className="exam-type-grid">
                <label className={`exam-type-option ${config.examType === 'complete' ? 'exam-type-option--selected' : ''}`}>
                  <input
                    type="radio"
                    name="examType"
                    value="complete"
                    checked={config.examType === 'complete'}
                    onChange={() => handleExamTypeChange('complete')}
                    className="sr-only"
                  />
                  <div className={`exam-type-radio ${config.examType === 'complete' ? 'exam-type-radio--selected' : ''}`}>
                    {config.examType === 'complete' && (
                      <div className="exam-type-radio-dot" />
                    )}
                  </div>
                  <div className="exam-type-content">
                    <div className="exam-type-title">Simulacro Completo</div>
                    <div className="exam-type-subtitle">100 preguntas - 3 horas</div>
                  </div>
                </label>
                <label className={`exam-type-option ${config.examType === 'custom' ? 'exam-type-option--selected' : ''}`}>
                  <input
                    type="radio"
                    name="examType"
                    value="custom"
                    checked={config.examType === 'custom'}
                    onChange={() => handleExamTypeChange('custom')}
                    className="sr-only"
                  />
                  <div className={`exam-type-radio ${config.examType === 'custom' ? 'exam-type-radio--selected' : ''}`}>
                    {config.examType === 'custom' && (
                      <div className="exam-type-radio-dot" />
                    )}
                  </div>
                  <div className="exam-type-content">
                    <div className="exam-type-title">Simulacro Personalizado</div>
                    <div className="exam-type-subtitle">Configura tu simulacro</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Subjects */}
          <div className="ui-card">
            <div className="ui-card-header">
              <div className="ui-card-icon">📚</div>
              <h3 className="ui-card-title">Materias a Incluir</h3>
              <span className="config-card-subtitle">{totalQuestions} preguntas seleccionadas</span>
            </div>
            <div className="ui-card-content">
              <div className="subjects-grid">
                {config.subjects.map((subject) => (
                  <label
                    key={subject.id}
                    className={`subject-option ${subject.selected ? 'subject-option--selected' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={subject.selected}
                      onChange={() => handleSubjectToggle(subject.id)}
                      className="sr-only"
                    />
                    <div className={`subject-checkbox ${subject.selected ? 'subject-checkbox--selected' : ''}`}>
                      {subject.selected && (
                        <svg className="subject-checkbox-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="subject-content">
                      <div className="subject-name">{subject.name}</div>
                      <div className="subject-questions">{subject.questions} preguntas</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Time Configuration */}
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
                    value={config.timeDuration}
                    onChange={(e) => handleTimeDurationChange(Number(e.target.value))}
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
                    value={config.showTimer}
                    onChange={(e) => handleShowTimerChange(e.target.value as 'yes' | 'no' | 'last30')}
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

          {/* Section 4: Additional Options */}
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
                    checked={config.showResults}
                    onChange={() => handleOptionChange('showResults')}
                    className="sr-only"
                  />
                  <div className={`config-option-checkbox ${config.showResults ? 'config-option-checkbox--checked' : ''}`}>
                    {config.showResults && (
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
                    checked={config.allowReview}
                    onChange={() => handleOptionChange('allowReview')}
                    className="sr-only"
                  />
                  <div className={`config-option-checkbox ${config.allowReview ? 'config-option-checkbox--checked' : ''}`}>
                    {config.allowReview && (
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
                    checked={config.autoSave}
                    onChange={() => handleOptionChange('autoSave')}
                    className="sr-only"
                  />
                  <div className={`config-option-checkbox ${config.autoSave ? 'config-option-checkbox--checked' : ''}`}>
                    {config.autoSave && (
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

          {/* Action Buttons */}
          <div className="config-actions">
            <button
              className="config-action-button config-action-button--secondary"
              onClick={handleSaveConfig}
            >
              💾 Guardar Configuración
            </button>
            <button
              className="config-action-button config-action-button--primary"
              onClick={handleStartExam}
            >
              🚀 Iniciar Simulacro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
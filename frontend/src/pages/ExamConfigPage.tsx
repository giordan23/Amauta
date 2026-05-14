import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-[var(--color-on-background)]">
            Configurar Simulacro
          </h1>
          <p className="text-lg text-[var(--color-outline)] max-w-2xl mx-auto">
            Personaliza tu examen de simulacro eligiendo la cantidad de preguntas, tiempo y materias que deseas practicar
          </p>
        </header>

        {/* Summary Stats */}
        <div className="flex justify-center gap-6 py-4">
          <div className="stat-card min-w-[140px]">
            <div className="stat-value">{totalQuestions}</div>
            <div className="stat-label">Preguntas</div>
          </div>
          <div className="stat-card min-w-[140px]">
            <div className="stat-value">{Math.floor(config.timeDuration / 60)}h</div>
            <div className="stat-label">Duración</div>
          </div>
          <div className="stat-card min-w-[140px]">
            <div className="stat-value">{config.subjects.filter(s => s.selected).length}</div>
            <div className="stat-label">Materias</div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          {/* Section 1: Exam Type */}
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Simulacro</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2">
                <label
                  className={`flex items-center p-4 bg-[var(--color-background)] rounded-xl border-2 cursor-pointer transition-all ${
                    config.examType === 'complete'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="examType"
                    value="complete"
                    checked={config.examType === 'complete'}
                    onChange={() => handleExamTypeChange('complete')}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      config.examType === 'complete'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                        : 'border-[var(--color-outline)]'
                    }`}
                  >
                    {config.examType === 'complete' && (
                      <div className="w-2 h-2 rounded-full bg-[var(--color-on-primary)]" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-on-background)]">Simulacro Completo</div>
                    <div className="text-sm text-[var(--color-outline)]">100 preguntas - 3 horas</div>
                  </div>
                </label>
                <label
                  className={`flex items-center p-4 bg-[var(--color-background)] rounded-xl border-2 cursor-pointer transition-all ${
                    config.examType === 'custom'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="examType"
                    value="custom"
                    checked={config.examType === 'custom'}
                    onChange={() => handleExamTypeChange('custom')}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center transition-all ${
                      config.examType === 'custom'
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                        : 'border-[var(--color-outline)]'
                    }`}
                  >
                    {config.examType === 'custom' && (
                      <div className="w-2 h-2 rounded-full bg-[var(--color-on-primary)]" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-on-background)]">Simulacro Personalizado</div>
                    <div className="text-sm text-[var(--color-outline)]">Configura tu simulacro</div>
                  </div>
                </label>
              </div>
            </CardBody>
          </Card>

          {/* Section 2: Subjects */}
          <Card>
            <CardHeader>
              <CardTitle>Materias a Incluir</CardTitle>
              <span className="text-sm text-[var(--color-outline)]">{totalQuestions} preguntas seleccionadas</span>
            </CardHeader>
            <CardBody>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {config.subjects.map((subject) => (
                  <label
                    key={subject.id}
                    className={`flex items-center p-3 bg-[var(--color-background)] rounded-xl border-2 cursor-pointer transition-all ${
                      subject.selected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                        : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={subject.selected}
                      onChange={() => handleSubjectToggle(subject.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${
                        subject.selected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]'
                          : 'border-[var(--color-outline)]'
                      }`}
                    >
                      {subject.selected && (
                        <svg className="w-3 h-3 text-[var(--color-on-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[var(--color-on-background)]">{subject.name}</div>
                      <div className="text-xs text-[var(--color-outline)]">{subject.questions} preguntas</div>
                    </div>
                  </label>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Section 3: Time Configuration - 2 columns on desktop */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Tiempo</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">
                    Duración del Examen
                  </label>
                  <select
                    value={config.timeDuration}
                    onChange={(e) => handleTimeDurationChange(Number(e.target.value))}
                    className="form-select"
                  >
                    {TIME_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--color-on-surface)]">
                    Mostrar Cronómetro
                  </label>
                  <select
                    value={config.showTimer}
                    onChange={(e) => handleShowTimerChange(e.target.value as 'yes' | 'no' | 'last30')}
                    className="form-select"
                  >
                    {TIMER_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Section 4: Additional Options */}
          <Card>
            <CardHeader>
              <CardTitle>Opciones Adicionales</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showResults}
                    onChange={() => handleOptionChange('showResults')}
                    className="form-checkbox"
                  />
                  <span className="text-[var(--color-on-surface)]">Mostrar resultados al finalizar</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.allowReview}
                    onChange={() => handleOptionChange('allowReview')}
                    className="form-checkbox"
                  />
                  <span className="text-[var(--color-on-surface)]">Permitir revisión de respuestas</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.autoSave}
                    onChange={() => handleOptionChange('autoSave')}
                    className="form-checkbox"
                  />
                  <span className="text-[var(--color-on-surface)]">Guardar progreso automáticamente</span>
                </label>
              </div>
            </CardBody>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={handleSaveConfig}
            >
              Guardar Configuración
            </Button>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleStartExam}
            >
              Iniciar Simulacro
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
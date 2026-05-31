import { useState, useEffect, useMemo } from 'react';
import { FileText, TrendingUp, Clock, Award, Calendar, BarChart3, Eye, RotateCcw, Filter, Loader2 } from 'lucide-react';
import { FilterBar } from '@/components/ui/FilterBar';
import { examService } from '@/services/examService';

interface ExamAttempt {
  id: string;
  status: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  startedAt: string;
  completedAt?: string;
  university: { id: string; name: string; shortName: string };
  subjectIds: string[];
  careerIds: string[];
  difficulty: string | null;
}

interface ExamHistoryItem extends ExamAttempt {
  type: string;
  duration: string;
  subjects: number;
}

const examTypes = [
  { value: 'all', label: 'Todos los tipos' },
  { value: 'Simulacro Completo', label: 'Simulacro Completo' },
  { value: 'Matemática', label: 'Matemática' },
  { value: 'Razonamiento Verbal', label: 'Razonamiento Verbal' },
  { value: 'Ciencias', label: 'Ciencias' },
];

const periods = [
  { value: '30', label: 'Últimos 30 días' },
  { value: '90', label: 'Últimos 3 meses' },
  { value: '180', label: 'Últimos 6 meses' },
  { value: 'all', label: 'Todo el tiempo' }
];

function getDaysAgo(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function getScoreClass(score: number): string {
  if (score >= 90) return 'excellent';
  if (score >= 80) return 'good';
  if (score >= 70) return 'regular';
  return 'needs-improvement';
}

function getSubjectType(): string {
  return 'complete';
}

function getSubjectIcon(): string {
  return '📚';
}

function formatExamDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDuration(startedAt: string, completedAt: string | undefined): string {
  if (!completedAt) return '--';
  const start = new Date(startedAt);
  const end = new Date(completedAt);
  const diffMs = end.getTime() - start.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMin / 60);
  const minutes = diffMin % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function ExamHistoryPage() {
  const [exams, setExams] = useState<ExamHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('30');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await examService.getHistory();
      const items: ExamHistoryItem[] = response.data.map((item: any) => ({
        ...item.examAttempt,
        type: item.examAttempt.subjectIds?.length > 1 ? 'Simulacro Completo' : 'Simulacro Completo',
        duration: formatDuration(item.examAttempt.startedAt, item.examAttempt.completedAt),
        subjects: item.examAttempt.subjectIds?.length || 1,
      }));
      setExams(items);
    } catch (err) {
      setError((err as Error).message || 'Error al cargar el historial');
    } finally {
      setLoading(false);
    }
  };

  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      if (typeFilter !== 'all' && exam.type !== typeFilter) return false;
      if (periodFilter !== 'all') {
        const daysAgo = getDaysAgo(exam.startedAt);
        if (daysAgo > parseInt(periodFilter)) return false;
      }
      return true;
    });
  }, [exams, typeFilter, periodFilter]);

  const stats = useMemo(() => {
    if (filteredExams.length === 0) {
      return { total: 0, avgScore: 0, totalTime: '0h', bestScore: 0 };
    }
    const total = filteredExams.length;
    const avgScore = Math.round(
      filteredExams.reduce((sum, e) => sum + (e.score || 0), 0) / total
    );
    const bestScore = Math.max(...filteredExams.map((e) => e.score || 0));
    const totalMinutes = filteredExams.reduce((sum, e) => {
      const match = e.duration.match(/(\d+)h\s*(\d+)?m?/);
      if (match) {
        return sum + (parseInt(match[1]) * 60 + (parseInt(match[2]) || 0));
      }
      const minMatch = e.duration.match(/(\d+)m/);
      return sum + (minMatch ? parseInt(minMatch[1]) : 0);
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const totalTime = `${hours}h`;
    return { total, avgScore, totalTime, bestScore };
  }, [filteredExams]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
            <p className="text-[var(--color-text-secondary)]">Cargando historial...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="page-content flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-4xl">⚠️</div>
            <p className="text-[var(--color-error)]">{error}</p>
            <button onClick={loadHistory} className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg">
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Enhanced Header Section */}
        <div className="section-header">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h1 className="section-title">
                Historial de Simulacros
              </h1>
              <p className="section-description">
                Revisa tu progreso y rendimiento en los simulacros anteriores
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                  <Calendar size={16} />
                  <span>Último examen: hace 2 días</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--color-success)]">
                  <TrendingUp size={16} />
                  <span>Mejorando +5% este mes</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-6 bg-[var(--color-surface)]/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-[var(--color-border)]">
              <div className="text-center">
                <div className="text-2xl font-bold text-[var(--color-primary)]">{stats.total}</div>
                <div className="text-xs text-[var(--color-text-muted)] font-medium">Total Exámenes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="stats-grid">
          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--primary">
                <FileText className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <span className="text-xs px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full font-medium">
                +{Math.floor(stats.total * 0.2)} este mes
              </span>
            </div>
            <div className="ui-stat-value">{stats.total}</div>
            <div className="ui-stat-label">Exámenes totales</div>
          </div>

          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--success">
                <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
              </div>
              <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
            </div>
            <div className="ui-stat-value">{stats.avgScore}%</div>
            <div className="ui-stat-label">Promedio general</div>
          </div>

          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--warning">
                <Clock className="w-5 h-5 text-[var(--color-warning)]" />
              </div>
            </div>
            <div className="ui-stat-value">{stats.totalTime}</div>
            <div className="ui-stat-label">Tiempo dedicado</div>
          </div>

          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--primary">
                <Award className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
            </div>
            <div className="ui-stat-value">{stats.bestScore}%</div>
            <div className="ui-stat-label">Récord personal</div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="ui-card">
          <div className="ui-card-header">
            <Filter className="ui-card-icon" />
            <h3 className="ui-card-title">Filtros</h3>
          </div>
          <div className="ui-card-content">
            <FilterBar
              filters={[
                {
                  label: 'Tipo de Examen',
                  options: examTypes,
                  value: typeFilter,
                  onChange: setTypeFilter,
                },
                {
                  label: 'Período',
                  options: periods,
                  value: periodFilter,
                  onChange: setPeriodFilter,
                },
              ]}
            />
          </div>
        </div>

        {/* Enhanced Exam History List */}
        <div className="exam-list-container">
          <div className="exam-list-header">
            <div className="exam-list-title">
              <BarChart3 className="ui-card-icon" />
              <h3 className="ui-card-title">Exámenes Recientes</h3>
            </div>
            <div className="exam-list-subtitle">
              <span>
                {filteredExams.length} {filteredExams.length === 1 ? 'examen encontrado' : 'exámenes encontrados'}
              </span>
              <span className="exam-filter-badge">
                {typeFilter === 'all' ? 'Todos los tipos' : typeFilter}
              </span>
            </div>
          </div>

          {filteredExams.length === 0 ? (
            <div className="exam-list-empty">
              <div className="exam-list-empty-icon">📭</div>
              <div className="exam-list-empty-message">No hay exámenes en este período</div>
              <div className="exam-list-empty-submessage">Intenta ajustar los filtros para ver más resultados</div>
            </div>
          ) : (
            <>
              {/* Desktop Table Header */}
              <div className="exam-table-header">
                <div>Examen</div>
                <div>Fecha</div>
                <div>Duración</div>
                <div>Puntaje</div>
                <div>Acciones</div>
              </div>

              {/* Exam Rows */}
              <div>
                {filteredExams.map((exam) => (
                  <div key={exam.id} className="exam-item">
                    {/* Mobile View */}
                    <div className="exam-item-mobile">
                      <div className="exam-item-header">
                        <div>
                          <div className="exam-item-title">
                            {exam.type}
                            <span className={`subject-indicator subject-indicator--${getSubjectType(exam.type)}`}>
                              {getSubjectIcon(exam.type)}
                            </span>
                          </div>
                          <div className="exam-item-date">
                            <Calendar size={14} />
                            {formatExamDate(exam.startedAt)}
                          </div>
                        </div>
                        <div className={`score-badge score-badge--${getScoreClass(exam.score)}`}>
                          {exam.score}%
                        </div>
                      </div>
                      
                      <div className="exam-item-meta">
                        <div className="exam-meta-item">
                          <Clock size={14} />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="exam-meta-item">
                          <FileText size={14} />
                          <span>{exam.subjects} materia{exam.subjects > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      
                      <div className="exam-item-actions">
                        <button className="exam-action-button exam-action-button--primary">
                          <Eye size={16} />
                          Ver Detalles
                        </button>
                        <button className="exam-action-button exam-action-button--secondary">
                          <RotateCcw size={16} />
                          Repetir
                        </button>
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="exam-item-desktop">
                      <div className="exam-desktop-title">
                        <div className="exam-desktop-main-title">
                          {exam.type}
                          <span className={`subject-indicator subject-indicator--${getSubjectType(exam.type)}`}>
                            {getSubjectIcon(exam.type)}
                          </span>
                        </div>
                        <div className="exam-desktop-subtitle">
                          {exam.subjects} materia{exam.subjects > 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      <div className="exam-desktop-date">
                        {formatExamDate(exam.startedAt)}
                      </div>
                      
                      <div className="exam-desktop-duration">
                        {exam.duration}
                      </div>
                      
                      <div className="exam-desktop-score">
                        <div className={`score-badge score-badge--${getScoreClass(exam.score)}`}>
                          {exam.score}%
                        </div>
                      </div>
                      
                      <div className="exam-desktop-actions">
                        <button className="exam-action-button exam-action-button--primary">
                          <Eye size={14} />
                          Ver
                        </button>
                        <button className="exam-action-button exam-action-button--secondary">
                          <RotateCcw size={14} />
                          Repetir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enhanced Load More */}
              <div className="exam-list-footer">
                <button className="exam-load-more-button">
                  Cargar Más Exámenes
                  <span className="exam-load-more-arrow">→</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Enhanced Progress Chart Placeholder */}
        <div className="ui-card">
          <div className="ui-card-header">
            <TrendingUp className="ui-card-icon" />
            <div>
              <h3 className="ui-card-title">Progreso en el Tiempo</h3>
              <p className="text-sm text-[var(--color-outline)] mt-1">
                Visualiza tu evolución académica
              </p>
            </div>
            <span className="ml-auto text-xs text-[var(--color-warning)] bg-[var(--color-warning)]/10 px-3 py-1 rounded-full font-medium">
              Próximamente
            </span>
          </div>
          <div className="ui-card-content">
            <div className="h-56 sm:h-64 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-surface)] rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--color-outline)]/30 relative overflow-hidden">
            <div className="text-center space-y-4 p-8 relative z-10">
              <div className="text-6xl mb-2">📊</div>
              <div>
                <p className="text-lg font-semibold text-[var(--color-on-surface)] mb-2">
                  Análisis de Rendimiento
                </p>
                <p className="text-[var(--color-outline)] mb-4">
                  Gráficos interactivos de tu progreso académico
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg">
                  <BarChart3 size={16} />
                  Próximamente disponible
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/5 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
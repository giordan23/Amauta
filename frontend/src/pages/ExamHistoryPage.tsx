import { useState, useMemo } from 'react';
import { FileText, TrendingUp, Clock, Award, Calendar, BarChart3, Eye, RotateCcw, Filter } from 'lucide-react';
import { FilterBar } from '@/components/ui/FilterBar';
import { Badge } from '@/components/ui/Badge';

interface Exam {
  id: number;
  date: string;
  type: string;
  score: number;
  duration: string;
  subjects: number;
}

// Datos mock realistas
const allExams: Exam[] = [
  { id: 1, date: '2026-05-12', type: 'Simulacro Completo', score: 78, duration: '2h 45m', subjects: 6 },
  { id: 2, date: '2026-05-10', type: 'Matemática', score: 92, duration: '45m', subjects: 1 },
  { id: 3, date: '2026-05-08', type: 'Simulacro Completo', score: 68, duration: '2h 58m', subjects: 6 },
  { id: 4, date: '2026-05-05', type: 'Razonamiento Verbal', score: 88, duration: '1h 15m', subjects: 1 },
  { id: 5, date: '2026-05-03', type: 'Ciencias', score: 75, duration: '55m', subjects: 1 },
  { id: 6, date: '2026-04-28', type: 'Simulacro Completo', score: 82, duration: '2h 50m', subjects: 6 },
  { id: 7, date: '2026-04-25', type: 'Matemática', score: 95, duration: '40m', subjects: 1 },
  { id: 8, date: '2026-04-22', type: 'Simulacro Completo', score: 71, duration: '3h 05m', subjects: 6 },
  { id: 9, date: '2026-04-18', type: 'Razonamiento Verbal', score: 84, duration: '1h 20m', subjects: 1 },
  { id: 10, date: '2026-04-15', type: 'Ciencias', score: 79, duration: '50m', subjects: 1 },
];

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
  { value: 'all', label: 'Todo el tiempo' },
];

function getScoreVariant(score: number): 'success' | 'info' | 'default' {
  if (score >= 90) return 'success';
  if (score >= 80) return 'info';
  return 'default';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'Excelente';
  if (score >= 80) return 'Bueno';
  if (score >= 70) return 'Regular';
  return 'En progreso';
}

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

function getSubjectType(examType: string): string {
  if (examType.includes('Simulacro')) return 'complete';
  if (examType.includes('Matemática')) return 'math';
  if (examType.includes('Verbal')) return 'verbal';
  if (examType.includes('Ciencias')) return 'science';
  return 'complete';
}

function getSubjectIcon(examType: string): string {
  if (examType.includes('Simulacro')) return '📚';
  if (examType.includes('Matemática')) return '🔢';
  if (examType.includes('Verbal')) return '📝';
  if (examType.includes('Ciencias')) return '🧪';
  return '📚';
}

function formatExamDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ExamHistoryPage() {
  const [typeFilter, setTypeFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('30');

  const filteredExams = useMemo(() => {
    return allExams.filter((exam) => {
      // Filter by type
      if (typeFilter !== 'all' && exam.type !== typeFilter) return false;

      // Filter by period
      if (periodFilter !== 'all') {
        const daysAgo = getDaysAgo(exam.date);
        if (daysAgo > parseInt(periodFilter)) return false;
      }

      return true;
    });
  }, [typeFilter, periodFilter]);

  // Calculate stats from filtered exams
  const stats = useMemo(() => {
    if (filteredExams.length === 0) {
      return { total: 15, avgScore: 81, totalTime: '42h', bestScore: 92 };
    }

    const total = filteredExams.length;
    const avgScore = Math.round(
      filteredExams.reduce((sum, e) => sum + e.score, 0) / total
    );
    const bestScore = Math.max(...filteredExams.map((e) => e.score));

    // Calculate total time (mock: estimate based on exam count)
    const totalMinutes = total * 150;
    const hours = Math.floor(totalMinutes / 60);
    const totalTime = `${hours}h`;

    return { total, avgScore, totalTime, bestScore };
  }, [filteredExams]);

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
                            {formatExamDate(exam.date)}
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
                        {formatExamDate(exam.date)}
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
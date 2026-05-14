import { useState, useMemo } from 'react';
import { FileText, TrendingUp, Clock, Award } from 'lucide-react';
import { StatCard } from '@/components/ui/StatCard';
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
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <header className="space-y-2 sm:space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-on-background)]">
            Historial de Simulacros
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-outline)]">
            Revisa tu progreso y rendimiento en los simulacros anteriores
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            title="Exámenes Totales"
            value={stats.total}
            icon={FileText}
            subtitle="realizados"
          />
          <StatCard
            title="Promedio General"
            value={`${stats.avgScore}%`}
            icon={TrendingUp}
            subtitle="puntuación"
            trend="up"
          />
          <StatCard
            title="Tiempo Total"
            value={stats.totalTime}
            icon={Clock}
            subtitle="dedicado"
          />
          <StatCard
            title="Mejor Puntaje"
            value={`${stats.bestScore}%`}
            icon={Award}
            subtitle="récord personal"
          />
        </div>

        {/* Filters */}
        <div className="bg-[var(--color-surface)] rounded-2xl p-4 sm:p-6">
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

        {/* Exam History List */}
        <div className="bg-[var(--color-surface)] rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-[var(--color-outline)]/20">
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-on-surface)]">
              Exámenes Recientes
              <span className="ml-2 text-sm font-normal text-[var(--color-outline)]">
                ({filteredExams.length})
              </span>
            </h2>
          </div>

          {filteredExams.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-[var(--color-outline)]">No hay exámenes en este período</p>
            </div>
          ) : (
            <>
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-[var(--color-background)]/50 border-b border-[var(--color-outline)]/20 text-xs font-medium text-[var(--color-outline)] uppercase tracking-wider">
                <div className="col-span-4">Examen</div>
                <div className="col-span-2">Fecha</div>
                <div className="col-span-2">Duración</div>
                <div className="col-span-2 text-center">Puntaje</div>
                <div className="col-span-2 text-right">Acciones</div>
              </div>

              {/* Exam Rows */}
              <div className="divide-y divide-[var(--color-outline)]/20">
                {filteredExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-4 sm:p-6 hover:bg-[var(--color-background)]/50 transition-colors"
                  >
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[var(--color-on-surface)] truncate">
                            {exam.type}
                          </h3>
                          <p className="text-sm text-[var(--color-outline)]">
                            {new Date(exam.date).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <Badge variant={getScoreVariant(exam.score)}>
                          {exam.score}%
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[var(--color-outline)]">
                        <span>⏱️ {exam.duration}</span>
                        <span>📚 {exam.subjects} materia{exam.subjects > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors">
                          Ver Detalles
                        </button>
                        <button className="flex-1 px-3 py-2 text-sm font-medium text-[var(--color-on-background)] bg-[var(--color-outline)]/10 rounded-lg hover:bg-[var(--color-outline)]/20 transition-colors">
                          Repetir
                        </button>
                      </div>
                    </div>

                    {/* Desktop Row View */}
                    <div className="hidden md:grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 space-y-1">
                        <h3 className="font-semibold text-[var(--color-on-surface)]">
                          {exam.type}
                        </h3>
                        <p className="text-sm text-[var(--color-outline)]">
                          {exam.subjects} materia{exam.subjects > 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="col-span-2 text-sm text-[var(--color-outline)]">
                        {new Date(exam.date).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="col-span-2 text-sm text-[var(--color-outline)]">
                        {exam.duration}
                      </div>
                      <div className="col-span-2 flex justify-center">
                        <div className="flex items-center gap-2">
                          <Badge variant={getScoreVariant(exam.score)}>
                            {exam.score}%
                          </Badge>
                          <span className="text-xs text-[var(--color-outline)]">
                            {getScoreLabel(exam.score)}
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end gap-2">
                        <button className="px-3 py-1.5 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)]/10 transition-colors">
                          Ver
                        </button>
                        <button className="px-3 py-1.5 text-sm font-medium text-[var(--color-on-background)] bg-[var(--color-outline)]/10 rounded-lg hover:bg-[var(--color-outline)]/20 transition-colors">
                          Repetir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="p-4 sm:p-6 text-center border-t border-[var(--color-outline)]/20">
                <button className="px-6 py-2.5 text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary)]/10 rounded-lg transition-colors">
                  Cargar Más Exámenes
                </button>
              </div>
            </>
          )}
        </div>

        {/* Progress Chart Placeholder */}
        <div className="bg-[var(--color-surface)] rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-on-surface)]">
              Progreso en el Tiempo
            </h2>
            <span className="text-xs text-[var(--color-outline)] bg-[var(--color-background)] px-2 py-1 rounded">
              Próximamente
            </span>
          </div>
          <div
            className="h-48 sm:h-64 bg-[var(--color-background)] rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--color-outline)]/30"
          >
            <div className="text-center space-y-3 p-6">
              <div className="text-5xl">📈</div>
              <div>
                <p className="text-[var(--color-on-surface)] font-medium">
                  Gráfico de progreso
                </p>
                <p className="text-sm text-[var(--color-outline)]">
                  Próximamente disponible
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
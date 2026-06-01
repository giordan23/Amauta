import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { userService } from '@/services/userService';
import {
  GraduationCap,
  History,
  User,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react';
import { Link } from 'react-router';

interface Stats {
  totalExams: number;
  completedExams: number;
  averageScore: number;
  totalQuestionsAnswered?: number;
  totalCorrectAnswers?: number;
  completionRate?: number;
}

interface RecentExam {
  id: string;
  type: string;
  date: string;
  score: number;
  duration: string;
  questions: number;
  status: string;
  university: string;
}

const actionCards = [
  {
    title: 'Nuevo Simulacro',
    description: 'Inicia un nuevo examen de simulación',
    icon: GraduationCap,
    to: '/app/exam/config',
    color: 'primary'
  },
  {
    title: 'Historial',
    description: 'Revisa todos tus exámenes anteriores',
    icon: History,
    to: '/app/exam/history',
    color: 'secondary'
  },
  {
    title: 'Mi Perfil',
    description: 'Actualiza tus datos y preferencias',
    icon: User,
    to: '/app/profile',
    color: 'accent'
  }
];

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return '--';
  }
}

function getScoreClass(score: number): string {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  return 'regular';
}

export function HomePage() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentExams, setRecentExams] = useState<RecentExam[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, historyData] = await Promise.all([
          userService.getStatistics(),
          userService.getExamHistory(1, 5)
        ]);
        setStats(statsData);
        if (historyData.data?.examAttempts) {
          const mapped = historyData.data.examAttempts
            .filter((a: any) => a.status === 'completed')
            .slice(0, 5)
            .map((a: any) => ({
              id: a.id,
              type: `Simulacro - ${a.university?.name || 'General'}`,
              date: a.startedAt,
              score: Math.round(a.score || 0),
              duration: a.completedAt
                ? `${Math.round((new Date(a.completedAt).getTime() - new Date(a.startedAt).getTime()) / 60000)} min`
                : '--',
              questions: a.totalQuestions || 0,
              status: a.status,
              university: a.university?.shortName || ''
            }));
          setRecentExams(mapped);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoadingStats(false);
        setLoadingHistory(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="page-container">
      <div className="page-content">
        {/* Welcome Section */}
        <div className="section-header">
          <h1 className="section-title">
            ¡Hola, {user?.firstName || user?.email}!
          </h1>
          <p className="section-description">¿Qué quieres hacer hoy?</p>
        </div>

        {/* Stats Overview */}
        <div className="stats-grid">
          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--primary">
                <Target className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
            </div>
            {loadingStats ? (
              <div className="skeleton" style={{ height: '2rem', width: '60px', marginBottom: '0.5rem' }} />
            ) : (
              <div className="ui-stat-value">{stats?.totalExams || 0}</div>
            )}
            <div className="ui-stat-label">Exámenes realizados</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              {stats?.completedExams || 0} completados
            </div>
          </div>

          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--success">
                <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
              </div>
              <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
            </div>
            {loadingStats ? (
              <div className="skeleton" style={{ height: '2rem', width: '60px', marginBottom: '0.5rem' }} />
            ) : (
              <div className="ui-stat-value">{Math.round(stats?.averageScore || 0)}%</div>
            )}
            <div className="ui-stat-label">Promedio general</div>
            {stats && (stats.totalQuestionsAnswered ?? 0) > 0 && (
              <div className="text-xs text-[var(--color-success)] mt-1">
                {Math.round(((stats.totalCorrectAnswers ?? 0) / stats.totalQuestionsAnswered!) * 100)}% de acierto
              </div>
            )}
          </div>

          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--warning">
                <Trophy className="w-5 h-5 text-[var(--color-warning)]" />
              </div>
            </div>
            {loadingHistory ? (
              <div className="skeleton" style={{ height: '2rem', width: '60px', marginBottom: '0.5rem' }} />
            ) : (
              <div className="ui-stat-value">
                {recentExams.length > 0
                  ? Math.max(...recentExams.map(e => e.score))
                  : 0}%
              </div>
            )}
            <div className="ui-stat-label">Mejor puntaje</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              {recentExams.length > 0 ? recentExams[0].university || 'Último examen' : 'Sin exámenes'}
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="ui-actions-grid">
          {actionCards.map((card) => (
            <Link key={card.title} to={card.to}>
              <button className="ui-action-button">
                <div className="ui-action-icon">
                  <card.icon size={24} />
                </div>
                <div className="ui-action-content">
                  <div className="ui-action-title">{card.title}</div>
                  <div className="ui-action-description">{card.description}</div>
                </div>
              </button>
            </Link>
          ))}
        </div>

        {/* Recent Exams */}
        <div className="ui-card">
          <div className="ui-card-header">
            <div className="ui-card-icon">📊</div>
            <h3 className="ui-card-title">Exámenes Recientes</h3>
            <Link to="/app/exam/history" className="exam-action-button exam-action-button--secondary ml-auto text-sm">
              Ver todos
            </Link>
          </div>
          <div className="ui-card-content">
            {loadingHistory ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="skeleton" style={{ height: '80px', borderRadius: 'var(--radius-md)' }} />
                ))}
              </div>
            ) : recentExams.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--color-outline)' }}>
                <p>No has completado ningún examen todavía.</p>
                <Link to="/app/exam/config" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                  Inicia tu primer simulacro
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentExams.map((exam) => (
                  <div key={exam.id} className="exam-item">
                    <div className="exam-item-mobile">
                      <div className="exam-item-header">
                        <div>
                          <div className="exam-item-title">{exam.type}</div>
                          <div className="exam-item-date">
                            <Calendar size={14} />
                            {formatDate(exam.date)}
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
                          <Target size={14} />
                          <span>{exam.questions} preguntas</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
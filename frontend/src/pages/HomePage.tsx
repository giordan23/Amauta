import { useAuthStore } from '@/store/authStore';
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

// Mock data - realistic user stats
const mockStats = {
  totalExams: 12,
  averageScore: 78,
  bestScore: 94,
  lastAttempt: '2026-05-10'
};

// Mock recent exams
const recentExams = [
  {
    id: '1',
    title: 'Simulacro General - Razonamiento Matemático',
    date: '2026-05-10',
    score: 85,
    duration: '45 min',
    questions: 30,
    status: 'completed'
  },
  {
    id: '2',
    title: 'Simulacro Verbal - Lectura Crítica',
    date: '2026-05-08',
    score: 72,
    duration: '38 min',
    questions: 25,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Examen Parcial - Cultura General',
    date: '2026-05-05',
    score: 91,
    duration: '52 min',
    questions: 40,
    status: 'completed'
  }
];

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
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function HomePage() {
  const { user } = useAuthStore();

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
            <div className="ui-stat-value">{mockStats.totalExams}</div>
            <div className="ui-stat-label">Exámenes realizados</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              Último: {formatDate(mockStats.lastAttempt)}
            </div>
          </div>
          
          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--success">
                <TrendingUp className="w-5 h-5 text-[var(--color-success)]" />
              </div>
              <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
            </div>
            <div className="ui-stat-value">{mockStats.averageScore}%</div>
            <div className="ui-stat-label">Promedio general</div>
            <div className="text-xs text-[var(--color-success)] mt-1">
              +5% vs mes anterior
            </div>
          </div>
          
          <div className="ui-stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className="ui-stat-icon-container ui-stat-icon-container--warning">
                <Trophy className="w-5 h-5 text-[var(--color-warning)]" />
              </div>
              <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
            </div>
            <div className="ui-stat-value">{mockStats.bestScore}%</div>
            <div className="ui-stat-label">Mejor puntaje</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              Simulacro verbal
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
            <div className="space-y-4">
              {recentExams.map((exam) => (
                <div key={exam.id} className="exam-item">
                  <div className="exam-item-mobile">
                    <div className="exam-item-header">
                      <div>
                        <div className="exam-item-title">{exam.title}</div>
                        <div className="exam-item-date">
                          <Calendar size={14} />
                          {formatDate(exam.date)}
                        </div>
                      </div>
                      <div className={`score-badge score-badge--${exam.score >= 80 ? 'excellent' : exam.score >= 60 ? 'good' : 'regular'}`}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
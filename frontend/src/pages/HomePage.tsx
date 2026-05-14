import { useAuthStore } from '@/store/authStore';
import { Card, CardBody } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { Badge } from '@/components/ui/Badge';
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

function getScoreBadgeVariant(score: number): 'success' | 'warning' | 'error' {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'error';
}

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
    <div className="home-page">
      {/* Saludo */}
      <div className="page-header">
        <h1 className="page-title">
          ¡Hola, {user?.firstName || user?.email}!
        </h1>
        <p className="page-subtitle">¿Qué quieres hacer hoy?</p>
      </div>

      {/* Stats Strip */}
      <div className="stats-strip">
        <StatCard
          title="Exámenes"
          value={mockStats.totalExams}
          icon={Target}
          subtitle={`Último: ${formatDate(mockStats.lastAttempt)}`}
        />
        <StatCard
          title="Promedio"
          value={`${mockStats.averageScore}%`}
          icon={TrendingUp}
          trend="up"
          subtitle="+5% vs mes anterior"
        />
        <StatCard
          title="Mejor Score"
          value={`${mockStats.bestScore}%`}
          icon={Trophy}
          trend="up"
          subtitle="Simulacro verbal"
        />
      </div>

      {/* Action Cards */}
      <div className="action-cards-grid">
        {actionCards.map((card) => (
          <Link key={card.title} to={card.to} className="action-card-link">
            <Card variant="elevated" padding="lg" className="action-card">
              <CardBody>
                <div className="action-card-icon-wrapper">
                  <card.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="action-card-title">{card.title}</h3>
                <p className="action-card-description">{card.description}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      {/* Exámenes Recientes */}
      <section className="recent-exams-section">
        <div className="section-header">
          <h2 className="section-title">Exámenes Recientes</h2>
          <Link to="/app/exam/history" className="section-link">
            Ver todos
          </Link>
        </div>

        <div className="recent-exams-list">
          {recentExams.map((exam) => (
            <Card key={exam.id} variant="bordered" padding="md" className="exam-card">
              <CardBody>
                <div className="exam-card-main">
                  <div className="exam-card-info">
                    <h4 className="exam-card-title">{exam.title}</h4>
                    <div className="exam-card-meta">
                      <span className="exam-meta-item">
                        <Calendar size={14} />
                        {formatDate(exam.date)}
                      </span>
                      <span className="exam-meta-item">
                        <Clock size={14} />
                        {exam.duration}
                      </span>
                      <span className="exam-meta-item">
                        <Target size={14} />
                        {exam.questions} preguntas
                      </span>
                    </div>
                  </div>
                  <div className="exam-card-score">
                    <Badge variant={getScoreBadgeVariant(exam.score)}>
                      {exam.score}%
                    </Badge>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <style>{`
        .home-page {
          padding: var(--space-6);
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: var(--space-6);
        }

        .page-title {
          font-size: var(--font-size-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-on-background);
          margin: 0 0 var(--space-1) 0;
        }

        .page-subtitle {
          font-size: var(--font-size-base);
          color: var(--color-outline);
          margin: 0;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .action-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        .action-card-link {
          text-decoration: none;
          color: inherit;
        }

        .action-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          cursor: pointer;
        }

        .action-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .action-card-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-lg);
          background: var(--color-primary-container);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-4);
          color: var(--color-primary);
        }

        .action-card-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-on-surface);
          margin: 0 0 var(--space-1) 0;
        }

        .action-card-description {
          font-size: var(--font-size-sm);
          color: var(--color-outline);
          margin: 0;
          line-height: var(--line-height-relaxed);
        }

        .recent-exams-section {
          margin-bottom: var(--space-6);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .section-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-on-background);
          margin: 0;
        }

        .section-link {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-primary);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .section-link:hover {
          opacity: 0.8;
        }

        .recent-exams-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .exam-card {
          transition: border-color 0.2s ease;
        }

        .exam-card:hover {
          border-color: var(--color-primary);
        }

        .exam-card-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: var(--space-4);
        }

        .exam-card-info {
          flex: 1;
          min-width: 0;
        }

        .exam-card-title {
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-on-surface);
          margin: 0 0 var(--space-2) 0;
        }

        .exam-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-4);
        }

        .exam-meta-item {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--font-size-xs);
          color: var(--color-outline);
        }

        .exam-card-score {
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .home-page {
            padding: var(--space-4);
          }

          .stats-strip,
          .action-cards-grid {
            grid-template-columns: 1fr;
          }

          .exam-card-meta {
            flex-direction: column;
            gap: var(--space-1);
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .stats-strip {
            grid-template-columns: repeat(3, 1fr);
          }

          .action-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
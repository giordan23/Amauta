import { FileText, Target, Clock, Award, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  stats: {
    examsTaken: number;
    averageScore: number;
    studyHours: number;
    streak: number;
  };
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    {
      icon: FileText,
      value: stats.examsTaken,
      label: 'Exámenes realizados',
      color: 'primary',
      badge: '+3 esta semana',
      badgeColor: 'success'
    },
    {
      icon: Target,
      value: `${stats.averageScore}%`,
      label: 'Promedio general',
      color: 'success',
      trending: true
    },
    {
      icon: Clock,
      value: `${stats.studyHours}h`,
      label: 'Horas de estudio',
      color: 'warning'
    },
    {
      icon: Award,
      value: stats.streak,
      label: 'Días consecutivos',
      color: 'primary'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      primary: {
        bg: 'bg-[var(--color-primary)]/10',
        text: 'text-[var(--color-primary)]'
      },
      success: {
        bg: 'bg-[var(--color-success)]/10',
        text: 'text-[var(--color-success)]'
      },
      warning: {
        bg: 'bg-[var(--color-warning)]/10',
        text: 'text-[var(--color-warning)]'
      }
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <div className="stats-grid">
      {statItems.map((item, index) => {
        const colors = getColorClasses(item.color);
        const Icon = item.icon;
        
        return (
          <div 
            key={index}
            className="ui-stat-card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`ui-stat-icon-container ui-stat-icon-container--${item.color}`}>
                <Icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              {item.badge && (
                <span className={`text-xs px-2 py-1 bg-[var(--color-${item.badgeColor})]/10 text-[var(--color-${item.badgeColor})] rounded-full font-medium`}>
                  {item.badge}
                </span>
              )}
              {item.trending && (
                <TrendingUp className="w-4 h-4 text-[var(--color-success)]" />
              )}
            </div>
            <div className="ui-stat-value">{item.value}</div>
            <div className="ui-stat-label">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}
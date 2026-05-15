import { Edit, Lock, Settings } from 'lucide-react';

interface QuickActionsCardProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onSettings: () => void;
}

export function QuickActionsCard({ onEditProfile, onChangePassword, onSettings }: QuickActionsCardProps) {
  const actions = [
    {
      icon: Edit,
      title: 'Editar Perfil',
      description: 'Actualiza tu información',
      onClick: onEditProfile,
      color: 'primary'
    },
    {
      icon: Lock,
      title: 'Cambiar Contraseña',
      description: 'Mantén tu cuenta segura',
      onClick: onChangePassword,
      color: 'warning'
    },
    {
      icon: Settings,
      title: 'Configuración',
      description: 'Personaliza tu experiencia',
      onClick: onSettings,
      color: 'secondary'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      primary: {
        bg: 'bg-[var(--color-primary)]/10',
        hoverBg: 'hover:bg-[var(--color-primary)]/5',
        border: 'hover:border-[var(--color-primary)]',
        iconBg: 'bg-[var(--color-primary)]/10 group-hover:bg-[var(--color-primary)]/20',
        iconText: 'text-[var(--color-primary)]'
      },
      warning: {
        bg: 'bg-[var(--color-warning)]/10',
        hoverBg: 'hover:bg-[var(--color-warning)]/5',
        border: 'hover:border-[var(--color-warning)]',
        iconBg: 'bg-[var(--color-warning)]/10 group-hover:bg-[var(--color-warning)]/20',
        iconText: 'text-[var(--color-warning)]'
      },
      secondary: {
        bg: 'bg-[var(--color-secondary)]/10',
        hoverBg: 'hover:bg-[var(--color-secondary)]/5',
        border: 'hover:border-[var(--color-secondary)]',
        iconBg: 'bg-[var(--color-secondary)]/10 group-hover:bg-[var(--color-secondary)]/20',
        iconText: 'text-[var(--color-secondary)]'
      }
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <div className="ui-card">
      <div className="ui-card-header">
        <Settings className="ui-card-icon" />
        <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Acciones Rápidas</h3>
      </div>
      <div className="ui-card-content">
        <div className="ui-actions-grid">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const colors = getColorClasses(action.color);
          
          return (
            <button
              key={index}
              onClick={action.onClick}
              className="ui-action-button"
            >
              <div className="ui-action-icon">
                <Icon size={20} className="text-[var(--color-primary)]" />
              </div>
              <div className="ui-action-content">
                <div className="ui-action-title">
                  {action.title}
                </div>
                <div className="ui-action-description">
                  {action.description}
                </div>
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
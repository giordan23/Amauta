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
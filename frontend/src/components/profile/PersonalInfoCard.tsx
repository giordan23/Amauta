import { User, Mail, Calendar, Check, X, Edit2 } from 'lucide-react';
import type { User as UserType } from '@/types/auth';

interface PersonalInfoCardProps {
  user: UserType | null;
  mockRegisterDate: string;
  editingField?: string | null;
  editValue?: string;
  onStartEdit?: (field: string, value: string) => void;
  onCancelEdit?: () => void;
  onSave?: () => void;
  saving?: boolean;
}

export function PersonalInfoCard({ 
  user, 
  mockRegisterDate,
  editingField,
  editValue = '',
  onStartEdit,
  onCancelEdit,
  onSave,
  saving = false,
}: PersonalInfoCardProps) {
  const fields = [
    {
      icon: User,
      label: 'Nombre',
      value: user?.firstName || 'Usuario',
      gridSpan: 'sm:col-span-1',
      key: 'firstName',
      canEdit: true,
    },
    {
      icon: User,
      label: 'Apellido',
      value: user?.lastName || '-',
      gridSpan: 'sm:col-span-1',
      key: 'lastName',
      canEdit: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: user?.email || '-',
      gridSpan: 'sm:col-span-2',
      key: 'email',
      canEdit: false,
    },
    {
      icon: Calendar,
      label: 'Fecha de Registro',
      value: mockRegisterDate,
      gridSpan: 'sm:col-span-1',
      key: 'registerDate',
      canEdit: false,
    }
  ];

  const handleStartEdit = (field: { key: string; value: string }) => {
    if (onStartEdit && field.key !== 'email' && field.key !== 'registerDate') {
      onStartEdit(field.key, field.value);
    }
  };

  return (
    <div className="ui-card">
      <div className="ui-card-header">
        <User className="ui-card-icon" />
        <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Información Personal</h3>
      </div>
      <div className="ui-card-content">
        <div className="grid gap-6 sm:grid-cols-2">
          {fields.map((field) => {
            const Icon = field.icon;
            const isEditing = editingField === field.key;
            
            return (
              <div key={field.key} className={`ui-field-group ${field.gridSpan}`}>
                <label className="ui-field-label">
                  <Icon className="ui-field-label-icon" />
                  {field.label}
                  {field.canEdit && !isEditing && onStartEdit && (
                    <button
                      onClick={() => handleStartEdit(field)}
                      style={{ marginLeft: 'auto', padding: '2px', opacity: 0.6 }}
                      title="Editar"
                    >
                      <Edit2 size={12} />
                    </button>
                  )}
                </label>
                {isEditing ? (
                  <div className="ui-field-input" style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => onStartEdit && onStartEdit(field.key, e.target.value)}
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'var(--color-on-background)',
                        fontSize: 'inherit',
                      }}
                      disabled={saving}
                      autoFocus
                    />
                    <button
                      onClick={onSave}
                      disabled={saving}
                      style={{ color: 'var(--color-success)', padding: '4px' }}
                      title="Guardar"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={onCancelEdit}
                      disabled={saving}
                      style={{ color: 'var(--color-error)', padding: '4px' }}
                      title="Cancelar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="ui-field-input">
                    <span className="text-[var(--color-on-background)] font-medium">
                      {field.value}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
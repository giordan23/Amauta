import { User, Mail, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import type { User as UserType } from '@/types/auth';

interface PersonalInfoCardProps {
  user: UserType | null;
  mockRegisterDate: string;
}

export function PersonalInfoCard({ user, mockRegisterDate }: PersonalInfoCardProps) {
  const fields = [
    {
      icon: User,
      label: 'Nombre',
      value: user?.firstName || 'Usuario',
      gridSpan: 'sm:col-span-1'
    },
    {
      icon: User,
      label: 'Apellido',
      value: user?.lastName || '-',
      gridSpan: 'sm:col-span-1'
    },
    {
      icon: Mail,
      label: 'Email',
      value: user?.email || '-',
      gridSpan: 'sm:col-span-2'
    },
    {
      icon: Calendar,
      label: 'Fecha de Registro',
      value: mockRegisterDate,
      gridSpan: 'sm:col-span-1'
    }
  ];

  return (
    <div className="ui-card">
      <div className="ui-card-header">
        <User className="ui-card-icon" />
        <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Información Personal</h3>
      </div>
      <div className="ui-card-content">
        <div className="grid gap-6 sm:grid-cols-2">
          {fields.map((field, index) => {
            const Icon = field.icon;
            return (
              <div key={index} className={`ui-field-group ${field.gridSpan}`}>
                <label className="ui-field-label">
                  <Icon className="ui-field-label-icon" />
                  {field.label}
                </label>
                <div className="ui-field-input">
                  <span className="text-[var(--color-on-background)] font-medium">
                    {field.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
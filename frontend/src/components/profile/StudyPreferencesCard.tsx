import { BookOpen, GraduationCap } from 'lucide-react';

interface StudyPreferencesCardProps {
  mockCareer: string;
  mockUniversity: string;
}

export function StudyPreferencesCard({ mockCareer, mockUniversity }: StudyPreferencesCardProps) {
  const preferences = [
    {
      icon: GraduationCap,
      label: 'Carrera Objetivo',
      value: mockCareer
    },
    {
      icon: BookOpen,
      label: 'Universidad Objetivo',
      value: mockUniversity
    }
  ];

  return (
    <div className="ui-card">
      <div className="ui-card-header">
        <BookOpen className="ui-card-icon" />
        <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Preferencias Académicas</h3>
      </div>
      <div className="ui-card-content">
        <div className="space-y-6">
          {preferences.map((pref, index) => {
            const Icon = pref.icon;
            return (
              <div key={index} className="ui-field-group">
                <label className="ui-field-label">
                  <Icon className="ui-field-label-icon" />
                  {pref.label}
                </label>
                <div className="ui-field-input">
                  <span className="text-[var(--color-on-background)] font-medium">{pref.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
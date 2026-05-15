import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';

interface ProgressOverviewCardProps {
  mockRank: string;
  progressPercentage?: number;
}

export function ProgressOverviewCard({ 
  mockRank, 
  progressPercentage = 78 
}: ProgressOverviewCardProps) {
  const remainingProgress = 100 - progressPercentage;
  
  return (
    <div className="ui-card">
      <div className="ui-card-header">
        <div className="ui-card-icon">📈</div>
        <h3 className="text-lg font-semibold text-[var(--color-on-surface)]">Progreso Académico</h3>
      </div>
      
      <div className="ui-card-content space-y-4">
        <div className="progress-level-indicator">
          <div className="text-lg font-bold text-[var(--color-on-background)] mb-1">{mockRank}</div>
          <div className="text-sm text-[var(--color-text-secondary)]">Nivel Actual</div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-secondary)]">Progreso al siguiente nivel</span>
            <span className="font-medium text-[var(--color-on-background)]">{progressPercentage}%</span>
          </div>
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-[var(--color-text-muted)] text-center">
            {remainingProgress}% restante para alcanzar nivel "Experto"
          </div>
        </div>
      </div>
    </div>
  );
}
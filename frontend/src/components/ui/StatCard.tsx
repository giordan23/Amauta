import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className = '',
  ...props
}: StatCardProps) {
  return (
    <div className={cn('stat-card', className)} {...props}>
      {Icon && (
        <div className="stat-icon">
          <Icon size={48} strokeWidth={1.5} />
        </div>
      )}
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title}</div>
      {subtitle && (
        <div className="stat-subtitle" style={{
          marginTop: 'var(--space-2)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-secondary)'
        }}>
          {subtitle}
        </div>
      )}
      {trend && (
        <div className={cn(
          'stat-trend',
          trend === 'up' ? 'stat-trend-up' : trend === 'down' ? 'stat-trend-down' : ''
        )} style={{
          marginTop: 'var(--space-2)',
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          {trend === 'up' && '+'}
          {trend === 'down' && '-'}
          {trend === 'neutral' && '='}
        </div>
      )}
    </div>
  );
}
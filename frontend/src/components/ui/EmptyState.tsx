import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className = '',
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex-col-center',
        'animate-fade-in',
        className
      )}
      style={{
        padding: 'var(--space-12) var(--space-6)',
        textAlign: 'center'
      }}
      {...props}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 'var(--space-4)'
        }}
      >
        <Icon
          size={32}
          strokeWidth={1.5}
          style={{ color: 'var(--color-text-muted)' }}
        />
      </div>
      <h3
        style={{
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)'
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)',
            maxWidth: '320px',
            marginBottom: action ? 'var(--space-6)' : '0'
          }}
        >
          {description}
        </p>
      )}
      {action && (
        <div>{action}</div>
      )}
    </div>
  );
}
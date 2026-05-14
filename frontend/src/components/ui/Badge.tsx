import { cn } from '@/utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'default' | 'info';
}

export function Badge({
  variant = 'default',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    success: {
      backgroundColor: 'var(--color-success)',
      color: '#ffffff'
    },
    warning: {
      backgroundColor: 'var(--color-warning)',
      color: '#ffffff'
    },
    error: {
      backgroundColor: 'var(--color-error)',
      color: '#ffffff'
    },
    info: {
      backgroundColor: 'var(--color-primary)',
      color: '#ffffff'
    },
    default: {
      backgroundColor: 'var(--color-surface-elevated)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)'
    }
  };

  return (
    <span
      className={cn('badge', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 'var(--space-1) var(--space-3)',
        borderRadius: 'var(--radius-full)',
        fontSize: 'var(--font-size-xs)',
        fontWeight: 'var(--font-weight-medium)',
        lineHeight: 'var(--line-height-normal)',
        ...variantStyles[variant]
      }}
      {...props}
    >
      {children}
    </span>
  );
}
import { cn } from '@/utils/cn';

export interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'row' | 'circle';
  count?: number;
  className?: string;
}

export function SkeletonLoader({
  variant = 'text',
  count = 1,
  className = '',
  ...props
}: SkeletonLoaderProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    text: {
      height: '16px',
      borderRadius: 'var(--radius-sm)',
      width: '100%'
    },
    card: {
      height: '120px',
      borderRadius: 'var(--radius-xl)',
      width: '100%'
    },
    row: {
      height: '48px',
      borderRadius: 'var(--radius-base)',
      width: '100%'
    },
    circle: {
      height: '48px',
      width: '48px',
      borderRadius: '50%'
    }
  };

  return (
    <div
      className={cn('skeleton-container', className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        width: '100%'
      }}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="skeleton"
          style={variantStyles[variant]}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('card', 'card-elevated', className)}
      style={{ padding: 'var(--space-6)' }}
      {...props}
    >
      <SkeletonLoader variant="circle" />
      <div style={{ marginTop: 'var(--space-4)' }}>
        <SkeletonLoader variant="text" />
        <div style={{ marginTop: 'var(--space-2)' }}>
          <SkeletonLoader variant="text" />
        </div>
      </div>
    </div>
  );
}
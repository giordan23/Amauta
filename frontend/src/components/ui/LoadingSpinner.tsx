import { cn } from '@/utils/cn';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export function LoadingSpinner({
  size = 'md',
  message,
  className = '',
  ...props
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '40px'
  };

  const borderSizeMap = {
    sm: '2px',
    md: '3px',
    lg: '4px'
  };

  return (
    <div
      className={cn('flex-col-center', className)}
      style={{ gap: 'var(--space-3)' }}
      {...props}
    >
      <div
        className="loading-spinner"
        style={{
          width: sizeMap[size],
          height: sizeMap[size],
          borderRadius: '50%',
          border: `${borderSizeMap[size]} solid var(--color-border)`,
          borderTopColor: 'var(--color-primary)',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      {message && (
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)'
          }}
        >
          {message}
        </span>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
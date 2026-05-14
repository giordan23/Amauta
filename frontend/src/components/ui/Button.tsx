import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false,
  fullWidth = false,
  iconOnly = false,
  children, 
  disabled, 
  ...props 
}: ButtonProps) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const loadingClass = loading ? 'loading' : '';
  const fullWidthClass = fullWidth ? 'btn-full' : '';
  const iconClass = iconOnly ? 'btn-icon' : '';
  
  const buttonClasses = cn(
    baseClass,
    variantClass,
    sizeClass,
    loadingClass,
    fullWidthClass,
    iconClass,
    className
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {children}
    </button>
  );
}

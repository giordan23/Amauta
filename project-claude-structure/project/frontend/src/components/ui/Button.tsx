import { Loader2 } from 'lucide-react';
import { buttonVariants } from './buttonVariants';
import type { ButtonProps } from './buttonVariants';
import { cn } from '@/utils/cn';

export function Button({ variant, size, className, loading, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </div>
    </button>
  );
}

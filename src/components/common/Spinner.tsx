import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
}

export const Spinner = ({ className, size = 'default', ...props }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-b-2 border-primary',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
};
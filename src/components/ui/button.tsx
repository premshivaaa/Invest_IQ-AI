import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'success';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200 active:scale-98 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            // Default indigo glow button
            'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 hover:shadow-indigo-500/20 hover:shadow-lg':
              variant === 'default',
            // Destructive rose red button
            'bg-rose-600 text-white shadow-sm hover:bg-rose-500 hover:shadow-rose-500/20 hover:shadow-lg':
              variant === 'destructive',
            // Emerald green button
            'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 hover:shadow-emerald-500/20 hover:shadow-lg':
              variant === 'success',
            // Outline border button
            'border border-neutral-800 bg-neutral-950/40 text-neutral-200 hover:bg-neutral-900/60 hover:text-white hover:border-neutral-700':
              variant === 'outline',
            // Secondary dark button
            'bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white':
              variant === 'secondary',
            // Ghost button
            'text-neutral-400 hover:bg-neutral-900/50 hover:text-neutral-100':
              variant === 'ghost',
            // Link button
            'text-indigo-400 underline-offset-4 hover:underline hover:text-indigo-300':
              variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-8 rounded-lg px-3 text-xs': size === 'sm',
            'h-12 rounded-2xl px-8 text-base': size === 'lg',
            'h-10 w-10 p-0': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };

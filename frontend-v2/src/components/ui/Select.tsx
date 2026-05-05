import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          'h-10 w-full rounded-lg bg-surface border border-border px-3 text-sm text-accent',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    )
  },
)

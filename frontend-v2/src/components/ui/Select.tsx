import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...rest }, ref) {
    return (
      <select
        ref={ref}
        className={cn(
          'h-10 w-full rounded-xl bg-surface/90 border border-border px-3 text-sm text-accent shadow-soft',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand/50',
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

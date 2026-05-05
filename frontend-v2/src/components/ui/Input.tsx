import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, invalid, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-lg bg-surface border px-3 text-sm text-accent placeholder:text-muted',
        'transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        invalid ? 'border-red-500/60' : 'border-border',
        className,
      )}
      {...rest}
    />
  )
})

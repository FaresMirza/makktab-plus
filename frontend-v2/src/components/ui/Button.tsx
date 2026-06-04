import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-brand-contrast hover:bg-brand-strong disabled:bg-brand/40 disabled:text-brand-contrast/70 font-medium shadow-soft',
  secondary:
    'bg-elevated text-accent hover:bg-elevated/80 border border-border font-medium',
  outline:
    'bg-transparent text-accent hover:bg-brand-soft border border-border font-medium',
  ghost: 'bg-transparent text-accent hover:bg-elevated',
  danger:
    'bg-red-600 text-white hover:bg-red-500 disabled:bg-red-600/50 font-medium',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-4 text-sm rounded-lg',
  lg: 'h-12 px-6 text-base rounded-lg',
  icon: 'h-9 w-9 rounded-md flex items-center justify-center',
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, variant = 'primary', size = 'md', loading, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-150',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        'disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
})

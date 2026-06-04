import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'default' | 'success' | 'warning' | 'danger' | 'info'

const tones: Record<Tone, string> = {
  default: 'bg-brand-soft text-accent border-border',
  success: 'bg-emerald-500/12 text-emerald-300 border-emerald-500/30',
  warning: 'bg-amber-500/12 text-amber-300 border-amber-500/30',
  danger: 'bg-red-500/12 text-red-300 border-red-500/30',
  info: 'bg-sky-500/12 text-sky-300 border-sky-500/30',
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Badge({ className, tone = 'default', ...rest }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        tones[tone],
        className,
      )}
      {...rest}
    />
  )
}

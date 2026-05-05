import { type LabelHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Label({ className, ...rest }: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn('block text-sm font-medium text-accent/90 mb-1.5', className)}
      {...rest}
    />
  )
}

import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Table({ className, ...rest }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-[1.4rem] brand-panel">
      <table className={cn('w-full text-sm', className)} {...rest} />
    </div>
  )
}

export function THead({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('border-b border-border bg-brand-soft', className)} {...rest} />
}

export function TR({ className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        'border-b border-border last:border-0 hover:bg-brand-soft transition-colors',
        className,
      )}
      {...rest}
    />
  )
}

export function TH({ className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'h-11 px-4 text-right font-medium text-muted uppercase text-xs tracking-wide',
        className,
      )}
      {...rest}
    />
  )
}

export function TD({ className, ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-4 py-3 text-accent/90 align-middle', className)} {...rest} />
}

export function TBody({ className, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...rest} />
}

export function EmptyRow({ colSpan, label = 'لا توجد بيانات' }: { colSpan: number; label?: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center text-muted">
        {label}
      </td>
    </tr>
  )
}

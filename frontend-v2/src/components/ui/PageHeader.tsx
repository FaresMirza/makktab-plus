import { type ReactNode } from 'react'

interface Props {
  title: string
  description?: string
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-[1.6rem] brand-panel px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="min-w-0">
        <div className="mb-3 h-1.5 w-20 rounded-full bg-gradient-to-l from-brand-strong to-brand" />
        <h1 className="text-xl sm:text-2xl font-semibold text-accent">{title}</h1>
        {description && (
          <p className="text-sm text-muted mt-2 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-wrap">{actions}</div>
      )}
    </div>
  )
}

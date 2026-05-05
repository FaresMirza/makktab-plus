import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-CA') // YYYY-MM-DD
}

export function formatDateTime(value: string | Date | null | undefined): string {
  if (!value) return '—'
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getApiErrorMessage(error: unknown, fallback = 'حدث خطأ'): string {
  const e = error as { response?: { data?: { message?: string | string[] } }; message?: string }
  const m = e?.response?.data?.message
  if (Array.isArray(m)) return m.join(' · ')
  if (typeof m === 'string') return m
  return e?.message || fallback
}

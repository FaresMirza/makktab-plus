import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/auth/ThemeContext'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  variant?: 'icon' | 'inline'
}

export function ThemeToggle({ className, variant = 'icon' }: Props) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  if (variant === 'inline') {
    return (
      <button
        type="button"
        onClick={toggle}
        className={cn(
          'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-accent hover:bg-elevated/60 transition-colors',
          className,
        )}
        aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      >
        {isDark ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
        <span>{isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'h-9 w-9 rounded-md border border-border bg-surface hover:bg-elevated flex items-center justify-center text-muted hover:text-accent transition-colors',
        className,
      )}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      title={isDark ? 'الوضع الفاتح' : 'الوضع الداكن'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

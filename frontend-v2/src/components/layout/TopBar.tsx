import { Menu } from 'lucide-react'
import { useAuth } from '@/auth/AuthContext'

export function TopBar() {
  const { user, logout } = useAuth()
  return (
    <header className="lg:hidden flex items-center justify-between px-4 h-14 border-b border-border bg-surface sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <img src="/icon.png" alt="" className="h-7 w-7 rounded-md" />
        <span className="text-sm font-semibold text-accent">Makktab</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted truncate max-w-[120px]">
          {user?.fullName || user?.username}
        </span>
        <button
          onClick={logout}
          className="h-8 w-8 rounded-md hover:bg-elevated flex items-center justify-center text-muted"
          aria-label="تسجيل الخروج"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}

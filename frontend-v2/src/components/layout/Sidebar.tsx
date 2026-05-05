import { NavLink } from 'react-router-dom'
import {
  Building2,
  ClipboardCheck,
  FileText,
  FolderKanban,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  LogOut,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/AuthContext'

interface Item {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const adminItems: Item[] = [
  { to: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { to: '/admin/offices', label: 'المكاتب', icon: Building2 },
  { to: '/admin/pending', label: 'طلبات التسجيل', icon: ClipboardCheck },
  { to: '/admin/admins', label: 'المسؤولون', icon: ShieldCheck },
  { to: '/admin/audit', label: 'سجل التدقيق', icon: FileText },
]

const officeItems: Item[] = [
  { to: '/office', label: 'لوحة التحكم', icon: LayoutDashboard },
  { to: '/office/projects', label: 'المشاريع', icon: FolderKanban },
  { to: '/office/tasks', label: 'مهامي', icon: ListChecks },
  { to: '/office/users', label: 'الموظفون', icon: Users },
  { to: '/office/password', label: 'كلمة المرور', icon: KeyRound },
]

export function Sidebar() {
  const { user, logout } = useAuth()
  const items = user?.role === 'super_admin' ? adminItems : officeItems

  return (
    <aside className="w-64 shrink-0 bg-surface border-l border-border flex flex-col h-screen sticky top-0">
      <div className="px-5 py-6 border-b border-border flex items-center gap-3">
        <img src="/icon.png" alt="Makktab Plus" className="h-9 w-9 rounded-lg object-cover" />
        <div className="leading-tight">
          <div className="font-semibold text-accent">Makktab Plus</div>
          <div className="text-xs text-muted">
            {user?.role === 'super_admin' ? 'منصة الإدارة' : 'بوابة المكتب'}
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin' || item.to === '/office'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive
                  ? 'bg-elevated text-accent font-medium'
                  : 'text-muted hover:text-accent hover:bg-elevated/60',
              )
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-border">
        <div className="px-3 py-2 mb-2">
          <div className="text-sm text-accent font-medium truncate">
            {user?.fullName || user?.username || '—'}
          </div>
          <div className="text-xs text-muted truncate">{user?.username}</div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  )
}

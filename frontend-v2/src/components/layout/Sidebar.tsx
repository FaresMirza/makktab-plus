import { useState } from 'react'
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
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/auth/AuthContext'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

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

interface Props {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: Props) {
  const { user, logout } = useAuth()
  const [confirmLogout, setConfirmLogout] = useState(false)
  const items = user?.role === 'super_admin' ? adminItems : officeItems

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/60 lg:hidden transition-opacity',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          'fixed lg:sticky top-0 right-0 z-40 h-screen w-72 lg:w-64 shrink-0',
          'bg-surface border-l border-border flex flex-col',
          'transition-transform duration-200 ease-out',
          open ? 'translate-x-0' : 'translate-x-full lg:translate-x-0',
        )}
      >
        <div className="px-5 py-5 border-b border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/icon.png"
              alt="Makktab Plus"
              className="h-9 w-9 rounded-lg object-cover shrink-0"
            />
            <div className="leading-tight min-w-0">
              <div className="font-semibold text-accent truncate">Makktab Plus</div>
              <div className="text-xs text-muted truncate">
                {user?.role === 'super_admin' ? 'منصة الإدارة' : 'بوابة المكتب'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden h-8 w-8 rounded-md hover:bg-elevated text-muted hover:text-accent flex items-center justify-center"
            aria-label="إغلاق القائمة"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin' || item.to === '/office'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
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

        <div className="px-3 py-4 border-t border-border space-y-1">
          <div className="px-3 py-2 mb-1">
            <div className="text-sm text-accent font-medium truncate">
              {user?.fullName || user?.username || '—'}
            </div>
            <div className="text-xs text-muted truncate">{user?.username}</div>
          </div>
          <ThemeToggle variant="inline" />
          <button
            onClick={() => setConfirmLogout(true)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      <Dialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        title="تأكيد تسجيل الخروج"
        description="هل أنت متأكد من تسجيل الخروج من حسابك؟ ستحتاج لتسجيل الدخول مرة أخرى."
      >
        <div className="flex justify-start gap-2 pt-2">
          <Button
            variant="danger"
            onClick={() => {
              setConfirmLogout(false)
              logout()
            }}
          >
            <LogOut className="h-4 w-4" />
            تسجيل الخروج
          </Button>
          <Button variant="outline" onClick={() => setConfirmLogout(false)}>
            إلغاء
          </Button>
        </div>
      </Dialog>
    </>
  )
}

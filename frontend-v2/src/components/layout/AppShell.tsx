import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { useAuth } from '@/auth/AuthContext'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function AppShell() {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg flex relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-soft blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col relative">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-surface/85 backdrop-blur border-b border-border h-14 flex items-center justify-between px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="h-9 w-9 rounded-md hover:bg-elevated flex items-center justify-center text-muted hover:text-accent"
            aria-label="فتح القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <img src="/icon.png" alt="" className="h-7 w-7 rounded-md" />
            <span className="text-sm font-semibold text-accent truncate">
              {user?.fullName || user?.username || 'Makktab Plus'}
            </span>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

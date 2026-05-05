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
    <div className="min-h-screen bg-bg flex">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-20 bg-surface/80 backdrop-blur border-b border-border h-14 flex items-center justify-between px-4">
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

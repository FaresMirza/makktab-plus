import { type ReactNode } from 'react'

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4 py-12">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] bg-white/[0.04] rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/icon.png"
            alt="Makktab Plus"
            className="h-16 w-16 rounded-2xl object-cover shadow-soft"
          />
          <h1 className="text-2xl font-semibold text-accent mt-4">Makktab Plus</h1>
          <p className="text-sm text-muted mt-1">منصة إدارة المكاتب الذكية</p>
        </div>
        {children}
      </div>
    </div>
  )
}

import type { PropsWithChildren } from 'react'
import { Sidebar } from '@/widgets/navigation/sidebar'

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_20%_10%,#f1e7d8_0%,transparent_35%),radial-gradient(circle_at_90%_15%,#dfefe9_0%,transparent_40%),linear-gradient(180deg,#fffaf0_0%,#f7f4ee_100%)]">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}

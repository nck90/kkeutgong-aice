import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { EliceSidebar } from './EliceSidebar'

/*
  Elice Academy Main Layout
  - Fixed Left Sidebar (220px)
  - Fixed Top Header (56px)
  - Scrollable Main Content Area (bg #F0F1F3)
*/
export function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-[#F0F1F3] font-sans">
      <Header onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div className="flex pt-[56px]">
        {/* Sidebar */}
        <div
          className={`shrink-0 transition-all duration-300 ${sidebarCollapsed ? 'w-0 overflow-hidden' : 'w-[220px]'
            }`}
        >
          <EliceSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 min-h-[calc(100vh-56px)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'

/* 
  Elice Academy Main Layout 
  - No Sidebar on Home/Dashboard Pages (Top Nav Only)
  - Centered Content Container
*/
export function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-[64px] font-sans">
      <Header onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

      {/* 
        Elice Structure: 
        No generic sidebar here. 
        Content is centered max-width 1280px or 100% depending on page 
      */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* Mobile Menu Overlay would go here in a real app */}
    </div>
  )
}

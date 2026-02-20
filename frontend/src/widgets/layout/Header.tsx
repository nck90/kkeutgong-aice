import { Bell, Search, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { useAiceStore } from '@/shared/model/store'

const navLinks = [
  { label: '홈', href: '/home' },
  // { label: '모의고사', href: '/mock' }, 
  // Temporarily hidden until a dedicated history page is built. 
  // Users access mock exams via the Dashboard Roadmap.
]

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[64px] glass-header flex items-center justify-center transition-all duration-300">
      <div className="w-full max-w-[1280px] px-6 h-full flex items-center justify-between">

        {/* Left: Logo & Nav */}
        <div className="flex items-center gap-10">
          <Link to="/home" className="flex items-center gap-2">
            {/* Simple Text Logo like Elice */}
            <span className="text-[22px] font-bold tracking-tight text-[#7353EA]">AICE Prep</span>
          </Link>

          {/* Desktop Nav - Clean Text Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => {
              const isActive = location.pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link text-[15px] font-medium transition-colors ${isActive ? 'text-[#7353EA] font-semibold nav-link-active' : 'text-[#191F28] hover:text-[#7353EA]'
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right: Search & Profile */}
        <div className="flex items-center gap-4">
          {/* Elice-style Search Icon Button (Minimal) */}
          <button className="p-2 text-[#191F28] hover:bg-slate-50 rounded-full transition-colors">
            <Search className="h-5 w-5" />
          </button>

          <button className="p-2 text-[#191F28] hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>

          {/* Profile Circle */}
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="btn-glow h-9 w-9 bg-gray-100 rounded-full overflow-hidden hover:ring-2 hover:ring-[#7353EA]/20 transition-all focus:outline-none"
              onClick={() => {
                const menu = document.getElementById('user-menu')
                if (menu) menu.classList.toggle('hidden')
              }}
              onBlur={() => {
                // Delay hiding to allow click events on menu items
                setTimeout(() => {
                  const menu = document.getElementById('user-menu')
                  if (menu) menu.classList.add('hidden')
                }, 200)
              }}
            >
              <div className="h-full w-full bg-gradient-to-br from-[#7353EA] to-[#AB9DFE] flex items-center justify-center text-white font-bold text-xs">
                JW
              </div>
            </button>

            {/* Dropdown Menu */}
            <div
              id="user-menu"
              className="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-[#191F28]">User님</p>
                <p className="text-xs text-gray-500 truncate">user@example.com</p>
              </div>

              <div className="p-1">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => {
                    useAiceStore.getState().reset()
                    localStorage.removeItem('aice-storage') // clear persistence
                    window.location.href = '/onboarding-entry'
                  }}
                >
                  로그아웃
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => {
                    if (confirm('정말로 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')) {
                      useAiceStore.getState().reset()
                      // Clear all local storage to ensure a fresh start
                      localStorage.clear()

                      window.location.href = '/'
                    }
                  }}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

import { Bell, MessageSquare, Search, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/button'
import { useAiceStore } from '@/shared/model/store'
import { getAuthSession, clearAuthSession } from '@/shared/api/auth'
import { apiRequest } from '@/shared/api/http-client'

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const session = getAuthSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[56px] bg-white border-b border-[#E5E8EB] flex items-center justify-between px-4">
      {/* Left: Hamburger + Logo + LXP */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-1.5 text-[#191F28] hover:bg-[#F1F3F5] rounded-md transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#7353EA] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-[17px] font-bold tracking-tight text-[#191F28]">끝공 아카데미</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 ml-2 px-2.5 py-1 bg-[#F1F3F5] rounded-md cursor-pointer hover:bg-[#E5E8EB] transition-colors">
          <span className="text-[13px] font-medium text-[#4E5968]">LXP</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#8B95A1]">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Center/Right: Search */}
      <div className="hidden md:flex items-center">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F1F3F5] rounded-lg border border-transparent hover:border-[#E5E8EB] transition-colors cursor-pointer min-w-[240px]">
          <Search className="w-4 h-4 text-[#8B95A1]" />
          <span className="text-[13px] text-[#8B95A1] flex-1">검색</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-white border border-[#E5E8EB] rounded text-[11px] text-[#8B95A1] font-medium">
            ⌘+K
          </kbd>
        </div>
      </div>

      {/* Right: Icons + Profile */}
      <div className="flex items-center gap-1">
        <button className="p-2 text-[#4E5968] hover:bg-[#F1F3F5] rounded-lg transition-colors relative">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
        </button>

        <button className="p-2 text-[#4E5968] hover:bg-[#F1F3F5] rounded-lg transition-colors">
          <MessageSquare className="w-[18px] h-[18px]" />
        </button>

        {/* Profile */}
        {session ? (
          <div className="relative ml-1">
            <button
              className="h-8 w-8 rounded-full overflow-hidden hover:ring-2 hover:ring-[#7353EA]/20 transition-all focus:outline-none"
              onClick={() => {
                const menu = document.getElementById('user-menu')
                if (menu) menu.classList.toggle('hidden')
              }}
              onBlur={() => {
                setTimeout(() => {
                  const menu = document.getElementById('user-menu')
                  if (menu) menu.classList.add('hidden')
                }, 200)
              }}
            >
              <div className="h-full w-full bg-gradient-to-br from-[#7353EA] to-[#AB9DFE] flex items-center justify-center text-white font-bold text-xs">
                {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </button>

            <div
              id="user-menu"
              className="hidden absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-bold text-[#191F28]">{session.user.name || '사용자'}</p>
                <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
              </div>

              <div className="p-1">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => {
                    clearAuthSession()
                    useAiceStore.getState().reset()
                    window.location.href = '/'
                  }}
                >
                  로그아웃
                </button>
                <button
                  className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  onClick={async () => {
                    if (confirm('정말로 탈퇴하시겠습니까? 관련 데이터가 모두 삭제됩니다.')) {
                      try {
                        await apiRequest('/api/auth/withdraw', { method: 'DELETE' })
                        clearAuthSession()
                        useAiceStore.getState().reset()
                        window.location.href = '/'
                      } catch (err) {
                        alert('탈퇴 중 오류가 발생했습니다.')
                      }
                    }
                  }}
                >
                  회원탈퇴
                </button>
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="ml-2">
            <Button variant="default" className="text-sm rounded-full px-5 bg-[#7353EA] hover:bg-[#6442DF] h-8">
              로그인
            </Button>
          </Link>
        )}
      </div>
    </header>
  )
}

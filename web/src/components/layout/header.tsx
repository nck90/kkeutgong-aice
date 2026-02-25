'use client'

import { Bell, Search, User } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Header() {
    const pathname = usePathname()

    const getTitle = () => {
        if (pathname.includes('/plan')) return '학습 플랜'
        if (pathname.includes('/textbook')) return 'AICE 개념장'
        if (pathname.includes('/labs')) return '정규 실습 (Labs)'
        if (pathname.includes('/session')) return '라이브 실습 환경'
        if (pathname.includes('/dashboard')) return '대시보드'
        if (pathname.includes('/diagnostic')) return '약점 진단'
        return '끝공 AICE'
    }

    return (
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-border z-10 sticky top-0">
            <h1 className="text-2xl font-black text-gray-900">{getTitle()}</h1>

            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="개념이나 실습 검색..."
                        className="pl-10 pr-4 py-2 bg-gray-50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64 transition-all"
                    />
                </div>

                <button className="relative p-2 text-muted-foreground hover:text-primary transition-colors bg-gray-50 rounded-full hover:bg-primary/5">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-border">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-gray-900">수험생 님</div>
                        <div className="text-[11px] text-muted-foreground font-bold tracking-wide uppercase">AICE Associate</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-[#5F3DC4] flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer hover:opacity-90 transition-opacity">
                        <User className="w-5 h-5 fill-white/20" />
                    </div>
                </div>
            </div>
        </header>
    )
}

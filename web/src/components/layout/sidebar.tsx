'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, BookOpen, Code, BrainCircuit, Activity } from 'lucide-react'

const navItems = [
    { name: '대시보드', href: '/dashboard', icon: Home },
    { name: '학습 플랜', href: '/plan', icon: Calendar },
    { name: 'AICE 개념장', href: '/textbook', icon: BookOpen },
    { name: '정규 실습 (Labs)', href: '/labs', icon: Code },
    { name: '약점 진단 (Beta)', href: '/diagnostic', icon: BrainCircuit },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-[#111] text-white flex flex-col h-screen border-r border-[#222]">
            <div className="p-6">
                <Link href="/dashboard" className="text-2xl font-black tracking-tighter text-white hover:text-primary transition-colors">
                    끝공<span className="text-primary text-xs ml-2 align-top rounded-full bg-primary/20 px-2 py-0.5">AICE</span>
                </Link>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-primary text-white font-bold shadow-[0_0_15px_rgba(115,83,234,0.3)]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5 font-medium'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 mx-4 mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-[#5F3DC4]/20 border border-primary/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-bl-full blur-xl"></div>
                <div className="flex items-center gap-2 mb-2 relative z-10">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-white">학습 AI 동기화</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed relative z-10">
                    마지막 활동 기록이<br />성공적으로 분석되었습니다.
                </p>
            </div>
        </aside>
    )
}

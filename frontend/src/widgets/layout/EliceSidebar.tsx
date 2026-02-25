import { Link, useLocation } from 'react-router-dom'
import {
    Home,
    Compass,
    BookOpen,
    LayoutDashboard,
    Monitor,
    ExternalLink
} from 'lucide-react'
import { cn } from '@/shared/lib/utils'

const sidebarItems = [
    { label: '기관 홈', href: '/', icon: Home, external: true },
    { label: '탐색', href: '/labs', icon: Compass },
    { label: '내 클래스', href: '/my-classes', icon: BookOpen },
    { label: '대시보드', href: '/report', icon: LayoutDashboard },
    { label: '전체 강의', href: '/classes', icon: Monitor },
]

export function EliceSidebar() {
    const location = useLocation()

    return (
        <aside className="elice-sidebar">
            <nav className="flex flex-col gap-1 px-3 py-4">
                {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive =
                        item.href === '/'
                            ? location.pathname === '/'
                            : location.pathname.startsWith(item.href)

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                'elice-sidebar-item',
                                isActive && 'elice-sidebar-item-active'
                            )}
                        >
                            <Icon className="w-[18px] h-[18px] shrink-0" />
                            <span className="text-[14px] leading-tight">{item.label}</span>
                            {item.external && (
                                <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-40" />
                            )}
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}

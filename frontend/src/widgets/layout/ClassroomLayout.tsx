import { Outlet, Link } from "react-router-dom"
import { ChevronLeft, Menu } from "lucide-react"
import { Button } from "@/shared/ui/button"

export function ClassroomLayout() {
    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">
            {/* Classroom Header */}
            <header className="flex h-12 items-center justify-between border-b border-border bg-card px-4 shrink-0">
                <div className="flex items-center gap-4">
                    <Link to="/" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                        <ChevronLeft className="h-5 w-5" />
                        <span className="sr-only">나가기</span>
                    </Link>
                    <div className="h-4 w-px bg-border" />
                    <h1 className="text-sm font-semibold">실습 세션 (제목)</h1>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">자동 저장됨</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>
            </header>

            {/* Main Content Area (IDE) */}
            <main className="flex-1 overflow-hidden relative">
                <Outlet />
            </main>
        </div>
    )
}

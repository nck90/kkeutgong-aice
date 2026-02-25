import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    ChevronLeft,
    ChevronRight,
    Menu,
    CheckCircle2
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getChaptersByLevel } from '@/shared/data/curriculum'
import { useAiceStore } from '@/shared/model/store'
import { cn } from '@/shared/lib/utils'

import { ContentPanel } from '@/widgets/learning/ContentPanel'
import { CodeEditorPanel } from '@/widgets/learning/CodeEditorPanel'

/* 
  Elice Learning Layout (Split View - Flexbox Fallback):
  - Left Sidebar: Navigation
  - Center: Content Panel (Flex 1)
  - Right: Code Editor Panel (Flex 1)
*/

export function LearningPage() {
    const { courseId, stepId } = useParams()
    const { completedStepIds } = useAiceStore()

    // Map existing course IDs to AICE Levels
    let levelKey: 'JUNIOR' | 'BASIC' | 'ASSOCIATE' = 'ASSOCIATE'
    if (courseId?.includes('junior')) levelKey = 'JUNIOR'
    if (courseId?.includes('basic')) levelKey = 'BASIC'

    const chapters = getChaptersByLevel(levelKey)
    if (chapters.length === 0) return <div>Curriculum not found</div>

    const allSteps = chapters.flatMap(c => c.steps)
    const currentStep = allSteps.find(s => s.id === stepId) || allSteps[0]

    // Navigation Logic
    const currentIndex = allSteps.findIndex(s => s.id === currentStep.id)
    const prevStep = allSteps[currentIndex - 1]
    const nextStep = allSteps[currentIndex + 1]

    const [sidebarOpen, setSidebarOpen] = useState(true)
    const courseTitle = `AICE ${levelKey.charAt(0) + levelKey.slice(1).toLowerCase()} 과정`

    // Calculate progression based on completed step IDs
    const completedCount = allSteps.filter(s => completedStepIds.includes(s.id)).length
    const progress = Math.round((completedCount / allSteps.length) * 100) || 0

    return (
        <div className="flex h-screen w-full bg-[#F5F5F5] overflow-hidden fixed inset-0 z-[100]">
            {/* 1. Left Sidebar - Dark Theme (Elice Style) */}
            <aside className={cn(
                "bg-[#1A1A1A] h-full flex flex-col transition-all duration-300 border-r border-[#333] shrink-0",
                sidebarOpen ? "w-[300px]" : "w-0 -ml-[300px]"
            )}>
                {/* Sidebar Header */}
                <div className="h-[64px] flex items-center px-5 border-b border-[#333] shrink-0">
                    <Link to="/report" className="text-white/80 hover:text-white mr-3">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-white font-bold text-sm truncate">{courseTitle}</h2>
                </div>

                {/* Lesson List */}
                <div className="flex-1 overflow-y-auto py-2">
                    {chapters.map((chapter) => (
                        <div key={chapter.id} className="mb-2">
                            <div className="px-5 py-3 text-[#888] text-xs font-bold uppercase tracking-wider line-clamp-2">
                                {chapter.title}
                            </div>
                            <div>
                                {chapter.steps.map(step => {
                                    const isActive = step.id === currentStep.id
                                    const isCompleted = completedStepIds.includes(step.id)
                                    return (
                                        <Link
                                            key={step.id}
                                            to={`/course/${courseId}/${step.id}`}
                                            className={cn(
                                                "flex items-center gap-3 px-5 py-3 text-sm transition-colors border-l-[3px]",
                                                isActive
                                                    ? "bg-[#2A2A2A] text-white border-[#7353EA]"
                                                    : "text-[#AAA] border-transparent hover:bg-[#222] hover:text-white"
                                            )}
                                        >
                                            {isCompleted ? (
                                                <CheckCircle2 className="w-4 h-4 text-[#00C471] shrink-0" />
                                            ) : (
                                                <div className={cn("w-4 h-4 rounded-full border shrink-0", isActive ? "border-[#7353EA]" : "border-[#555]")} />
                                            )}
                                            <span className="line-clamp-2 leading-tight flex-1">{step.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#333]">
                    <div className="text-[#666] text-xs mb-2">진행률 {progress}%</div>
                    <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C471]" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </aside>

            {/* 2. Main Content Area */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute top-4 left-4 z-50 p-2 bg-[#1A1A1A] text-white rounded-md shadow-md"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}

                <div className="flex-1 flex flex-row overflow-hidden relative">
                    {/* Left Panel: Content */}
                    <div className={cn("flex flex-col min-w-0 border-r border-[#E5E8EB] overflow-hidden bg-white",
                        currentStep.type === 'CODING' ? "flex-1" : "w-full flex-1"
                    )}>
                        <ContentPanel step={currentStep} />
                    </div>

                    {/* Right Panel: Code Editor (Only for Coding/Practice) */}
                    {currentStep.type === 'CODING' && (
                        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#1e1e1e]">
                            <CodeEditorPanel
                                language="python"
                                step={currentStep}
                            />
                        </div>
                    )}
                </div>

                {/* 3. Footer Navigation Bar */}
                <div className="h-[72px] bg-white border-t border-[#E5E8EB] flex items-center justify-between px-8 shrink-0 z-10 w-full">
                    <Button
                        variant="outline"
                        className="border-[#E5E8EB] text-[#8B95A1] hover:text-[#191F28]"
                        disabled={!prevStep}
                        asChild={!!prevStep}
                    >
                        {prevStep ? (
                            <Link to={`/course/${courseId}/${prevStep.id}`}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> 이전 강의
                            </Link>
                        ) : (
                            <span><ChevronLeft className="w-4 h-4 mr-2" /> 이전 강의</span>
                        )}
                    </Button>
                    <div className="text-sm text-[#8B95A1]">
                        <span className="text-[#191F28] font-bold">{currentIndex + 1}</span> / {allSteps.length}
                    </div>
                    <Button
                        className="bg-[#7353EA] hover:bg-[#5F3DC4] text-white px-8 h-[44px] text-[15px] font-bold"
                        disabled={!nextStep}
                        asChild={!!nextStep}
                    >
                        {nextStep ? (
                            <Link to={`/course/${courseId}/${nextStep.id}`}>
                                다음 강의 <ChevronRight className="w-4 h-4 ml-2" />
                            </Link>
                        ) : (
                            <span>다음 강의 <ChevronRight className="w-4 h-4 ml-2" /></span>
                        )}
                    </Button>
                </div>
            </div>

            {/* Optional: Close Sidebar Button */}
            {sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(false)}
                    className="absolute left-[285px] top-[24px] z-50 text-[#666] hover:text-white"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
            )}
        </div>
    )
}

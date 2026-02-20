import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    ChevronLeft,
    ChevronRight,
    Menu,
    CheckCircle2
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getCourseById } from '@/shared/data/courses'
import { cn } from '@/shared/lib/utils'
// import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels"
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable"

import { ContentPanel } from '@/widgets/learning/ContentPanel'
import { CodeEditorPanel } from '@/widgets/learning/CodeEditorPanel'

/* 
  Elice Learning Layout (Split View - Flexbox Fallback):
  - Left Sidebar: Navigation
  - Center: Content Panel (Flex 1)
  - Right: Code Editor Panel (Flex 1)
  
  Note: ResizablePanelGroup removed due to runtime crashes. Using Flexbox for stable 50/50 split.
*/

export function LearningPage() {
    const { courseId, stepId } = useParams()
    // Mock logic to find current lesson
    const course = getCourseById(courseId || '')
    if (!course) return <div>Course not found</div>

    const currentLesson = course.chapters.flatMap(c => c.lessons).find(l => l.id === stepId) || course.chapters[0].lessons[0]

    // Navigation Logic
    const allLessons = course.chapters.flatMap(c => c.lessons)
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id)
    const prevLesson = allLessons[currentIndex - 1]
    const nextLesson = allLessons[currentIndex + 1]

    const [sidebarOpen, setSidebarOpen] = useState(true)

    return (
        <div className="flex h-screen w-full bg-[#F5F5F5] overflow-hidden fixed inset-0 z-[100]">
            {/* 
        1. Left Sidebar - Dark Theme (Elice Style)
      */}
            <aside className={cn(
                "bg-[#1A1A1A] h-full flex flex-col transition-all duration-300 border-r border-[#333] shrink-0",
                sidebarOpen ? "w-[300px]" : "w-0 -ml-[300px]"
            )}>
                {/* Sidebar Header */}
                <div className="h-[64px] flex items-center px-5 border-b border-[#333] shrink-0">
                    <Link to="/" className="text-white/80 hover:text-white mr-3">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-white font-bold text-sm truncate">{course.title}</h2>
                </div>

                {/* Lesson List */}
                <div className="flex-1 overflow-y-auto py-2">
                    {course.chapters.map((chapter, i) => (
                        <div key={chapter.id} className="mb-2">
                            <div className="px-5 py-3 text-[#888] text-xs font-bold uppercase tracking-wider">
                                Chapter {i + 1}. {chapter.title}
                            </div>
                            <div>
                                {chapter.lessons.map(lesson => {
                                    const isActive = lesson.id === currentLesson.id
                                    return (
                                        <Link
                                            key={lesson.id}
                                            to={`/course/${course.id}/${lesson.id}`}
                                            className={cn(
                                                "flex items-center gap-3 px-5 py-3 text-sm transition-colors border-l-[3px]",
                                                isActive
                                                    ? "bg-[#2A2A2A] text-white border-[#7353EA]" // Active Purline Line
                                                    : "text-[#AAA] border-transparent hover:bg-[#222] hover:text-white"
                                            )}
                                        >
                                            {lesson.completed ? (
                                                <CheckCircle2 className="w-4 h-4 text-[#00C471] shrink-0" />
                                            ) : (
                                                <div className={cn("w-4 h-4 rounded-full border shrink-0", isActive ? "border-[#7353EA]" : "border-[#555]")} />
                                            )}
                                            <span className="line-clamp-2">{lesson.title}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#333]">
                    <div className="text-[#666] text-xs mb-2">진행률 {course.progress}%</div>
                    <div className="h-1.5 bg-[#333] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C471]" style={{ width: `${course.progress}%` }}></div>
                    </div>
                </div>
            </aside>

            {/* 
        2. Main Content Area (Flexbox Split)
      */}
            <div className="flex-1 flex flex-col h-full min-w-0">
                {/* Toggle button */}
                {!sidebarOpen && (
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="absolute top-4 left-4 z-50 p-2 bg-[#1A1A1A] text-white rounded-md shadow-md"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                )}

                {/* Split Layout Container */}
                <div className="flex-1 flex flex-row overflow-hidden relative">
                    {/* Left Panel: Content */}
                    <div className="flex-1 flex flex-col min-w-0 border-r border-[#E5E8EB] overflow-hidden bg-white">
                        <ContentPanel lesson={currentLesson} />
                    </div>

                    {/* Right Panel: Code Editor */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#1e1e1e]">
                        <CodeEditorPanel
                            language="python"
                            defaultCode={currentLesson.type === 'practice' ?
                                `import pandas as pd

# 실습: 데이터프레임 생성
data = {
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['Seoul', 'Busan', 'Incheon']
}

df = pd.DataFrame(data)
print("Created DataFrame:")
print(df)

# 여기에 코드를 추가해보세요
` :
                                `# 개념 학습: ${currentLesson.title}
#
# 이 강의는 이론 중심입니다.
# 왼쪽의 내용을 꼼꼼히 읽어보세요.
# 필요한 경우 여기서 간단한 파이썬 코드를 테스트할 수 있습니다.

print("Ready to learn!")
`
                            }
                        />
                    </div>
                </div>

                {/* 3. Footer Navigation Bar */}
                <div className="h-[72px] bg-white border-t border-[#E5E8EB] flex items-center justify-between px-8 shrink-0 z-10 w-full">
                    <Button
                        variant="outline"
                        className="border-[#E5E8EB] text-[#8B95A1] hover:text-[#191F28]"
                        disabled={!prevLesson}
                        asChild={!!prevLesson}
                    >
                        {prevLesson ? (
                            <Link to={`/course/${course.id}/${prevLesson.id}`}>
                                <ChevronLeft className="w-4 h-4 mr-2" /> 이전 강의
                            </Link>
                        ) : (
                            <span><ChevronLeft className="w-4 h-4 mr-2" /> 이전 강의</span>
                        )}
                    </Button>
                    <div className="text-sm text-[#8B95A1]">
                        <span className="text-[#191F28] font-bold">{currentIndex + 1}</span> / {allLessons.length}
                    </div>
                    <Button
                        className="bg-[#7353EA] hover:bg-[#5F3DC4] text-white px-8 h-[44px] text-[15px] font-bold"
                        disabled={!nextLesson}
                        asChild={!!nextLesson}
                    >
                        {nextLesson ? (
                            <Link to={`/course/${course.id}/${nextLesson.id}`}>
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

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useExamStore } from '@/shared/model/exam-store'
import { mockExams } from '@/shared/data/mock-exams'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { Clock, ChevronLeft, ChevronRight, Bookmark, LayoutGrid } from 'lucide-react'

/* 
  CBT EXAM PAG E
  - Full Screen (No Header/Footer)
  - Left: Question Viewer (Text + Choices)
  - Right: Question Palette & Timer
*/

export function CBTExamPage() {
    const { examId } = useParams()
    const navigate = useNavigate()

    const {
        isRunning,
        remainingSeconds,
        currentQuestionIndex,
        answers,
        bookmarks,
        startExam,
        submitExam,
        setAnswer,
        toggleBookmark,
        jumpToQuestion,
        tick
    } = useExamStore()

    // Local state for UI layout
    const [showPalette] = useState(true)

    // 1. Initialize Exam
    useEffect(() => {
        if (!examId) return
        const targetExam = mockExams.find(e => e.id === examId)
        if (targetExam) {
            startExam(examId, targetExam.durationMinutes)
        }
    }, [examId])

    // 2. Timer Tick
    useEffect(() => {
        let interval: any
        if (isRunning && remainingSeconds > 0) {
            interval = setInterval(tick, 1000)
        } else if (remainingSeconds === 0 && isRunning) {
            // Auto submit on timeout
            handleFinish()
        }
        return () => clearInterval(interval)
    }, [isRunning, remainingSeconds])

    // 3. Helpers
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    }

    const handleFinish = () => {
        if (confirm('시험을 종료하고 답안을 제출하시겠습니까?')) {
            submitExam()
            navigate(`/exam/cbt/${examId}/result`)
        }
    }

    // 4. Resolve Current Question
    const examData = mockExams.find(e => e.id === examId)
    if (!examData) return <div>Exam Not Found</div>

    // Flatten questions for easy indexing
    const allQuestions = examData.sections.flatMap(s => s.questions)
    const currentQuestion = allQuestions[currentQuestionIndex]
    const isBookmarked = bookmarks.includes(currentQuestion.id)
    const currentAnswer = answers[currentQuestion.id]

    return (
        <div className="flex h-screen bg-[#F5F7F9] overflow-hidden font-sans">

            {/* === LEFT: QUESTION VIEWER === */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-16 bg-white border-b border-[#E5E8EB] flex items-center justify-between px-6 shrink-0">
                    <div className="font-bold text-[18px] text-[#191F28] truncate max-w-[400px]">
                        {examData.title}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[16px] font-bold",
                            remainingSeconds < 300 ? "bg-red-50 text-red-600 animate-pulse" : "bg-[#F1F3F5] text-[#191F28]"
                        )}>
                            <Clock className="w-4 h-4" />
                            {formatTime(remainingSeconds)}
                        </div>
                        <Button onClick={handleFinish} className="bg-[#7353EA] hover:bg-[#5F3DC4] font-bold">
                            답안 제출
                        </Button>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[900px] mx-auto bg-white rounded-[20px] shadow-sm border border-[#E5E8EB] p-10 min-h-[600px] relative">
                        {/* Question Header */}
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                                <span className="text-[24px] font-extrabold text-[#7353EA]">Q{currentQuestionIndex + 1}.</span>
                                <span className="px-2 py-1 bg-[#F1F3F5] text-[#4E5968] text-[12px] font-bold rounded">
                                    {currentQuestion.score}점
                                </span>
                            </div>
                            <button
                                onClick={() => toggleBookmark(currentQuestion.id)}
                                className={cn("p-2 rounded-full transition-colors", isBookmarked ? "text-yellow-400 bg-yellow-50" : "text-[#CED4DA] hover:bg-[#F8F9FA]")}
                            >
                                <Bookmark className="w-6 h-6 fill-current" />
                            </button>
                        </div>

                        {/* Question Text */}
                        <div className="text-[18px] font-medium text-[#191F28] leading-relaxed mb-8 whitespace-pre-wrap">
                            {currentQuestion.text}
                        </div>

                        {/* Passage / Code Context */}
                        {currentQuestion.passage && (
                            <div className="mb-8 p-6 bg-[#F8F9FA] rounded-[12px] border border-[#E5E8EB] font-mono text-[14px] text-[#333] whitespace-pre-wrap">
                                {currentQuestion.passage}
                            </div>
                        )}

                        {/* Choices */}
                        <div className="space-y-3">
                            {currentQuestion.choices?.map((choice, idx) => {
                                const isSelected = Array.isArray(currentAnswer)
                                    ? (currentAnswer as number[]).includes(idx)
                                    : false // Single choice logic to be added if needed, currently reusing array for simplicity in types

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setAnswer(currentQuestion.id, [idx])} // Single choice mode: overwrite array
                                        className={cn(
                                            "flex items-center gap-4 p-4 rounded-[12px] border cursor-pointer transition-all hover:bg-[#F8F9FA]",
                                            isSelected ? "border-[#7353EA] bg-[#F3F0FF] text-[#7353EA] font-bold" : "border-[#E5E8EB] text-[#4E5968]"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-6 h-6 rounded-full border flex items-center justify-center text-[12px]",
                                            isSelected ? "border-[#7353EA] bg-[#7353EA] text-white" : "border-[#CED4DA]"
                                        )}>
                                            {idx + 1}
                                        </div>
                                        <span className="text-[16px]">{choice}</span>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-12 flex justify-between pt-8 border-t border-[#E5E8EB]">
                            <Button
                                variant="outline"
                                disabled={currentQuestionIndex === 0}
                                onClick={() => jumpToQuestion(currentQuestionIndex - 1)}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> 이전 문제
                            </Button>
                            <Button
                                variant="outline"
                                disabled={currentQuestionIndex === allQuestions.length - 1}
                                onClick={() => jumpToQuestion(currentQuestionIndex + 1)}
                            >
                                다음 문제 <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* === RIGHT: PALETTE (Toggleable) === */}
            {showPalette && (
                <div className="w-[320px] bg-white border-l border-[#E5E8EB] flex flex-col shrink-0">
                    <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E8EB]">
                        <h3 className="font-bold text-[#191F28] flex items-center gap-2">
                            <LayoutGrid className="w-4 h-4" /> 문항 팔레트
                        </h3>
                        <span className="text-[13px] text-[#8B95A1]">{allQuestions.length}문항</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="grid grid-cols-5 gap-3">
                            {allQuestions.map((q, i) => {
                                const isAns = answers[q.id] !== undefined
                                const isCurr = i === currentQuestionIndex
                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => jumpToQuestion(i)}
                                        className={cn(
                                            "relative w-full aspect-square rounded-[8px] flex items-center justify-center font-bold text-[14px] transition-all",
                                            isCurr ? "bg-[#191F28] text-white ring-2 ring-[#7353EA]" :
                                                isAns ? "bg-[#7353EA] text-white" : "bg-[#F1F3F5] text-[#8B95A1] hover:bg-[#E5E8EB]"
                                        )}
                                    >
                                        {i + 1}
                                        {bookmarks.includes(q.id) && (
                                            <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="p-6 border-t border-[#E5E8EB]">
                        <div className="grid grid-cols-3 gap-2 text-[12px] text-[#8B95A1] mb-2">
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#191F28] rounded-sm"></div>현재</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#7353EA] rounded-sm"></div>풀이완료</div>
                            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[#F1F3F5] rounded-sm"></div>안 푼 문제</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

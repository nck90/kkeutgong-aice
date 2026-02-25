import { useState } from 'react'
import { CheckCircle2, Lock, PlayCircle, FileText, HelpCircle, ChevronDown, ChevronUp, Award } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { type Track } from '@/shared/data/tracks'
import { Button } from '@/shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface CurriculumRoadmapProps {
    track: Track
}

export function CurriculumRoadmap({ track }: CurriculumRoadmapProps) {
    const navigate = useNavigate()
    // Default open the first active (unlocked) step
    const [openStep, setOpenStep] = useState<number | null>(1)

    const toggleStep = (stage: number) => {
        setOpenStep(openStep === stage ? null : stage)
    }

    return (
        <div className="space-y-4">
            {track.curriculum.map((item) => (
                <div
                    key={item.stage}
                    className={cn(
                        "relative transition-all duration-300 overflow-hidden group",
                        item.isLocked
                            ? "bg-slate-50 border border-slate-100 opacity-60 rounded-[20px]"
                            : openStep === item.stage ? "bg-white border-none shadow-none rounded-[20px]" : "bg-white border border-[#E5E8EB] shadow-sm hover:shadow-md rounded-[20px]"
                    )}
                >
                    {/* Header (Always Visible) */}
                    <div
                        className={cn(
                            "p-5 flex items-start gap-4 cursor-pointer",
                            item.isLocked ? "cursor-not-allowed" : "cursor-pointer"
                        )}
                        onClick={() => !item.isLocked && toggleStep(item.stage)}
                    >
                        {/* Status Icon */}
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                            item.isLocked
                                ? "bg-slate-200 text-slate-400"
                                : item.stage === 1 // Mock Completion Logic
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-[#7353EA] text-white shadow-lg shadow-[#7353EA]/30"
                        )}>
                            {item.isLocked ? <Lock className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className={cn(
                                    "text-[18px] font-extrabold tracking-tight",
                                    item.isLocked ? "text-slate-400" : "text-[#191F28]"
                                )}>
                                    Step {item.stage}. {item.title}
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-[12px] text-slate-400 font-medium">{item.duration}</span>
                                    {!item.isLocked && (
                                        openStep === item.stage
                                            ? <ChevronUp className="w-5 h-5 text-slate-400" />
                                            : <ChevronDown className="w-5 h-5 text-slate-400" />
                                    )}
                                </div>
                            </div>
                            <p className="text-[14px] text-[#8B95A1] leading-relaxed max-w-[90%]">
                                {item.description}
                            </p>
                        </div>
                    </div>

                    {/* Accordion Content (Lessons) */}
                    <AnimatePresence>
                        {openStep === item.stage && !item.isLocked && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="border-t border-[#F1F3F5] bg-[#F8F9FA] p-5 pl-[72px] space-y-3">
                                    {/* Exam Action (Special Case) */}
                                    {item.type === 'mock-exam' && item.examId && (
                                        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-[#E5E8EB]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                    <Award className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="text-[14px] font-bold text-[#191F28]">실전 모의고사 응시</div>
                                                    <div className="text-[12px] text-[#8B95A1]">제한시간 60분 · 30문항</div>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-[#191F28] hover:bg-[#333] text-white"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    navigate(`/exam/cbt/${item.examId}`)
                                                }}
                                            >
                                                응시하기
                                            </Button>
                                        </div>
                                    )}

                                    {/* Lesson List */}
                                    {item.lessons?.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-[16px] bg-white border border-transparent hover:border-[#E5E8EB] hover:shadow-sm transition-all duration-300 cursor-pointer mb-2"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Lesson Type Icon with Spring Hover */}
                                                <div className={cn(
                                                    "w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110",
                                                    lesson.type === 'video' ? "bg-blue-50 border-blue-100 text-blue-500" :
                                                        lesson.type === 'quiz' ? "bg-amber-50 border-amber-100 text-amber-500" :
                                                            "bg-slate-50 border-slate-100 text-slate-500"
                                                )}>
                                                    {lesson.type === 'video' && <PlayCircle className="w-4 h-4" />}
                                                    {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4" />}
                                                    {lesson.type === 'reading' && <FileText className="w-4 h-4" />}
                                                </div>
                                                <div>
                                                    <div className={cn(
                                                        "text-[15px] font-bold transition-colors group-hover:translate-x-1 duration-300",
                                                        lesson.isCompleted ? "text-[#8B95A1] line-through font-medium" : "text-[#191F28]"
                                                    )}>
                                                        {lesson.title}
                                                    </div>
                                                    <div className="text-[12px] text-[#8B95A1] font-medium mt-0.5">{lesson.duration}</div>
                                                </div>
                                            </div>

                                            {/* Action / Status */}
                                            <div>
                                                {lesson.isCompleted ? (
                                                    <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">완료</span>
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 text-[12px] text-[#7353EA] hover:bg-[#7353EA]/10"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            // Navigate to specific lesson (mock link)
                                                            navigate(`/course/${track.id}-0${item.stage}/${lesson.id}`)
                                                        }}
                                                    >
                                                        학습하기
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

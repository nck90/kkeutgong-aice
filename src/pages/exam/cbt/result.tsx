import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, RotateCcw, Home, ArrowRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'

export function ExamResultPage() {
    const navigate = useNavigate()
    const { examId } = useParams()

    // Mock Result Data
    const score = 72
    const isPass = score >= 60
    const examTitle = "AICE Associate 실전 모의고사 1회"

    // Mock Analysis Data
    const analysis = [
        { label: 'AI 기본 개념', score: 80, fullMark: 100 },
        { label: '데이터 탐색', score: 90, fullMark: 100 },
        { label: '모델링 실습', score: 50, fullMark: 100 },
        { label: '결과 해석', score: 60, fullMark: 100 },
    ]

    return (
        <div className="min-h-screen bg-[#F5F7F9] font-sans flex items-center justify-center p-6">
            <div className="w-full max-w-[480px] space-y-6">

                {/* 1. Main Score Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#E5E8EB] text-center relative overflow-hidden">
                    <div className={cn(
                        "absolute top-0 left-0 w-full h-2",
                        isPass ? "bg-emerald-500" : "bg-rose-500"
                    )} />

                    <div className="mb-6">
                        <div className="text-[14px] text-[#8B95A1] font-bold mb-1">{examTitle}</div>
                        <h1 className="text-[28px] font-bold text-[#191F28]">
                            {isPass ? "축하합니다! 합격입니다 🎉" : "아쉽게도 불합격입니다 😢"}
                        </h1>
                    </div>

                    {/* Score Ring Animation */}
                    <div className="relative w-[180px] h-[180px] mx-auto mb-8 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="90"
                                cy="90"
                                r="80"
                                stroke="#F1F3F5"
                                strokeWidth="12"
                                fill="transparent"
                            />
                            <motion.circle
                                cx="90"
                                cy="90"
                                r="80"
                                stroke={isPass ? "#10B981" : "#F43F5E"}
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={2 * Math.PI * 80}
                                strokeDashoffset={2 * Math.PI * 80}
                                animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - score / 100) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <span className="text-[14px] text-[#8B95A1] font-bold">Total Score</span>
                            <span className={cn(
                                "text-[48px] font-extrabold leading-none",
                                isPass ? "text-emerald-600" : "text-rose-600"
                            )}>{score}</span>
                            <span className="text-[14px] text-[#8B95A1]">/ 100</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            className="h-[52px] rounded-[16px] border-[#E5E8EB] text-[#4E5968] font-bold text-[16px] hover:bg-slate-50"
                            onClick={() => navigate(`/exam/cbt/${examId}`)} // Simply retake
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> 재응시
                        </Button>
                        <Button
                            className="h-[52px] rounded-[16px] bg-[#191F28] hover:bg-[#333] text-white font-bold text-[16px]"
                            onClick={() => navigate('/home')}
                        >
                            <Home className="w-4 h-4 mr-2" /> 대시보드
                        </Button>
                    </div>
                </div>

                {/* 2. Analysis Card */}
                <div className="bg-white rounded-[24px] p-6 shadow-sm border border-[#E5E8EB]">
                    <h3 className="font-bold text-[#191F28] mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#7353EA]" /> 영역별 분석
                    </h3>
                    <div className="space-y-4">
                        {analysis.map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-[13px] mb-1.5">
                                    <span className="text-[#4E5968] font-bold">{item.label}</span>
                                    <span className={cn(
                                        "font-bold",
                                        item.score >= 80 ? "text-emerald-600" :
                                            item.score >= 60 ? "text-amber-500" : "text-rose-500"
                                    )}>{item.score}점</span>
                                </div>
                                <div className="w-full h-2 bg-[#F1F3F5] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(item.score / item.fullMark) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className={cn(
                                            "h-full rounded-full",
                                            item.score >= 80 ? "bg-emerald-500" :
                                                item.score >= 60 ? "bg-amber-400" : "bg-rose-400"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Review Box */}
                {!isPass && (
                    <div className="bg-[#FFF0F2] rounded-[24px] p-6 border border-[#FFCDD2] flex items-center justify-between">
                        <div>
                            <div className="font-bold text-[#E11D48] text-[16px] mb-1">오답 노트 확인하기</div>
                            <p className="text-[13px] text-[#9F1239]">틀린 문제를 다시 풀어보며 약점을 보완하세요.</p>
                        </div>
                        <Button
                            size="sm"
                            className="bg-[#E11D48] hover:bg-[#BE123C] text-white rounded-full px-5 font-bold"
                        >
                            오답 보기 <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                )}

            </div>
        </div>
    )
}

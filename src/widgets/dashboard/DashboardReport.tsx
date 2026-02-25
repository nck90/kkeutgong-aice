import { motion } from 'framer-motion'
import {
    Trophy,
    Target,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    Sparkles,
    Calendar,
    BookOpen
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { type Track } from '@/shared/data/tracks'
import { CurriculumRoadmap } from './CurriculumRoadmap'
import { useNavigate } from 'react-router-dom'

interface DashboardReportProps {
    track: Track
    examDate: string | null
}

export function DashboardReport({ track, examDate }: DashboardReportProps) {
    const navigate = useNavigate()
    // Mock Analytics Data
    const passProbability = 72
    const weakPoint = "데이터 전처리"
    const dDay = examDate ? Math.ceil((new Date(examDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0

    return (
        <div className="min-h-screen bg-[#F5F7F9] font-sans">
            {/* 1. New Hero Section (Landing-style) */}
            <div className="bg-[#191F28] text-white overflow-hidden relative pb-10">
                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-[#7353EA] rounded-full blur-[120px] opacity-40"></div>



                {/* Hero Content */}
                <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-8 pb-12">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[13px] font-bold text-[#AB9DFE] mb-4"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>합격까지 {dDay}일 남았습니다</span>
                            </motion.div>
                            <h1 className="text-[32px] md:text-[40px] font-extrabold leading-tight mb-4">
                                {track.title} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AB9DFE] to-[#D8B4FE]">
                                    맞춤 학습 리포트
                                </span>
                            </h1>
                            <p className="text-white/60 text-[16px] max-w-[500px] leading-relaxed">
                                현재 학습 속도로 진행 시, 예상 합격 확률은 <strong>{passProbability}%</strong> 입니다.
                                취약한 {weakPoint} 파트를 보완하면 합격률을 높일 수 있습니다.
                            </p>
                        </div>

                        {/* Quick Stats Card (Glassmorphism) */}
                        <div className="w-full md:w-auto min-w-[300px] p-6 rounded-[24px] bg-white/5 backdrop-blur-lg border border-white/10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#7353EA] flex items-center justify-center text-white">
                                    <Target className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-[12px] text-white/50">목표 달성도</div>
                                    <div className="text-[18px] font-bold">72 / 100 점</div>
                                </div>
                            </div>
                            <div className="w-full h-[8px] bg-white/10 rounded-full overflow-hidden shadow-inner">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "72%" }}
                                    transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
                                    className="h-full animated-progress"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-[1200px] mx-auto px-6 py-10 -mt-10 relative z-20">
                {/* 2. Top Metrics Grid (Refined) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Dashboard Metric Cards */}
                    <div className="premium-card p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-[14px] font-bold text-[#8B95A1] mb-1">나의 학습 진도</h3>
                                <div className="text-[32px] font-extrabold text-[#191F28] tracking-tight">
                                    Step 1<span className="text-[16px] text-[#8B95A1] font-semibold ml-1">/ 4</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-indigo-600" />
                            </div>
                        </div>
                        <div className="text-[13px] text-[#4E5968]">
                            전체 커리큘럼의 <span className="font-bold text-indigo-600">25%</span>를 완료했습니다.
                        </div>
                    </div>

                    {/* Metric 2 */}
                    <div className="premium-card p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-[14px] font-bold text-[#8B95A1] mb-1">연속 학습일</h3>
                                <div className="text-[32px] font-extrabold text-[#191F28] tracking-tight">
                                    3일<span className="text-[16px] text-[#8B95A1] font-semibold ml-1">째</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-orange-600" />
                            </div>
                        </div>
                        <div className="text-[13px] text-[#4E5968]">
                            하루 더 학습하면 <span className="font-bold text-orange-600">작심삼일 뱃지</span> 획득!
                        </div>
                    </div>

                    {/* Metric 3 */}
                    <div className="premium-card p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-[14px] font-bold text-[#8B95A1] mb-1">예상 합격률</h3>
                                <div className="text-[32px] font-extrabold text-[#191F28] tracking-tight flex items-center gap-2">
                                    {passProbability}% <span className="text-[13px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">안정권</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                            </div>
                        </div>
                        <div className="text-[13px] text-[#4E5968]">
                            지난 모의고사 대비 <span className="font-bold text-emerald-600">+12%</span> 상승했습니다.
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 3. Main Content: Curriculum Roadmap */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-[20px] font-bold text-[#191F28] flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-[#8B95A1]" /> 학습 로드맵
                            </h2>
                        </div>

                        {/* Enhanced Roadmap Component */}
                        <div className="bg-white p-2 rounded-[24px] border border-[#E5E8EB] shadow-sm">
                            <CurriculumRoadmap track={track} />
                        </div>
                    </div>

                    {/* 4. Side Widget: Today's Action */}
                    <div className="space-y-6">
                        <div className="elice-mesh-gradient text-white p-8 rounded-[24px] relative overflow-hidden shadow-2xl group cursor-pointer hover:scale-[1.02] hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            {/* Animated Gradient Border Effect */}
                            <div className="absolute inset-0 border-2 border-white/10 rounded-[24px] group-hover:border-[#7353EA]/50 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="inline-block px-3 py-1 bg-[#7353EA] rounded-full text-[12px] font-bold mb-4 shadow-lg shadow-[#7353EA]/30">
                                    Today's Learning
                                </div>
                                <div className="text-white/60 text-[13px] font-bold mb-1">
                                    Step 1-1. 기초 다지기
                                </div>
                                <h3 className="text-[20px] font-bold leading-tight mb-4 text-white">
                                    인공지능의 역사와<br />발전 과정 이해하기
                                </h3>

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden shadow-inner">
                                        <div className="h-full animated-progress w-[45%]"></div>
                                    </div>
                                    <span className="text-[12px] font-bold text-[#AB9DFE]">45%</span>
                                </div>

                                <Button
                                    className="w-full h-[52px] bg-white text-[#191F28] hover:bg-[#F1F3F5] font-bold text-[16px] rounded-[16px] transition-all"
                                    onClick={() => navigate('/course/associate-01/l1-1')} // Mock Link
                                >
                                    이어서 학습하기 <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>

                        {/* Weakness Analysis Widget */}
                        <div className="premium-card p-6">
                            <h3 className="font-bold text-[#191F28] mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-rose-500" /> 집중 보완 필요
                            </h3>
                            <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 mb-4">
                                <div className="text-[14px] font-bold text-rose-700 mb-1">{weakPoint}</div>
                                <div className="text-[12px] text-rose-600">오답률이 40%로 가장 높습니다.</div>
                            </div>
                            <Button variant="outline" className="w-full h-10 text-[13px] font-bold border-rose-200 text-rose-600 hover:bg-rose-50">
                                오답 노트 바로가기
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Debug / Demo Footer */}
            <footer className="max-w-[1200px] mx-auto px-6 py-8 text-center border-t border-[#E5E8EB] mt-10">
                <Button
                    variant="ghost"
                    className="text-[#8B95A1] hover:text-red-500 hover:bg-red-50 text-[12px]"
                    onClick={() => {
                        if (confirm('모든 데이터를 초기화하고 온보딩 화면으로 돌아가시겠습니까?')) {
                            import('@/shared/model/store').then(({ useAiceStore }) => {
                                useAiceStore.getState().reset()
                                window.location.reload()
                            })
                        }
                    }}
                >
                    ⚠️ 데모 초기화 (온보딩으로 돌아가기)
                </Button>
            </footer>
        </div>
    )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Calendar, BookOpen, Trophy } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { tracks } from '@/shared/data/tracks'
import { cn } from '@/shared/lib/utils'

interface OnboardingModalProps {
    open: boolean
    initialTrackId?: string | null
    onComplete: (trackId: string, examDate: string) => void
}

export function OnboardingModal({ open, initialTrackId, onComplete }: OnboardingModalProps) {
    // If we have an initial track, start at step 2. Otherwise step 1.
    const [step, setStep] = useState<1 | 2>(initialTrackId ? 2 : 1)
    const [selectedTrack, setSelectedTrack] = useState<string | null>(initialTrackId || null)
    // Default exam date to 1 month from now
    const [examDate, setExamDate] = useState<string>(
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    )

    // Reset/Update state when opening with new props
    useState(() => {
        if (open) {
            setStep(initialTrackId ? 2 : 1)
            setSelectedTrack(initialTrackId || null)
        }
    })

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[24px] shadow-2xl w-full max-w-[1000px] overflow-hidden flex flex-col md:flex-row min-h-[600px] max-h-[90vh]"
            >
                {/* Left Side: Visual & Context */}
                <div className="hidden md:flex flex-col justify-between w-[320px] bg-[#7353EA] p-8 text-white relative overflow-hidden shrink-0">
                    {/* Decorative Circles */}
                    <div className="absolute top-[-50px] left-[-50px] w-[200px] h-[200px] rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute bottom-[-20px] right-[-20px] w-[150px] h-[150px] rounded-full bg-[#AB9DFE]/30 blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-lg tracking-tight">AICE Prep</span>
                        </div>

                        <h2 className="text-[32px] font-extrabold leading-tight mb-4 whitespace-pre-wrap">
                            {step === 1 ? "목표 자격증을\n선택해주세요." : "시험 예정일을\n설정할까요?"}
                        </h2>
                        <p className="text-white/80 text-[15px] leading-relaxed">
                            {step === 1
                                ? "선택하신 자격증에 맞춰 최적의 학습 로드맵과 합격 커리큘럼을 제공해드립니다."
                                : "시험일까지 남은 기간을 계산하여 일일 학습량을 자동으로 추천해드립니다."}
                        </p>
                    </div>

                    {/* Step Indicator */}
                    <div className="flex gap-2">
                        <div className={cn("h-1.5 flex-1 rounded-full transition-colors", step === 1 ? "bg-white" : "bg-white/30")}></div>
                        <div className={cn("h-1.5 flex-1 rounded-full transition-colors", step === 2 ? "bg-white" : "bg-white/30")}></div>
                    </div>
                </div>

                {/* Right Side: Interaction */}
                <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex-1 flex flex-col"
                            >
                                <h3 className="text-[24px] font-bold text-[#191F28] mb-6">어떤 과정을 준비하시나요?</h3>
                                <div className="grid grid-cols-1 gap-3 flex-1 mb-2">
                                    {tracks.map(track => (
                                        <div
                                            key={track.id}
                                            onClick={() => {
                                                setSelectedTrack(track.id)
                                                // Auto-advance with slight delay for visual feedback
                                                setTimeout(() => setStep(2), 250)
                                            }}
                                            className={cn(
                                                "relative p-5 rounded-[16px] border-2 cursor-pointer transition-all hover:bg-[#F8F9FA] hover:scale-[1.01] active:scale-[0.99]",
                                                selectedTrack === track.id
                                                    ? "border-[#7353EA] bg-[#F3F0FF]"
                                                    : "border-[#E5E8EB]"
                                            )}
                                        >
                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <span className={cn(
                                                        "inline-block px-2 py-0.5 rounded text-[11px] font-bold uppercase mb-1",
                                                        track.id === 'associate' ? "bg-indigo-100 text-indigo-700" :
                                                            track.id === 'basic' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                                    )}>{track.id}</span>
                                                    <h4 className="text-[18px] font-bold text-[#191F28]">{track.title}</h4>
                                                </div>
                                                {selectedTrack === track.id && (
                                                    <div className="w-6 h-6 bg-[#7353EA] rounded-full flex items-center justify-center animate-in zoom-in spin-in-90 duration-300">
                                                        <Check className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-[13px] text-[#8B95A1] line-clamp-1">{track.description}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 text-right">
                                    <span className="text-xs text-slate-400">항목을 선택하면 자동으로 다음 단계로 넘어갑니다.</span>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex-1 flex flex-col"
                            >
                                <h3 className="text-[24px] font-bold text-[#191F28] mb-6">시험 예정일이 언제인가요?</h3>

                                <div className="flex-1 flex flex-col justify-center gap-6">
                                    <div className="p-6 bg-[#F8F9FA] rounded-[20px] border border-[#E5E8EB]">
                                        <label className="block text-[14px] font-bold text-[#191F28] mb-3">시험 날짜 선택</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B95A1]" />
                                            <input
                                                type="date"
                                                value={examDate}
                                                onChange={(e) => setExamDate(e.target.value)}
                                                className="w-full h-[56px] pl-12 pr-4 bg-white border border-[#E5E8EB] rounded-[12px] text-[16px] font-medium focus:ring-2 focus:ring-[#7353EA] focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <p className="text-[13px] text-[#8B95A1] mt-3">
                                            * 나중에 '내 설정'에서 언제든지 변경할 수 있습니다.
                                        </p>
                                    </div>

                                    <div className="bg-[#F3F0FF] p-5 rounded-[12px] flex gap-3">
                                        <BookOpen className="w-5 h-5 text-[#7353EA] shrink-0 mt-0.5" />
                                        <div className="text-[14px] text-[#191F28]">
                                            <p className="font-bold mb-1">매일 1시간씩 학습하면?</p>
                                            <p className="text-[#4E5968]">
                                                선택하신 시험일까지 <strong className="text-[#7353EA]">안정적인 합격권</strong>에 진입할 수 있습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 h-[56px] rounded-[12px] font-bold border-[#E5E8EB] hover:bg-[#F8F9FA]"
                                        onClick={() => setStep(1)}
                                    >
                                        이전
                                    </Button>
                                    <Button
                                        className="flex-[2] h-[56px] text-[16px] font-bold bg-[#7353EA] hover:bg-[#5F3DC4] rounded-[12px]"
                                        onClick={() => selectedTrack && onComplete(selectedTrack, examDate)}
                                    >
                                        AICE 학습 시작하기
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}
// OnboardingModal is actually fine as a "dumb" component that reports back to parent.
// But we might want to pre-select track if store has one (e.g. from landing page click).
// For now, keeping it controlled by parent via props is good. 
// No changes needed to OnboardingModal logic itself for Zustand integration 
// because HomePage handles the 'onComplete' callback which calls the store.
// However, I will check "Select this Track" logic in HomePage to ensure it sets the correct initial state.

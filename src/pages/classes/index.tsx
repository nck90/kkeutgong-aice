import { useState, useEffect } from 'react'
import {
    Check
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/shared/ui/button'
import { tracks } from '@/shared/data/tracks'
import { cn } from '@/shared/lib/utils'
import { OnboardingModal } from '@/widgets/onboarding/OnboardingModal'

/* 
  AI Certification Page (Level Selection)
  Function: Compares the 3 tracks and allows enrollment.
*/

export function ClassesPage() {
    const [showOnboarding, setShowOnboarding] = useState(false)
    const [activeTab, setActiveTab] = useState<'all' | 'associate' | 'basic' | 'junior'>('all')

    // Demo: Show onboarding on first visit (simulated)
    useEffect(() => {
        const hasVisited = localStorage.getItem('aice-visited')
        if (!hasVisited) {
            setShowOnboarding(true)
        }
    }, [])

    const handleOnboardingComplete = (trackId: string, date: string) => {
        localStorage.setItem('aice-visited', 'true')
        localStorage.setItem('aice-track', trackId)
        localStorage.setItem('aice-exam-date', date)
        setShowOnboarding(false)
        window.location.reload() // Reload to reflect changes in Home
    }

    const filteredTracks = activeTab === 'all'
        ? tracks
        : tracks.filter(t => t.id === activeTab)

    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-20">
            <OnboardingModal open={showOnboarding} onComplete={handleOnboardingComplete} />

            {/* 1. Header: Dark Purple Hero (Elice Style) */}
            <section className="bg-[#191F28] text-white py-16 text-center">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h1 className="text-[40px] font-extrabold mb-4">AICE 자격증 과정</h1>
                    <p className="text-[16px] text-[#AB9DFE] font-medium max-w-2xl mx-auto">
                        인공지능 능력시험 AICE(AI Certificate for Everyone) 대비를 위한<br />
                        단계별 맞춤 커리큘럼을 제공합니다.
                    </p>
                </div>
            </section>

            {/* 2. Filter Tabs */}
            <div className="sticky top-[64px] z-20 bg-white/80 backdrop-blur-md border-b border-[#E5E8EB]">
                <div className="max-w-[1200px] mx-auto px-6 h-[60px] flex items-center gap-2 overflow-x-auto">
                    {['All', 'Associate', 'Basic', 'Junior'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase() as any)}
                            className={cn(
                                "relative px-5 py-2 rounded-full text-[15px] font-bold transition-all whitespace-nowrap overflow-hidden group",
                                activeTab === tab.toLowerCase()
                                    ? "text-white"
                                    : "bg-transparent text-[#8B95A1] hover:text-[#191F28]"
                            )}
                        >
                            {/* Animated Background Pill */}
                            {activeTab === tab.toLowerCase() && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 bg-[#191F28] rounded-full z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tab}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. Track Cards (Comparison) */}
            <div className="max-w-[1200px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredTracks.map(track => (
                        <div key={track.id} className="premium-card group flex flex-col relative h-full transition-all duration-300 overflow-hidden">
                            {/* Badge */}
                            <div className={cn(
                                "h-2 w-full absolute top-0 left-0",
                                track.id === 'associate' ? "bg-indigo-500" :
                                    track.id === 'basic' ? "bg-emerald-500" : "bg-amber-500"
                            )}></div>

                            <div className="p-8 flex flex-col h-full">
                                <div className="mb-6">
                                    <span className={cn(
                                        "inline-block px-2 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider mb-3",
                                        track.id === 'associate' ? "bg-indigo-100 text-indigo-700" :
                                            track.id === 'basic' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                    )}>
                                        {track.id}
                                    </span>
                                    <h2 className="text-[24px] font-extrabold text-[#191F28] mb-2">{track.title}</h2>
                                    <p className="text-[14px] text-[#8B95A1] h-[44px] leading-snug">{track.description}</p>
                                </div>

                                <div className="space-y-4 mb-8 flex-1">
                                    {track.features.map(feat => (
                                        <div key={feat} className="flex items-start gap-3 text-[14px] text-[#4E5968]">
                                            <Check className="w-4 h-4 text-[#7353EA] mt-0.5 shrink-0" />
                                            <span>{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-[#F8F9FA] rounded-[12px] p-4 mb-6">
                                    <div className="flex justify-between text-[13px] text-[#8B95A1] mb-1">
                                        <span>권장 학습 기간</span>
                                        <span className="font-bold text-[#191F28]">{track.duration}</span>
                                    </div>
                                    <div className="flex justify-between text-[13px] text-[#8B95A1]">
                                        <span>대상</span>
                                        <span className="font-bold text-[#191F28]">{track.target}</span>
                                    </div>
                                </div>

                                <Button className="w-full h-[52px] bg-[#191F28] hover:bg-[#7353EA] font-bold rounded-[8px] transition-colors">
                                    과정 자세히 보기
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

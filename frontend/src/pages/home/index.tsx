
import { useState, useEffect } from 'react'

import {
  Trophy,
  Check
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { tracks } from '@/shared/data/tracks'
import { cn } from '@/shared/lib/utils'
import { OnboardingModal } from '@/widgets/onboarding/OnboardingModal'
import { DashboardReport } from '@/widgets/dashboard/DashboardReport'
import { useAiceStore } from '@/shared/model/store'

/* 
  HOME PAGE (STRICT SEPARATION)
  - Guest: Marketing Landing -> Track Selection
  - Member: Curriculum Dashboard -> Track Progress
*/

export function HomePage() {
  // 1. State: useAiceStore
  const { trackId, examDate, isOnboarded, completeOnboarding } = useAiceStore()
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [isClient, setIsClient] = useState(false) // Hydration check
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 2. Data: Resolved User Track
  const userTrack = trackId ? tracks.find(t => t.id === trackId) : null

  // 3. Handler: Onboarding Complete
  const handleOnboardingComplete = (selectedTrackId: string, date: string) => {
    if (['associate', 'basic', 'junior'].includes(selectedTrackId)) {
      completeOnboarding(selectedTrackId as 'associate' | 'basic' | 'junior', date)
      setShowOnboarding(false)
    }
  }

  // Prevent flash of unstyled content / hydration mismatch
  if (!isClient) return null

  // === VIEW 1: MEMBER DASHBOARD (CURRICULUM) ===
  if (isOnboarded && userTrack) {
    return (
      <DashboardReport track={userTrack} examDate={examDate} />
    )
  }

  // === VIEW 2: GUEST LANDING (TRACK SELECTOR) ===

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <OnboardingModal
        open={showOnboarding}
        initialTrackId={selectedTrackId}
        onComplete={handleOnboardingComplete}
      />

      {/* Hero */}
      <section className="bg-[#191F28] text-white pt-20 pb-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png')] bg-cover bg-center"></div>
        <div className="relative z-10 max-w-[800px] mx-auto px-6">
          <div className="inline-block px-3 py-1 bg-[#7353EA] rounded-full text-[13px] font-bold mb-6">
            AICE 자격증 대비반
          </div>
          <h1 className="text-[40px] md:text-[56px] font-extrabold leading-tight mb-6 tracking-tight">
            당신의 목표 자격증을<br />
            선택해주세요.
          </h1>
          <p className="text-[18px] text-[#AB9DFE] font-medium leading-relaxed">
            목표를 선택하면, 합격에 최적화된<br className="md:hidden" />
            맞춤 커리큘럼을 제공해드립니다.
          </p>
        </div>
      </section>

      {/* Track Selection Cards (Negative Margin) */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tracks.map(track => (
            <div
              key={track.id}
              onClick={() => {
                localStorage.setItem('aice-visited', 'true') // Prevent modal loop if logic changes
                // Pre-select track in onboarding
                setSelectedTrackId(track.id)
                setShowOnboarding(true)
              }}
              className="glass-panel rounded-[24px] p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:border-[#7353EA] transition-all duration-300 cursor-pointer group"
            >
              <div className={cn(
                "w-12 h-12 rounded-[14px] flex items-center justify-center mb-6",
                track.id === 'associate' ? "bg-indigo-100 text-indigo-600" :
                  track.id === 'basic' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
              )}>
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-[24px] font-bold text-[#191F28] mb-2 group-hover:text-[#7353EA] transition-colors">{track.title}</h3>
              <p className="text-[14px] text-[#8B95A1] mb-8 leading-relaxed h-[42px] content-start">
                {track.description}
              </p>

              <div className="space-y-3 mb-8">
                {track.features.slice(0, 3).map(feat => (
                  <div key={feat} className="flex items-center gap-2 text-[14px] text-[#4E5968]">
                    <Check className="w-4 h-4 text-[#7353EA]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <Button className="btn-glow w-full h-[52px] bg-[#F8F9FA] text-[#191F28] border border-[#E5E8EB] font-bold hover:bg-[#7353EA] hover:text-white hover:border-transparent transition-all duration-300">
                이 과정 선택하기
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

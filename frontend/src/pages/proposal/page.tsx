import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { slidesPart1 } from './slides-data-part1'
import { slidesPart2 } from './slides-data-part2'
import { slidesPart3 } from './slides-data-part3'
import { slidesPart4 } from './slides-data-part4'

// Combine all 38 slides
const slidesData = [...slidesPart1, ...slidesPart2, ...slidesPart3, ...slidesPart4]

// ==========================================
// 🚀 Main Proposal/Pitch Deck Page (V5 Learner-Centric)
// ==========================================

export function ProposalPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent default scrolling for Spacebar and Arrows
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
      e.preventDefault()
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
      setCurrentIndex((prev) => Math.min(prev + 1, slidesData.length - 1))
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const currentSlide = slidesData[currentIndex]
  const progressPercent = ((currentIndex + 1) / slidesData.length) * 100

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#FAFAFA] text-foreground font-sans z-[100]">
      {/* ProgressBar Top */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-black/10 z-[110]">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_15px_rgba(115,83,234,0.6)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Slide Track */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, x: 200, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -200, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 250, damping: 30 }}
          className={`w-full h-full absolute inset-0 ${currentSlide.background}`}
        >
          {currentSlide.content}
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-4 right-4 z-[120] text-xs font-bold text-black/20 mix-blend-difference pointer-events-none">
        클릭 후 스페이스바로 {slidesData.length}페이지 이동
      </div>

      {/* Slide Navigation Overlay UI (Light Theme for V5) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-8 bg-white/90 backdrop-blur-xl px-8 py-3.5 rounded-full text-foreground z-[110] shadow-2xl border border-border transition-all hover:bg-white">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center min-w-[120px]">
          <span className="text-base font-black tracking-widest text-primary">
            {currentIndex + 1}{' '}
            <span className="text-muted-foreground font-normal ml-1">/ {slidesData.length}</span>
          </span>
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-0.5">
            Learner Pitch
          </span>
        </div>
        <button
          onClick={() => setCurrentIndex((prev) => Math.min(slidesData.length - 1, prev + 1))}
          disabled={currentIndex === slidesData.length - 1}
          className="hover:text-primary disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

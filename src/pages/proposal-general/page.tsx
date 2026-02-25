import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, Maximize2, Minimize2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { slidesGeneralPart1 } from './slides-data-general-part1'
import { slidesGeneralPart2 } from './slides-data-general-part2'
import { slidesGeneralPart3 } from './slides-data-general-part3'
import { slidesGeneralPart4 } from './slides-data-general-part4'

// Combine all slides
const allSlides = [
    ...slidesGeneralPart1,
    ...slidesGeneralPart2,
    ...slidesGeneralPart3,
    ...slidesGeneralPart4
]

export function ProposalGeneralPage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const navigate = useNavigate()

    const totalSlides = allSlides.length

    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prev => prev + 1)
        }
    }, [currentSlide, totalSlides])

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1)
        }
    }, [currentSlide])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
                nextSlide()
            } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
                prevSlide()
            } else if (e.key === 'Home') {
                setCurrentSlide(0)
            } else if (e.key === 'End') {
                setCurrentSlide(totalSlides - 1)
            } else if (e.key === 'f') {
                toggleFullscreen()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [nextSlide, prevSlide, totalSlides])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setIsFullscreen(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                setIsFullscreen(false)
            }
        }
    }

    const slide = allSlides[currentSlide]

    return (
        <div className={`fixed inset-0 w-screen h-screen overflow-hidden flex flex-col ${slide.background || 'bg-white'}`}>
            {/* Top Navigation Bar */}
            <div className="absolute top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference pointer-events-none">
                <div className="flex items-center gap-4 pointer-events-auto">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    >
                        <Home className="w-5 h-5" />
                    </button>
                    <div className="h-4 w-px bg-white/30" />
                    <span className="text-white text-sm font-bold tracking-tight">KKEUTGONG PROPOSAL 2025</span>
                </div>

                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="text-white text-sm font-bold opacity-60">
                        {currentSlide + 1} / {totalSlides}
                    </div>
                    <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                    >
                        {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Slide Content */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {slide.content}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/5 z-50">
                <motion.div
                    className="h-full bg-primary"
                    initial={false}
                    animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Floating Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-50 flex items-center gap-3">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className={`p-4 rounded-2xl shadow-xl transition-all ${currentSlide === 0
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50'
                        : 'bg-white text-black hover:bg-black hover:text-white transform hover:-translate-x-1'
                        }`}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/20 font-black text-xl min-w-[80px] text-center">
                    {currentSlide + 1}
                </div>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className={`p-4 rounded-2xl shadow-xl transition-all ${currentSlide === totalSlides - 1
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50'
                        : 'bg-white text-black hover:bg-black hover:text-white transform hover:translate-x-1'
                        }`}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

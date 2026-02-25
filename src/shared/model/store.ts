import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
    // User Preferences
    trackId: 'associate' | 'basic' | 'junior' | null
    examDate: string | null

    // Auth & Onboarding Status
    isOnboarded: boolean
    isAuthenticated: boolean

    // Progress Data
    completedStages: number[] // Legacy ID array
    completedStepIds: string[] // Specific curriculum step IDs
    currentChapterId: string | null
    currentStepId: string | null

    // Actions
    setTrack: (trackId: 'associate' | 'basic' | 'junior') => void
    setExamDate: (date: string) => void
    completeOnboarding: (trackId: 'associate' | 'basic' | 'junior', date: string) => void
    markStepCompleted: (stepId: string) => void
    setCurrentProgress: (chapterId: string, stepId: string) => void
    reset: () => void
}

export const useAiceStore = create<UserState>()(
    persist(
        (set) => ({
            trackId: null,
            examDate: null,
            isOnboarded: false,
            isAuthenticated: false,
            completedStages: [],
            completedStepIds: [],
            currentChapterId: null,
            currentStepId: null,

            setTrack: (trackId) => set({ trackId }),

            setExamDate: (date) => set({ examDate: date }),

            completeOnboarding: (trackId, date) => set({
                trackId,
                examDate: date,
                isOnboarded: true,
                isAuthenticated: true // For now, onboarding implies auth
            }),

            markStepCompleted: (stepId) => set((state) => ({
                completedStepIds: state.completedStepIds.includes(stepId)
                    ? state.completedStepIds
                    : [...state.completedStepIds, stepId]
            })),

            setCurrentProgress: (chapterId, stepId) => set({
                currentChapterId: chapterId,
                currentStepId: stepId
            }),

            reset: () => set({
                trackId: null,
                examDate: null,
                isOnboarded: false,
                isAuthenticated: false,
                completedStages: [],
                completedStepIds: [],
                currentChapterId: null,
                currentStepId: null
            }),
        }),
        {
            name: 'aice-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

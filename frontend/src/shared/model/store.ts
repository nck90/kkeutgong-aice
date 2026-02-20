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
    completedStages: number[] // IDs or indexes of completed curriculum stages

    // Actions
    setTrack: (trackId: 'associate' | 'basic' | 'junior') => void
    setExamDate: (date: string) => void
    completeOnboarding: (trackId: 'associate' | 'basic' | 'junior', date: string) => void
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

            setTrack: (trackId) => set({ trackId }),

            setExamDate: (date) => set({ examDate: date }),

            completeOnboarding: (trackId, date) => set({
                trackId,
                examDate: date,
                isOnboarded: true,
                isAuthenticated: true // For now, onboarding implies auth
            }),

            reset: () => set({
                trackId: null,
                examDate: null,
                isOnboarded: false,
                isAuthenticated: false,
                completedStages: []
            }),
        }),
        {
            name: 'aice-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)

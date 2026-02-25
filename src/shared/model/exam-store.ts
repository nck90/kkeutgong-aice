import { create } from 'zustand'


interface ExamState {
    // Session Info
    examId: string | null
    isRunning: boolean
    remainingSeconds: number

    // Progress
    currentQuestionIndex: number
    answers: Record<number, string | number[]> // questionId -> answer
    bookmarks: number[] // IDs of bookmarked questions

    // Actions
    startExam: (examId: string, durationMinutes: number) => void
    submitExam: () => void
    setAnswer: (questionId: number, answer: string | number[]) => void
    toggleBookmark: (questionId: number) => void
    jumpToQuestion: (index: number) => void
    tick: () => void
}

export const useExamStore = create<ExamState>((set) => ({
    examId: null,
    isRunning: false,
    remainingSeconds: 0,
    currentQuestionIndex: 0,
    answers: {},
    bookmarks: [],

    startExam: (examId, durationMinutes) => set({
        examId,
        isRunning: true,
        remainingSeconds: durationMinutes * 60,
        currentQuestionIndex: 0,
        answers: {},
        bookmarks: []
    }),

    submitExam: () => set({ isRunning: false }),

    setAnswer: (qId, answer) => set((state) => ({
        answers: { ...state.answers, [qId]: answer }
    })),

    toggleBookmark: (qId) => set((state) => {
        const isBookmarked = state.bookmarks.includes(qId)
        return {
            bookmarks: isBookmarked
                ? state.bookmarks.filter(id => id !== qId)
                : [...state.bookmarks, qId]
        }
    }),

    jumpToQuestion: (index) => set({ currentQuestionIndex: index }),

    tick: () => set((state) => {
        if (!state.isRunning || state.remainingSeconds <= 0) return {}
        return { remainingSeconds: state.remainingSeconds - 1 }
    }),
}))

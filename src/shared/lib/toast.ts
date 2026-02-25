import { create } from 'zustand'

export type ToastTone = 'info' | 'success' | 'error'

export type ToastItem = {
  id: string
  title: string
  description?: string
  tone: ToastTone
}

type ToastStore = {
  items: ToastItem[]
  push: (item: Omit<ToastItem, 'id' | 'tone'> & { tone?: ToastTone; duration?: number }) => void
  dismiss: (id: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  items: [],
  push: ({ title, description, tone = 'info', duration = 3200 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    set((state) => ({ items: [{ id, title, description, tone }, ...state.items].slice(0, 4) }))
    window.setTimeout(() => get().dismiss(id), duration)
  },
  dismiss: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}))

export function toast(input: Omit<ToastItem, 'id' | 'tone'> & { tone?: ToastTone; duration?: number }) {
  useToastStore.getState().push(input)
}

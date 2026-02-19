import { create } from 'zustand'

type AppModeState = {
  mode: 'Practice' | 'Practice+' | 'Mock'
  setMode: (next: AppModeState['mode']) => void
}

export const useAppModeStore = create<AppModeState>((set) => ({
  mode: 'Practice+',
  setMode: (next) => set({ mode: next }),
}))

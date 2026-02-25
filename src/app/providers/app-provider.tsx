import type { PropsWithChildren } from 'react'
import { Toaster } from '@/shared/ui/toast'
import { QueryProvider } from './query-provider'

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  )
}

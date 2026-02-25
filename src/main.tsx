import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from '@/app/providers/app-provider'
import { AppRouter } from '@/app/router'
import './index.css'

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('@/shared/mocks/browser')
    await worker.start({ onUnhandledRequest: 'bypass' })
  }
}

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </StrictMode>,
  )
})

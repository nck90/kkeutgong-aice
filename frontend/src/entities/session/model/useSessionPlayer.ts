import { useMemo, useState } from 'react'
import type { SessionStep } from '@/shared/types/domain'

export function useSessionPlayer(seed: SessionStep[]) {
  const [steps, setSteps] = useState<SessionStep[]>(seed)

  const openStep = useMemo(() => steps.find((step) => step.state === 'OPEN') ?? steps[0], [steps])
  const progress = useMemo(() => {
    const passed = steps.filter((step) => step.state === 'PASS').length
    return Math.round((passed / steps.length) * 100)
  }, [steps])

  const submitOpenStep = () => {
    setSteps((prev) => {
      const next = prev.map((step) => (step.no === openStep.no ? { ...step, state: 'PASS' as const } : step))
      const locked = next.find((step) => step.state === 'LOCKED')
      if (!locked) return next
      return next.map((step) => (step.no === locked.no ? { ...step, state: 'OPEN' as const } : step))
    })
  }

  return { steps, openStep, progress, submitOpenStep }
}

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { deriveOnboardingEntryDecision } from '@/shared/lib/onboarding-routing'
import { Surface } from '@/widgets/cards/surface'

export function OnboardingEntryPage() {
  const navigate = useNavigate()
  const decision = deriveOnboardingEntryDecision()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate(decision.path, { replace: true })
    }, 280)
    return () => window.clearTimeout(timer)
  }, [navigate, decision.path])

  return (
    <Surface title="온보딩 진입 경로 계산">
      <p className="text-sm text-slate-700">추천 경로: {decision.path}</p>
      <p className="mt-1 text-xs text-slate-600">{decision.reason}</p>
    </Surface>
  )
}

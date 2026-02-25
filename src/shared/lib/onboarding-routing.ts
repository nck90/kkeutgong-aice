import { summarizeOutcomeSignals } from '@/shared/lib/adaptive-feedback'
import { loadStudyGoal } from '@/shared/lib/study-plan'
import { getTextbookCompletionSummary } from '@/shared/lib/textbook'

export type OnboardingRouteDecision = {
  path: '/diagnostic' | '/onboarding/schedule' | '/textbook' | '/plan'
  reason: string
}

export function deriveOnboardingEntryDecision(): OnboardingRouteDecision {
  const goal = loadStudyGoal()
  const signal = summarizeOutcomeSignals(7)
  const textbook = getTextbookCompletionSummary()

  if (!goal && signal.recentCount === 0) {
    return {
      path: '/diagnostic',
      reason: '학습 데이터가 없어 초기 진단부터 시작',
    }
  }

  if (!goal) {
    return {
      path: '/onboarding/schedule',
      reason: '목표/시험일 설정이 필요',
    }
  }

  if (signal.strategy === 'RECOVERY' && textbook.completionRate < 70) {
    return {
      path: '/textbook',
      reason: '성과 복구 구간으로 교재 보강 우선',
    }
  }

  return {
    path: '/plan',
    reason: '기존 데이터 기반 플랜 진행',
  }
}

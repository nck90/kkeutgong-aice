import { adminLabs, historyEntries, labs, mistakes, planTasks, policyRules, referenceDocs, sessionStepsSeed } from '@/shared/mocks/data'
import type { Mode, Policy, SessionDetail, SessionReview, SubmitResult } from '@/shared/types/domain'
import type { SessionStartInput } from './client'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const sessions = new Map<string, SessionDetail>()
const reviews = new Map<string, SessionReview>()

const cloneSteps = () => sessionStepsSeed.map((step) => ({ ...step }))

const buildReview = (detail: SessionDetail): SessionReview => {
  const passCount = detail.steps.filter((step) => step.state === 'PASS').length
  const failCount = detail.steps.filter((step) => step.state === 'FAIL').length

  return {
    sessionId: detail.sessionId,
    passCount,
    failCount,
    topErrorCode: failCount > 0 ? 'ANSWER_VAR_TYPE_MISMATCH' : 'NONE',
    stepTimeline: detail.steps.map((step) => ({ stepNo: step.no, state: step.state, elapsedSec: step.no * 75 })),
  }
}

function nextStepsAfterSubmit(steps: SessionDetail['steps']) {
  const openStep = steps.find((step) => step.state === 'OPEN')
  if (!openStep) return steps

  const next = steps.map((step) => (step.no === openStep.no ? { ...step, state: 'PASS' as const } : step))
  const nextLocked = next.find((step) => step.state === 'LOCKED')
  if (!nextLocked) return next

  return next.map((step) => (step.no === nextLocked.no ? { ...step, state: 'OPEN' as const } : step))
}

export const mockApi = {
  async getLabs() {
    await delay(80)
    return labs
  },

  async getLabById(labId: string) {
    await delay(60)
    return labs.find((lab) => lab.id === labId) ?? null
  },

  async getPlanTasks(date?: string) {
    await delay(80)
    if (!date) return planTasks
    return planTasks.filter((task) => task.date === date)
  },

  async getWeeklyPlanSummary() {
    await delay(80)
    return {
      adherence: 68,
      passRate: 71,
      topError: 'ANSWER_VAR_MISSING',
      recommendations: ['전처리 비중 증가', '모의 1회 추가', '시각화 교정 추가'],
    }
  },

  async getMistakes() {
    await delay(70)
    return mistakes
  },

  async getMistakeByCode(code: string) {
    await delay(60)
    return mistakes.find((item) => item.code === code) ?? null
  },

  async getReferenceDocs() {
    await delay(70)
    return referenceDocs
  },

  async getReferenceDocById(docId: string) {
    await delay(60)
    return referenceDocs.find((doc) => doc.id === docId) ?? null
  },

  async getHistory() {
    await delay(70)
    return historyEntries
  },

  async getAdminLabs() {
    await delay(80)
    return adminLabs
  },

  async getPolicyRules() {
    await delay(80)
    return policyRules
  },

  async startSession(input: SessionStartInput) {
    await delay(100)

    if (!input.consent) {
      throw new Error('CONSENT_REQUIRED')
    }

    const sessionId = `${input.labId}-${Date.now()}`
    const detail: SessionDetail = {
      sessionId,
      mode: input.mode,
      policy: input.policy,
      timerSec: input.mode === 'Mock' ? 30 * 60 : 0,
      steps: cloneSteps(),
    }

    sessions.set(sessionId, detail)
    reviews.set(sessionId, buildReview(detail))

    return { sessionId }
  },

  async getSession(sessionId: string) {
    await delay(70)

    const detail = sessions.get(sessionId)
    if (detail) return detail

    const fallback: SessionDetail = {
      sessionId,
      mode: sessionId.startsWith('mock-') ? ('Mock' as Mode) : ('Practice+' as Mode),
      policy: 'ALLOWLIST_ONLY' as Policy,
      timerSec: sessionId.startsWith('mock-') ? 30 * 60 : 0,
      steps: cloneSteps(),
    }

    sessions.set(sessionId, fallback)
    reviews.set(sessionId, buildReview(fallback))
    return fallback
  },

  async submitStep(sessionId: string, code: string): Promise<SubmitResult> {
    await delay(100)

    const detail = await this.getSession(sessionId)

    if (code.includes('import requests') || code.includes('http://') || code.includes('https://')) {
      return {
        result: 'FAIL',
        errorCodes: ['POLICY_BLOCKED'],
        nextSteps: detail.steps,
      }
    }

    const updatedSteps = nextStepsAfterSubmit(detail.steps)
    const result: SubmitResult = {
      result: 'PASS',
      errorCodes: [],
      nextSteps: updatedSteps,
    }

    const updatedDetail = { ...detail, steps: updatedSteps }
    sessions.set(sessionId, updatedDetail)
    reviews.set(sessionId, buildReview(updatedDetail))

    return result
  },

  async getSessionReview(sessionId: string) {
    await delay(70)

    const cached = reviews.get(sessionId)
    if (cached) return cached

    const detail = await this.getSession(sessionId)
    const review = buildReview(detail)
    reviews.set(sessionId, review)
    return review
  },
}

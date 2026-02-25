export type Mode = 'Practice' | 'Practice+' | 'Mock'

export type Policy = 'OPEN' | 'ALLOWLIST_ONLY' | 'RESTRICTED'

export type SessionStepState = 'LOCKED' | 'OPEN' | 'PASS' | 'FAIL'

export type SessionStep = {
  no: number
  title: string
  state: SessionStepState
  requiredVars: string[]
}

export type Lab = {
  id: string
  title: string
  goal: string
  steps: number
  time: number
  examMode: boolean
  difficulty: 'EASY' | 'MID' | 'HARD'
  tags: string[]
}

export type PlanTask = {
  id: string
  date: string
  type: 'Drill' | 'Lab' | 'Review' | 'Mock'
  title: string
  estMinutes: number
  status: 'TODO' | 'DONE' | 'SKIPPED'
}

export type SessionDetail = {
  sessionId: string
  mode: Mode
  policy: Policy
  steps: SessionStep[]
  timerSec: number
}

export type SubmitResult = {
  result: 'PASS' | 'FAIL' | 'PARTIAL'
  errorCodes: string[]
  nextSteps: SessionStep[]
}

export type SessionReview = {
  sessionId: string
  passCount: number
  failCount: number
  topErrorCode: string
  stepTimeline: Array<{ stepNo: number; state: SessionStepState; elapsedSec: number }>
}

export type MistakeItem = {
  code: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  count14d: number
  description: string
}

export type ReferenceDoc = {
  id: string
  title: string
  category: string
  allowed: boolean
}

export type HistoryEntry = {
  id: string
  date: string
  mode: Mode
  result: 'PASS' | 'PARTIAL' | 'FAIL'
  errorCode?: string
}

export type AdminLabSummary = {
  id: string
  title: string
  status: 'DRAFT' | 'PUBLISHED'
  version: string
  updatedAt: string
}

export type PolicyRule = {
  id: string
  mode: Mode
  allowReference: Policy
  hintLevel: 'FULL' | 'LIMITED' | 'NONE'
  retryLimit: number
  timeLimitMin: number
}

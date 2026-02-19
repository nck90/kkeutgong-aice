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

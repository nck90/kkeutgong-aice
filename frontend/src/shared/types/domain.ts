export type Mode = 'Practice' | 'Practice+' | 'Mock'

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

import type { Lab, Mode, PlanTask, Policy, SessionDetail, SessionReview, SubmitResult } from '@/shared/types/domain'
import { mockApi } from './mockApi'

export type SessionStartInput = {
  labId: string
  mode: Mode
  policy: Policy
  consent: boolean
}

export interface ApiClient {
  getLabs(): Promise<Lab[]>
  getPlanTasks(date?: string): Promise<PlanTask[]>
  startSession(input: SessionStartInput): Promise<{ sessionId: string }>
  getSession(sessionId: string): Promise<SessionDetail>
  submitStep(sessionId: string, code: string): Promise<SubmitResult>
  getSessionReview(sessionId: string): Promise<SessionReview>
}

export const apiClient: ApiClient = mockApi

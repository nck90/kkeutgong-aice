import type {
  AdminLabSummary,
  HistoryEntry,
  Lab,
  MistakeItem,
  Mode,
  PlanTask,
  Policy,
  PolicyRule,
  ReferenceDoc,
  SessionDetail,
  SessionReview,
  SubmitResult,
} from '@/shared/types/domain'
import { mockApi } from './mockApi'

export type SessionStartInput = {
  labId: string
  mode: Mode
  policy: Policy
  consent: boolean
}

export interface ApiClient {
  getLabs(): Promise<Lab[]>
  getLabById(labId: string): Promise<Lab | null>
  getPlanTasks(date?: string): Promise<PlanTask[]>
  getWeeklyPlanSummary(): Promise<{ adherence: number; passRate: number; topError: string; recommendations: string[] }>
  getMistakes(): Promise<MistakeItem[]>
  getMistakeByCode(code: string): Promise<MistakeItem | null>
  getReferenceDocs(): Promise<ReferenceDoc[]>
  getReferenceDocById(docId: string): Promise<ReferenceDoc | null>
  getHistory(): Promise<HistoryEntry[]>
  getAdminLabs(): Promise<AdminLabSummary[]>
  getPolicyRules(): Promise<PolicyRule[]>
  startSession(input: SessionStartInput): Promise<{ sessionId: string }>
  getSession(sessionId: string): Promise<SessionDetail>
  submitStep(sessionId: string, code: string): Promise<SubmitResult>
  getSessionReview(sessionId: string): Promise<SessionReview>
}

export const apiClient: ApiClient = mockApi

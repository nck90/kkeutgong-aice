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
import { realApi } from './realApi'

export interface SessionStartInput {
  labId?: string
  policyId?: string
  mode?: string
  level?: string
}

export interface StepSubmitInput {
  code: string
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
  startSession: (input: SessionStartInput) => Promise<SessionDetail>
  getSession: (sessionId: string) => Promise<SessionDetail>
  submitStep: (
    sessionId: string,
    stepNo: number,
    input: StepSubmitInput,
  ) => Promise<SubmitResult>
  executeCode: (code: string) => Promise<{ output: string; errorMsg: string; runtimeMs: number }>
  getSessionReview: (sessionId: string) => Promise<SessionReview>
}

const API_MODE = (import.meta.env.VITE_API_MODE ?? 'mock').toLowerCase()

export const apiClient: ApiClient = API_MODE === 'real' ? realApi : mockApi

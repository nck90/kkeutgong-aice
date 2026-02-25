import type {
  AdminLabSummary,
  HistoryEntry,
  Lab,
  MistakeItem,
  PlanTask,
  PolicyRule,
  Policy,
  ReferenceDoc,
  SessionDetail,
  SessionReview,
  SessionStep,
  SubmitResult,
} from '@/shared/types/domain'
import { apiRequest } from './http-client'
import type { ApiClient, SessionStartInput, StepSubmitInput } from './client'

type AdminLabRow = {
  id: string
  title?: string
  goal?: string
  steps?: number
  time?: number
  examMode?: boolean
  difficulty?: Lab['difficulty']
  tags?: string[]
  status?: AdminLabSummary['status']
  version?: string
  updatedAt?: string
}

type PlanTaskRow = {
  taskId: string
  date?: string
  type: PlanTask['type']
  title: string
  estMinutes: number
  status: PlanTask['status']
}

type PlanResponse = {
  tasks?: PlanTaskRow[]
}

type SessionStepRow = {
  no: number
  title: string
  state: SessionStep['state']
  requiredVars: string[]
}

type SessionResponse = {
  sessionId: string
  mode: SessionDetail['mode']
  policy: {
    referencePolicy: Policy
    timeLimitSec?: number
  }
  steps: SessionStepRow[]
}

type SubmitResponse = {
  result: SubmitResult['result']
  errorCodes?: string[]
  nextSteps?: string[]
}

// Map helper functions
const mapLab = (item: AdminLabRow): Lab => ({
  id: item.id,
  title: item.title ?? 'Untitled Lab',
  goal: item.goal ?? '',
  steps: item.steps ?? 1,
  time: item.time ?? 30,
  examMode: item.examMode ?? false,
  difficulty: item.difficulty ?? 'EASY',
  tags: item.tags ?? [],
})

const mapSessionSteps = (steps: SessionStepRow[]): SessionStep[] =>
  steps.map((st) => ({
    no: st.no,
    title: st.title,
    state: st.state,
    requiredVars: st.requiredVars,
    userCode: '',
  }))

// Main Real API implementation without fallback mocks
export const realApi: ApiClient = {
  getLabs: async () => {
    const rows = await apiRequest<AdminLabRow[]>('/api/admin/labs')
    return rows.map(mapLab)
  },

  getLabById: async (labId) => {
    const rows = await realApi.getLabs()
    return rows.find((lab) => lab.id === labId) ?? null
  },

  getPlanTasks: async (date) => {
    if (date) {
      const data = await apiRequest<PlanResponse>(`/api/aice/plan/day/${date}`)
      return (data.tasks ?? []).map((task) => ({
        id: task.taskId,
        date,
        type: task.type,
        title: task.title,
        estMinutes: task.estMinutes,
        status: task.status,
      })) as PlanTask[]
    }
    const data = await apiRequest<PlanResponse>('/api/aice/plan')
    return (data.tasks ?? []).map((task) => ({
      id: task.taskId,
      date: task.date,
      type: task.type,
      title: task.title,
      estMinutes: task.estMinutes,
      status: task.status,
    })) as PlanTask[]
  },

  getWeeklyPlanSummary: async () => {
    return await apiRequest<{ adherence: number; passRate: number; topError: string; recommendations: string[] }>('/api/aice/plan/summary')
  },

  getMistakes: async () => {
    return await apiRequest<MistakeItem[]>('/api/aice/mistakes')
  },

  getMistakeByCode: async (code) => {
    const list = await realApi.getMistakes()
    return list.find((item) => item.code === code) ?? null
  },

  getReferenceDocs: async () => {
    return await apiRequest<ReferenceDoc[]>('/api/aice/reference/docs')
  },

  getReferenceDocById: async (docId) => {
    const docs = await realApi.getReferenceDocs()
    return docs.find((doc) => doc.id === docId) ?? null
  },

  getHistory: async () => {
    return await apiRequest<HistoryEntry[]>('/api/aice/history')
  },

  getAdminLabs: async () => {
    const rows = await apiRequest<AdminLabRow[]>('/api/admin/labs')
    return rows.map(
      (item): AdminLabSummary => ({
        id: item.id,
        title: item.title ?? item.id,
        status: item.status ?? 'DRAFT',
        version: item.version ?? '1.0.0',
        updatedAt: item.updatedAt ?? new Date().toISOString().slice(0, 10),
      }),
    )
  },

  getPolicyRules: async () => {
    return await apiRequest<PolicyRule[]>('/api/aice/policies')
  },

  startSession: async (input: SessionStartInput) => {
    const data = await apiRequest<{ sessionId: string }>(`/api/aice/labs/${input.labId}/sessions`, {
      method: 'POST',
      body: {
        level: 'Associate',
        mode: input.mode || 'Practice',
        policyId: input.policyId || 'plc_practice_plus',
      },
    })
    return { sessionId: data.sessionId }
  },

  getSession: async (sessionId: string) => {
    const data = await apiRequest<SessionResponse>(`/api/aice/sessions/${sessionId}`)
    return {
      sessionId: data.sessionId,
      mode: data.mode,
      policy: data.policy.referencePolicy as Policy,
      steps: mapSessionSteps(data.steps),
      timerSec: data.policy.timeLimitSec ?? 0,
    } as SessionDetail
  },

  submitStep: async (sessionId: string, stepNo: number, input: StepSubmitInput) => {
    const data = await apiRequest<SubmitResponse>(
      `/api/aice/sessions/${sessionId}/steps/${stepNo}/submit`,
      {
        method: 'POST',
        body: input,
      }
    )
    return {
      result: data.result,
      errorCodes: data.errorCodes ?? [],
      nextSteps: (data.nextSteps ?? []).map((stepId, i) => ({
        no: i,
        title: stepId,
        state: 'LOCKED',
        requiredVars: []
      }))
    } as SubmitResult
  },

  executeCode: async (code: string) => {
    const data = await apiRequest<{ output: string; errorMsg: string; runtimeMs: number }>(
      '/api/aice/execute',
      {
        method: 'POST',
        body: { code },
      }
    )
    return data
  },

  getSessionReview: async (sessionId: string) => {
    const data = await apiRequest<SessionReview>(`/api/aice/sessions/${sessionId}/review`)
    return {
      sessionId: data.sessionId,
      passCount: data.passCount,
      failCount: data.failCount,
      topErrorCode: data.topErrorCode,
      stepTimeline: data.stepTimeline,
    } as SessionReview
  },
}

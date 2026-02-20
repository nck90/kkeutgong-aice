import { adminLabs as fallbackAdminLabs, historyEntries } from '@/shared/mocks/data'
import type {
  AdminLabSummary,
  HistoryEntry,
  Lab,
  MistakeItem,
  PlanTask,
  Policy,
  ReferenceDoc,
  SessionDetail,
  SessionReview,
  SessionStep,
  SubmitResult,
} from '@/shared/types/domain'
import { apiRequest } from './http-client'
import { mockApi } from './mockApi'
import type { ApiClient, SessionStartInput } from './client'

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
  nextSteps?: SessionStep[]
}

const toPolicyId = (policy: Policy) => {
  if (policy === 'OPEN') return 'plc_practice'
  if (policy === 'ALLOWLIST_ONLY') return 'plc_practice_plus'
  return 'plc_mock'
}

const parseAnswerVariables = (code: string) => {
  const answers: Record<string, unknown> = {}
  const matches = code.match(/\b[a-zA-Z_]\w*(?=\s*=)/g) ?? []

  matches.forEach((name) => {
    answers[name] = true
  })

  return answers
}

const mapLab = (item: AdminLabRow): Lab => ({
  id: item.id,
  title: item.title ?? item.id,
  goal: item.goal ?? '실전형 데이터 분석 문제를 단계별로 수행합니다.',
  steps: item.steps ?? 5,
  time: item.time ?? 60,
  examMode: item.examMode ?? true,
  difficulty: item.difficulty ?? 'MID',
  tags: item.tags ?? ['AICE'],
})

const mapSessionSteps = (steps: SessionStepRow[]): SessionStep[] =>
  steps.map((step) => ({
    no: step.no,
    title: step.title,
    state: step.state,
    requiredVars: step.requiredVars,
  }))

async function withFallback<T>(realFn: () => Promise<T>, fallbackFn: () => Promise<T>): Promise<T> {
  try {
    return await realFn()
  } catch {
    return fallbackFn()
  }
}

export const realApi: ApiClient = {
  getLabs: () =>
    withFallback(
      async () => {
        const rows = await apiRequest<AdminLabRow[]>('/api/admin/labs')
        return rows.map(mapLab)
      },
      () => mockApi.getLabs(),
    ),

  getLabById: async (labId) => {
    const rows = await realApi.getLabs()
    return rows.find((lab) => lab.id === labId) ?? null
  },

  getPlanTasks: (date) =>
    withFallback(
      async () => {
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
      () => mockApi.getPlanTasks(date),
    ),

  getWeeklyPlanSummary: () => withFallback(() => mockApi.getWeeklyPlanSummary(), () => mockApi.getWeeklyPlanSummary()),

  getMistakes: () => withFallback(() => apiRequest<MistakeItem[]>('/api/aice/mistakes'), () => mockApi.getMistakes()),

  getMistakeByCode: async (code) => {
    const list = await realApi.getMistakes()
    return list.find((item) => item.code === code) ?? null
  },

  getReferenceDocs: () =>
    withFallback(() => apiRequest<ReferenceDoc[]>('/api/aice/reference/docs'), () => mockApi.getReferenceDocs()),

  getReferenceDocById: async (docId) => {
    const docs = await realApi.getReferenceDocs()
    return docs.find((doc) => doc.id === docId) ?? null
  },

  getHistory: () =>
    withFallback(
      async () => historyEntries as HistoryEntry[],
      () => mockApi.getHistory(),
    ),

  getAdminLabs: () =>
    withFallback(
      async () => {
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
      async () => fallbackAdminLabs,
    ),

  getPolicyRules: () => withFallback(() => mockApi.getPolicyRules(), () => mockApi.getPolicyRules()),

  startSession: (input: SessionStartInput) =>
    withFallback(
      async () => {
        const data = await apiRequest<{ sessionId: string }>(`/api/aice/labs/${input.labId}/sessions`, {
          method: 'POST',
          body: {
            level: 'Associate',
            mode: input.mode,
            policyId: toPolicyId(input.policy),
            consent: input.consent,
          },
        })
        return { sessionId: data.sessionId }
      },
      () => mockApi.startSession(input),
    ),

  getSession: (sessionId: string) =>
    withFallback(
      async () => {
        const data = await apiRequest<SessionResponse>(`/api/aice/sessions/${sessionId}`)

        return {
          sessionId: data.sessionId,
          mode: data.mode,
          policy: data.policy.referencePolicy as Policy,
          steps: mapSessionSteps(data.steps),
          timerSec: data.policy.timeLimitSec ?? 0,
        } as SessionDetail
      },
      () => mockApi.getSession(sessionId),
    ),

  submitStep: (sessionId: string, code: string) =>
    withFallback(
      async () => {
        const session = await realApi.getSession(sessionId)
        const open = session.steps.find((step) => step.state === 'OPEN') ?? session.steps[0]

        const data = await apiRequest<SubmitResponse>(
          `/api/aice/sessions/${sessionId}/steps/${open.no}/submit`,
          {
            method: 'POST',
            body: {
              answers: parseAnswerVariables(code),
              codeSnapshotRef: `snap_${Date.now()}`,
            },
          },
        )

        return {
          result: data.result,
          errorCodes: data.errorCodes ?? [],
          nextSteps: data.nextSteps ?? session.steps,
        } as SubmitResult
      },
      () => mockApi.submitStep(sessionId, code),
    ),

  getSessionReview: (sessionId: string) =>
    withFallback(
      async () => {
        const data = await apiRequest<SessionReview>(`/api/aice/sessions/${sessionId}/review`)

        return {
          sessionId: data.sessionId,
          passCount: data.passCount,
          failCount: data.failCount,
          topErrorCode: data.topErrorCode,
          stepTimeline: data.stepTimeline,
        } as SessionReview
      },
      () => mockApi.getSessionReview(sessionId),
    ),
}

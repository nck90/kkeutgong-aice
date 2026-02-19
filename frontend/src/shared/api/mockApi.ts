import { labs, planTasks, sessionStepsSeed } from '@/shared/mocks/data'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockApi = {
  async getLabs() {
    await delay(120)
    return labs
  },
  async getPlanTasks(date?: string) {
    await delay(120)
    if (!date) return planTasks
    return planTasks.filter((task) => task.date === date)
  },
  async getSession(sessionId: string) {
    await delay(100)
    return {
      sessionId,
      mode: 'Practice+' as const,
      policy: 'ALLOWLIST_ONLY' as const,
      steps: sessionStepsSeed,
    }
  },
}

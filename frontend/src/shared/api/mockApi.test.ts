import { describe, expect, it } from 'vitest'
import { mockApi } from './mockApi'

describe('mockApi', () => {
  it('blocks disallowed network code by policy', async () => {
    const { sessionId } = await mockApi.startSession({
      labId: 'lab-pipeline-01',
      mode: 'Mock',
      policy: 'ALLOWLIST_ONLY',
      consent: true,
    })

    const result = await mockApi.submitStep(sessionId, 'import requests\nrequests.get("https://x.com")')
    expect(result.errorCodes).toContain('POLICY_BLOCKED')
    expect(result.result).toBe('FAIL')
  })

  it('advances step state on valid submission', async () => {
    const { sessionId } = await mockApi.startSession({
      labId: 'lab-pipeline-01',
      mode: 'Practice+',
      policy: 'ALLOWLIST_ONLY',
      consent: true,
    })

    const result = await mockApi.submitStep(sessionId, 'answer02 = df.fillna(0)')
    expect(result.result).toBe('PASS')
    expect(result.nextSteps.some((step) => step.state === 'PASS')).toBe(true)
  })
})

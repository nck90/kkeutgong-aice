import { describe, expect, it } from 'vitest'
import { sessionStartSchema } from './sessionStartSchema'

describe('sessionStartSchema', () => {
  it('rejects when consent is false', () => {
    const result = sessionStartSchema.safeParse({ mode: 'Practice', policy: 'OPEN', consent: false })
    expect(result.success).toBe(false)
  })

  it('accepts valid payload', () => {
    const result = sessionStartSchema.safeParse({ mode: 'Mock', policy: 'ALLOWLIST_ONLY', consent: true })
    expect(result.success).toBe(true)
  })
})

import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('merges classes', () => {
    expect(cn('px-2', 'py-2', 'px-4')).toContain('px-4')
  })
})

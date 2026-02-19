import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useSessionTimer } from './useSessionTimer'

describe('useSessionTimer', () => {
  it('counts down when running', () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useSessionTimer(5, true))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.seconds).toBe(3)
    expect(result.current.formatted).toBe('00:03')

    vi.useRealTimers()
  })
})

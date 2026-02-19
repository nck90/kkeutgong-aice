import { useEffect, useMemo, useState } from 'react'

export function useSessionTimer(initialSec: number, running: boolean) {
  const [seconds, setSeconds] = useState(initialSec)

  useEffect(() => {
    setSeconds(initialSec)
  }, [initialSec])

  useEffect(() => {
    if (!running || seconds <= 0) return
    const timer = window.setInterval(() => {
      setSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [running, seconds])

  const formatted = useMemo(() => {
    const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
    const ss = String(seconds % 60).padStart(2, '0')
    return `${mm}:${ss}`
  }, [seconds])

  return { seconds, formatted }
}

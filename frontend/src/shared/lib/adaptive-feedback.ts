type OutcomeResult = 'PASS' | 'PARTIAL' | 'FAIL' | 'ERROR'

export type SessionOutcomeEvent = {
  id: string
  at: string
  sessionId: string
  mode: 'Practice' | 'Practice+' | 'Mock'
  result: OutcomeResult
  errorCodes: string[]
}

export type OutcomeSignalSummary = {
  recentCount: number
  passRate: number
  failLikeCount: number
  topErrors: Array<{ code: string; count: number }>
  strategy: 'RECOVERY' | 'STABLE' | 'ADVANCE'
  reasons: string[]
}

export type OutcomeTrendPoint = {
  date: string
  pass: number
  partial: number
  fail: number
  error: number
}

export type OutcomeModeBreakdown = {
  mode: 'Practice' | 'Practice+' | 'Mock'
  total: number
  passRate: number
}

const KEY = 'aice_session_outcomes'
const DAY = 24 * 60 * 60 * 1000

function loadRaw(): SessionOutcomeEvent[] {
  const raw = localStorage.getItem(KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as SessionOutcomeEvent[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveRaw(items: SessionOutcomeEvent[]) {
  localStorage.setItem(KEY, JSON.stringify(items.slice(0, 120)))
}

export function recordOutcomeEvent(input: Omit<SessionOutcomeEvent, 'id' | 'at'>) {
  const items = loadRaw()
  const next: SessionOutcomeEvent = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
    ...input,
  }
  saveRaw([next, ...items])
}

export function loadRecentOutcomeEvents(days = 14): SessionOutcomeEvent[] {
  const cutoff = Date.now() - days * DAY
  return loadRaw().filter((item) => new Date(item.at).getTime() >= cutoff)
}

export function summarizeOutcomeSignals(days = 7): OutcomeSignalSummary {
  const recent = loadRecentOutcomeEvents(days)
  const passCount = recent.filter((item) => item.result === 'PASS').length
  const failLike = recent.filter((item) => item.result !== 'PASS').length
  const passRate = recent.length ? Math.round((passCount / recent.length) * 100) : 100

  const errorCounter: Record<string, number> = {}
  recent.forEach((item) => {
    item.errorCodes.forEach((code) => {
      errorCounter[code] = (errorCounter[code] ?? 0) + 1
    })
  })
  const topErrors = Object.entries(errorCounter)
    .map(([code, count]) => ({ code, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)

  const reasons: string[] = []
  if (recent.length === 0) {
    reasons.push('최근 세션 데이터가 없어 기본 플랜으로 운영')
    return {
      recentCount: 0,
      passRate: 100,
      failLikeCount: 0,
      topErrors: [],
      strategy: 'STABLE',
      reasons,
    }
  }

  reasons.push(`최근 ${recent.length}회 세션`)
  reasons.push(`PASS율 ${passRate}%`)
  if (topErrors[0]) reasons.push(`Top 오류 ${topErrors[0].code}`)

  if (passRate < 55 || failLike >= 3) {
    return {
      recentCount: recent.length,
      passRate,
      failLikeCount: failLike,
      topErrors,
      strategy: 'RECOVERY',
      reasons,
    }
  }

  if (passRate >= 80 && failLike <= 1) {
    return {
      recentCount: recent.length,
      passRate,
      failLikeCount: failLike,
      topErrors,
      strategy: 'ADVANCE',
      reasons,
    }
  }

  return {
    recentCount: recent.length,
    passRate,
    failLikeCount: failLike,
    topErrors,
    strategy: 'STABLE',
    reasons,
  }
}

export function summarizeOutcomeTrend(days = 7): OutcomeTrendPoint[] {
  const recent = loadRecentOutcomeEvents(days)
  const byDate: Record<string, OutcomeTrendPoint> = {}

  recent.forEach((item) => {
    const date = item.at.slice(0, 10)
    if (!byDate[date]) {
      byDate[date] = { date, pass: 0, partial: 0, fail: 0, error: 0 }
    }
    if (item.result === 'PASS') byDate[date].pass += 1
    if (item.result === 'PARTIAL') byDate[date].partial += 1
    if (item.result === 'FAIL') byDate[date].fail += 1
    if (item.result === 'ERROR') byDate[date].error += 1
  })

  return Object.values(byDate).sort((a, b) => (a.date < b.date ? -1 : 1))
}

export function summarizeOutcomeByMode(days = 14): OutcomeModeBreakdown[] {
  const recent = loadRecentOutcomeEvents(days)
  const modes: Array<'Practice' | 'Practice+' | 'Mock'> = ['Practice', 'Practice+', 'Mock']

  return modes.map((mode) => {
    const rows = recent.filter((item) => item.mode === mode)
    const pass = rows.filter((item) => item.result === 'PASS').length
    const passRate = rows.length ? Math.round((pass / rows.length) * 100) : 0
    return { mode, total: rows.length, passRate }
  })
}

export function clearOutcomeEvents() {
  localStorage.removeItem(KEY)
}

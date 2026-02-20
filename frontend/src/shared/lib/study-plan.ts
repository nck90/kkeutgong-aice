import type { HistoryEntry, MistakeItem } from '@/shared/types/domain'
import type { OutcomeSignalSummary } from './adaptive-feedback'

export type ExamTrack = 'Basic' | 'Associate' | 'Professional'
export type ExamSession = {
  id: string
  track: ExamTrack
  title: string
  startAt: string
  endAt: string
  feeKrw: number
  registrationStart: string
  registrationEnd: string
  statusLabel: string
}

export type StudyGoal = {
  mode: 'exam' | 'custom'
  examId?: string
  customTargetDate?: string
  level: ExamTrack
  weeklyHours: number
  preferredSlot: '오전 집중형' | '오후 집중형' | '야간 집중형'
  offDay: string
}

export type CurriculumPhase = {
  id: 'concept' | 'textbook' | 'drill' | 'mock'
  title: string
  subtitle: string
  days: number
  weight: number
  outcomes: string[]
}

export type DailyCurriculumTask = {
  date: string
  phaseId: CurriculumPhase['id']
  phaseTitle: string
  title: string
  minutes: number
}

export type AdaptivePlan = {
  focusAreas: Array<{
    code: string
    title: string
    reason: string
    recommendation: string
    boostPhase: 'concept' | 'textbook' | 'drill' | 'mock'
  }>
  personalizedTasks: DailyCurriculumTask[]
}

export type TextbookAdaptiveInjection = {
  chapterId: string
  chapterTitle: string
  targetDate: string
}

export type AdaptiveIntensityProfile = {
  pace: 'RELAXED' | 'BALANCED' | 'INTENSIVE'
  dailyBoostMin: number
  textbookPriorityCount: number
  reasons: string[]
}

export type OutcomeAdaptiveAdjustment = {
  adjustedTasks: DailyCurriculumTask[]
  notes: string[]
}

export type SessionStartRecommendation = {
  mode: 'Practice' | 'Practice+' | 'Mock'
  policy: 'OPEN' | 'ALLOWLIST_ONLY' | 'RESTRICTED'
  suggestedTimerMin: number
  focus: 'ACCURACY' | 'SPEED' | 'BALANCE'
  reasons: string[]
}

export const AICE_EXAM_SESSIONS: ExamSession[] = [
  {
    id: 'assoc-20260227-1100',
    track: 'Associate',
    title: 'AICE Associate',
    startAt: '2026-02-27T11:00:00+09:00',
    endAt: '2026-02-27T12:30:00+09:00',
    feeKrw: 80000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '온라인접수중',
  },
  {
    id: 'pro-20260227-1400',
    track: 'Professional',
    title: 'AICE Professional',
    startAt: '2026-02-27T14:00:00+09:00',
    endAt: '2026-02-27T17:00:00+09:00',
    feeKrw: 120000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '접수중',
  },
  {
    id: 'assoc-20260227-1600',
    track: 'Associate',
    title: 'AICE Associate',
    startAt: '2026-02-27T16:00:00+09:00',
    endAt: '2026-02-27T17:30:00+09:00',
    feeKrw: 80000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '온라인접수중',
  },
  {
    id: 'assoc-20260228-1600',
    track: 'Associate',
    title: 'AICE Associate',
    startAt: '2026-02-28T16:00:00+09:00',
    endAt: '2026-02-28T17:30:00+09:00',
    feeKrw: 80000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '온라인접수중',
  },
  {
    id: 'basic-20260228-1000',
    track: 'Basic',
    title: 'AICE Basic',
    startAt: '2026-02-28T10:00:00+09:00',
    endAt: '2026-02-28T11:00:00+09:00',
    feeKrw: 50000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '접수중',
  },
  {
    id: 'assoc-20260228-1100',
    track: 'Associate',
    title: 'AICE Associate',
    startAt: '2026-02-28T11:00:00+09:00',
    endAt: '2026-02-28T12:30:00+09:00',
    feeKrw: 80000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '온라인접수중',
  },
  {
    id: 'pro-20260228-1400',
    track: 'Professional',
    title: 'AICE Professional',
    startAt: '2026-02-28T14:00:00+09:00',
    endAt: '2026-02-28T17:00:00+09:00',
    feeKrw: 120000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '접수중',
  },
  {
    id: 'basic-20260228-1400',
    track: 'Basic',
    title: 'AICE Basic',
    startAt: '2026-02-28T14:00:00+09:00',
    endAt: '2026-02-28T15:00:00+09:00',
    feeKrw: 50000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '접수중',
  },
  {
    id: 'basic-20260227-1000',
    track: 'Basic',
    title: 'AICE Basic',
    startAt: '2026-02-27T10:00:00+09:00',
    endAt: '2026-02-27T11:00:00+09:00',
    feeKrw: 50000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '접수중',
  },
  {
    id: 'basic-20260227-1400',
    track: 'Basic',
    title: 'AICE Basic',
    startAt: '2026-02-27T14:00:00+09:00',
    endAt: '2026-02-27T15:00:00+09:00',
    feeKrw: 50000,
    registrationStart: '2026-02-02T00:00:00+09:00',
    registrationEnd: '2026-02-20T23:59:00+09:00',
    statusLabel: '접수중',
  },
]

const GOAL_KEY = 'aice_study_goal'

const DAY = 24 * 60 * 60 * 1000

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(source: Date, days: number) {
  return new Date(source.getTime() + days * DAY)
}

export function formatDateTimeLabel(iso: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(iso))
}

export function formatDateLabel(iso: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso))
}

export function calcDDay(targetIso: string, baseDate = new Date()) {
  const target = startOfDay(new Date(targetIso))
  const base = startOfDay(baseDate)
  return Math.ceil((target.getTime() - base.getTime()) / DAY)
}

export function getExamById(examId?: string) {
  if (!examId) return null
  return AICE_EXAM_SESSIONS.find((item) => item.id === examId) ?? null
}

export function resolveTargetDate(goal: StudyGoal) {
  if (goal.mode === 'exam') {
    const exam = getExamById(goal.examId)
    if (exam) return toDateKey(new Date(exam.startAt))
  }

  if (goal.customTargetDate) return goal.customTargetDate
  return toDateKey(addDays(new Date(), 21))
}

export function saveStudyGoal(goal: StudyGoal) {
  localStorage.setItem(GOAL_KEY, JSON.stringify(goal))
}

export function loadStudyGoal(): StudyGoal | null {
  const raw = localStorage.getItem(GOAL_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StudyGoal
  } catch {
    return null
  }
}

export function buildCurriculum(goal: StudyGoal, baseDate = new Date()) {
  const targetDateKey = resolveTargetDate(goal)
  const daysLeft = calcDDay(targetDateKey, baseDate)
  const safeDays = Math.max(1, daysLeft)

  const compact = safeDays <= 10
  const phaseWeights = compact
    ? { concept: 0.14, textbook: 0.28, drill: 0.24, mock: 0.34 }
    : { concept: 0.22, textbook: 0.3, drill: 0.26, mock: 0.22 }

  const phaseOrderForAllocation: Array<keyof typeof phaseWeights> = ['concept', 'textbook', 'drill', 'mock']
  const phaseFloors = phaseOrderForAllocation.map((key) => ({
    key,
    floor: Math.floor(safeDays * phaseWeights[key]),
    decimal: safeDays * phaseWeights[key] - Math.floor(safeDays * phaseWeights[key]),
  }))
  let remaining = safeDays - phaseFloors.reduce((sum, item) => sum + item.floor, 0)

  phaseFloors.sort((a, b) => b.decimal - a.decimal)
  for (let i = 0; i < phaseFloors.length && remaining > 0; i += 1) {
    phaseFloors[i].floor += 1
    remaining -= 1
  }

  const phaseDays = {
    concept: phaseFloors.find((item) => item.key === 'concept')?.floor ?? 0,
    textbook: phaseFloors.find((item) => item.key === 'textbook')?.floor ?? 0,
    drill: phaseFloors.find((item) => item.key === 'drill')?.floor ?? 0,
    mock: phaseFloors.find((item) => item.key === 'mock')?.floor ?? 0,
  }

  const phases: CurriculumPhase[] = [
    {
      id: 'concept',
      title: 'AICE 개념 학습',
      subtitle: '핵심 문법/모델링/평가지표를 빠르게 정리',
      days: phaseDays.concept,
      weight: Math.round(phaseWeights.concept * 100),
      outcomes: ['핵심 개념맵 1장 완성', '빈출 실수 체크리스트 초기화'],
    },
    {
      id: 'textbook',
      title: '샘플문항 교재 학습',
      subtitle: '샘플문항을 챕터형 교재로 재구성해 이해 중심 학습',
      days: phaseDays.textbook,
      weight: Math.round(phaseWeights.textbook * 100),
      outcomes: ['챕터 1~4 학습', '정답 변수/제출 포맷 패턴 체득'],
    },
    {
      id: 'drill',
      title: '실습/드릴',
      subtitle: '유형별 미니 실습으로 실수율 감소',
      days: phaseDays.drill,
      weight: Math.round(phaseWeights.drill * 100),
      outcomes: ['유형별 드릴 12세트', '오답노트 1차 완성'],
    },
    {
      id: 'mock',
      title: '모의고사/리뷰',
      subtitle: '실전 타임박스로 모의고사 + 회고',
      days: phaseDays.mock,
      weight: Math.round(phaseWeights.mock * 100),
      outcomes: ['모의고사 2~4회', '시험 직전 루틴 확정'],
    },
  ]

  const today = startOfDay(baseDate)
  const dailyMinutes = Math.max(40, Math.round((goal.weeklyHours * 60) / 5))

  const phaseOrder: CurriculumPhase['id'][] = []
  phases.forEach((phase) => {
    for (let i = 0; i < phase.days; i += 1) phaseOrder.push(phase.id)
  })

  const tasks: DailyCurriculumTask[] = phaseOrder.map((phaseId, index) => {
    const date = toDateKey(addDays(today, index))
    if (phaseId === 'concept') {
      return {
        date,
        phaseId,
        phaseTitle: 'AICE 개념 학습',
        title: '핵심 개념맵 + 필수 함수 암기',
        minutes: dailyMinutes,
      }
    }

    if (phaseId === 'textbook') {
      return {
        date,
        phaseId,
        phaseTitle: '샘플문항 교재 학습',
        title: '교재 챕터 학습 + 예제 재현',
        minutes: dailyMinutes,
      }
    }

    if (phaseId === 'drill') {
      return {
        date,
        phaseId,
        phaseTitle: '실습/드릴',
        title: '유형 드릴 2세트 + 오답 정리',
        minutes: dailyMinutes,
      }
    }

    return {
      date,
      phaseId,
      phaseTitle: '모의고사/리뷰',
      title: '실전 모의고사 + 회고 리포트',
      minutes: dailyMinutes + 20,
    }
  })

  const sampleTextbookChapters = [
    'CH1. 데이터 탐색/전처리 기준선',
    'CH2. 답안 변수 선언/타입 규칙',
    'CH3. 모델링 파이프라인 작성 템플릿',
    'CH4. 채점 포인트 기반 제출 전략',
  ]

  return {
    targetDateKey,
    daysLeft,
    phases,
    tasks,
    sampleTextbookChapters,
    todayTasks: tasks.filter((item) => item.date === toDateKey(today)),
    nextTasks: tasks.slice(0, Math.min(10, tasks.length)),
  }
}

const ERROR_FOCUS_MAP: Record<
  string,
  {
    title: string
    reason: string
    recommendation: string
    boostPhase: 'concept' | 'textbook' | 'drill' | 'mock'
    taskTitle: string
  }
> = {
  ANSWER_VAR_MISSING: {
    title: '답안 변수 선언 정확도',
    reason: '답안 변수 누락이 합격 저해 요인입니다.',
    recommendation: '샘플문항 교재 CH2 + 변수명 드릴을 우선 배치',
    boostPhase: 'textbook',
    taskTitle: '교재 CH2 + 변수 선언 드릴 3세트',
  },
  ANSWER_VAR_TYPE_MISMATCH: {
    title: '답안 타입 정합성',
    reason: '출력 변수 타입 불일치가 반복됩니다.',
    recommendation: '정답 출력 포맷/타입 검증 루틴을 추가',
    boostPhase: 'drill',
    taskTitle: '타입 검증 실습 + 채점포맷 교정',
  },
  EXEC_TIMEOUT: {
    title: '실행 성능 최적화',
    reason: '실행 시간 초과가 발생 중입니다.',
    recommendation: '벡터화/불필요 반복 제거 드릴',
    boostPhase: 'drill',
    taskTitle: '성능 최적화 드릴(벡터화, apply 최소화)',
  },
  POLICY_BLOCKED: {
    title: '정책 준수 제출',
    reason: '시험 정책 위반으로 제출이 차단됩니다.',
    recommendation: '허용 API/참조 범위 체크리스트 학습',
    boostPhase: 'concept',
    taskTitle: '정책 준수 체크리스트 + 제한 환경 시뮬레이션',
  },
}

export function buildAdaptivePlan(
  tasks: DailyCurriculumTask[],
  mistakes: MistakeItem[],
  history: HistoryEntry[],
): AdaptivePlan {
  const failHistory = history.filter((item) => item.result !== 'PASS' && item.errorCode)
  const codesFromHistory = failHistory.map((item) => item.errorCode).filter(Boolean) as string[]
  const rankedByMistake = [...mistakes].sort((a, b) => b.count14d - a.count14d).map((item) => item.code)
  const uniqueCodes = Array.from(new Set([...codesFromHistory, ...rankedByMistake])).slice(0, 3)

  const focusAreas = uniqueCodes
    .map((code) => {
      const mapped = ERROR_FOCUS_MAP[code]
      if (!mapped) return null
      return {
        code,
        title: mapped.title,
        reason: mapped.reason,
        recommendation: mapped.recommendation,
        boostPhase: mapped.boostPhase,
      }
    })
    .filter(Boolean) as AdaptivePlan['focusAreas']

  const personalizedTasks = tasks.slice(0, 10).map((task) => ({ ...task }))

  focusAreas.forEach((focus, index) => {
    const injectionIndex = Math.min(index * 2 + 1, personalizedTasks.length - 1)
    const mapped = ERROR_FOCUS_MAP[focus.code]
    const base = personalizedTasks[injectionIndex]
    if (!base || !mapped) return

    personalizedTasks[injectionIndex] = {
      ...base,
      phaseId: mapped.boostPhase,
      phaseTitle:
        mapped.boostPhase === 'concept'
          ? 'AICE 개념 학습'
          : mapped.boostPhase === 'textbook'
            ? '샘플문항 교재 학습'
            : mapped.boostPhase === 'drill'
              ? '실습/드릴'
              : '모의고사/리뷰',
      title: mapped.taskTitle,
      minutes: base.minutes + 15,
    }
  })

  return { focusAreas, personalizedTasks }
}

export function injectPendingTextbookTasks(
  tasks: DailyCurriculumTask[],
  pendingChapters: Array<{ chapterId: string; title: string; estimatedMinutes: number }>,
  options?: { dailyBoostMin?: number },
) {
  const adjusted = tasks.map((task) => ({ ...task }))
  const injections: TextbookAdaptiveInjection[] = []
  const boost = options?.dailyBoostMin ?? 0

  pendingChapters.forEach((chapter, index) => {
    const targetIndex = Math.min(index * 3 + 1, adjusted.length - 1)
    const base = adjusted[targetIndex]
    if (!base) return

    adjusted[targetIndex] = {
      ...base,
      phaseId: 'textbook',
      phaseTitle: '샘플문항 교재 학습',
      title: `미완료 교재 보강: ${chapter.title}`,
      minutes: Math.max(base.minutes, chapter.estimatedMinutes) + boost,
    }

    injections.push({
      chapterId: chapter.chapterId,
      chapterTitle: chapter.title,
      targetDate: base.date,
    })
  })

  return { adjustedTasks: adjusted, injections }
}

export function deriveAdaptiveIntensity(
  daysLeft: number,
  mistakes: MistakeItem[],
): AdaptiveIntensityProfile {
  const highIssues = mistakes.filter((item) => item.severity === 'HIGH')
  const topIssue = [...mistakes].sort((a, b) => b.count14d - a.count14d)[0]
  const reasons: string[] = []

  if (daysLeft <= 7) {
    reasons.push(`시험 임박(D-${Math.max(0, daysLeft)})`)
  } else if (daysLeft <= 14) {
    reasons.push(`시험 근접(D-${daysLeft})`)
  } else {
    reasons.push(`여유 기간 확보(D-${daysLeft})`)
  }

  if (topIssue) {
    reasons.push(`Top 오류 ${topIssue.code}(${topIssue.count14d}회)`)
  }

  if (daysLeft <= 7 || highIssues.length >= 2) {
    return {
      pace: 'INTENSIVE',
      dailyBoostMin: 25,
      textbookPriorityCount: 3,
      reasons,
    }
  }

  if (daysLeft <= 14 || highIssues.length >= 1) {
    return {
      pace: 'BALANCED',
      dailyBoostMin: 15,
      textbookPriorityCount: 2,
      reasons,
    }
  }

  return {
    pace: 'RELAXED',
    dailyBoostMin: 5,
    textbookPriorityCount: 1,
    reasons,
  }
}

export function deriveSessionStartRecommendation(args: {
  daysLeft: number
  mistakes: MistakeItem[]
  examMode: boolean
}): SessionStartRecommendation {
  const intensity = deriveAdaptiveIntensity(args.daysLeft, args.mistakes)
  const hasPolicyIssue = args.mistakes.some((item) => item.code === 'POLICY_BLOCKED' && item.count14d > 0)
  const hasVarIssue = args.mistakes.some(
    (item) =>
      (item.code === 'ANSWER_VAR_MISSING' || item.code === 'ANSWER_VAR_TYPE_MISMATCH') &&
      item.count14d > 0,
  )

  const base: SessionStartRecommendation =
    intensity.pace === 'INTENSIVE'
      ? {
          mode: 'Mock',
          policy: hasPolicyIssue ? 'RESTRICTED' : 'ALLOWLIST_ONLY',
          suggestedTimerMin: 80,
          focus: 'SPEED',
          reasons: ['시험 임박 또는 고위험 오류 다수', '실전 타임박스 적응 우선'],
        }
      : intensity.pace === 'BALANCED'
        ? {
            mode: args.examMode ? 'Practice+' : 'Practice',
            policy: hasPolicyIssue ? 'ALLOWLIST_ONLY' : 'OPEN',
            suggestedTimerMin: 60,
            focus: 'BALANCE',
            reasons: ['실수 교정과 실전 감각을 병행', '중간 강도 학습 권장'],
          }
        : {
            mode: 'Practice',
            policy: hasPolicyIssue ? 'ALLOWLIST_ONLY' : 'OPEN',
            suggestedTimerMin: 45,
            focus: 'ACCURACY',
            reasons: ['개념/정확도 중심 학습 구간', '템플릿/변수 정확도 우선'],
          }

  if (hasVarIssue && base.mode !== 'Mock') {
    return {
      ...base,
      mode: 'Practice+',
      policy: 'ALLOWLIST_ONLY',
      focus: 'ACCURACY',
      reasons: [...base.reasons, '답안 변수 계열 오류 보정 필요'],
    }
  }

  return base
}

export function adjustTasksByOutcomeSignals(
  tasks: DailyCurriculumTask[],
  outcome: OutcomeSignalSummary,
  daysLeft: number,
): OutcomeAdaptiveAdjustment {
  const adjusted = tasks.map((task) => ({ ...task }))
  const notes: string[] = []

  if (!adjusted.length) return { adjustedTasks: adjusted, notes }

  if (outcome.strategy === 'RECOVERY') {
    const top = outcome.topErrors[0]?.code
    adjusted[0] = {
      ...adjusted[0],
      phaseId: 'drill',
      phaseTitle: '실습/드릴',
      title: top ? `오류 복구 드릴: ${top}` : '오류 복구 드릴',
      minutes: adjusted[0].minutes + 20,
    }
    notes.push('최근 성과 하락으로 첫 일정에 복구 드릴을 배치')

    if (daysLeft <= 7 && adjusted[1]) {
      adjusted[1] = {
        ...adjusted[1],
        phaseId: 'mock',
        phaseTitle: '모의고사/리뷰',
        title: '실전 압축 모의 + 회고',
        minutes: adjusted[1].minutes + 20,
      }
      notes.push('시험 임박 구간으로 모의고사 비중을 추가 강화')
    }
  }

  if (outcome.strategy === 'ADVANCE') {
    const tailIndex = Math.min(3, adjusted.length - 1)
    adjusted[tailIndex] = {
      ...adjusted[tailIndex],
      phaseId: 'mock',
      phaseTitle: '모의고사/리뷰',
      title: '상위권 유지 모의(난도 상향)',
      minutes: adjusted[tailIndex].minutes + 10,
    }
    notes.push('최근 성과가 안정적이라 난도 상향 모의를 배치')
  }

  if (outcome.strategy === 'STABLE') {
    notes.push('기본 커리큘럼 유지, 오류 상위 항목만 점검')
  }

  return { adjustedTasks: adjusted, notes }
}

import type { PlanTask } from '@/shared/types/domain'
import type { DailyCurriculumTask } from './study-plan'

export type SprintLane = 'TODAY' | 'THIS_WEEK' | 'DONE'
export type SprintSource = 'CURRICULUM' | 'PLATFORM' | 'TEXTBOOK'

export type SprintBoardItem = {
  id: string
  title: string
  subtitle: string
  estMinutes: number
  date: string
  source: SprintSource
  lane: SprintLane
}

type SprintStorage = {
  items: SprintBoardItem[]
}

const KEY = 'aice_sprint_board_v1'
const DAY = 24 * 60 * 60 * 1000

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function diffDays(from: Date, to: Date) {
  const fromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const toDate = new Date(to.getFullYear(), to.getMonth(), to.getDate())
  return Math.floor((toDate.getTime() - fromDate.getTime()) / DAY)
}

function normalizeLaneByDate(dateKey: string): SprintLane {
  const today = new Date()
  const target = new Date(`${dateKey}T00:00:00`)
  const gap = diffDays(today, target)
  if (gap <= 0) return 'TODAY'
  return 'THIS_WEEK'
}

function mergeById(items: SprintBoardItem[]) {
  const map = new Map<string, SprintBoardItem>()
  items.forEach((item) => map.set(item.id, item))
  return Array.from(map.values())
}

export function buildDefaultSprintItems(args: {
  curriculumTasks: DailyCurriculumTask[]
  platformTasks: PlanTask[]
  pendingTextbook: Array<{ chapterId: string; title: string; estimatedMinutes: number }>
}) {
  const curriculum = args.curriculumTasks.slice(0, 8).map((task, index) => ({
    id: `cur:${task.date}:${task.phaseId}:${index}`,
    title: task.title,
    subtitle: task.phaseTitle,
    estMinutes: task.minutes,
    date: task.date,
    source: 'CURRICULUM' as const,
    lane: normalizeLaneByDate(task.date),
  }))

  const platform = args.platformTasks.slice(0, 6).map((task) => ({
    id: `plt:${task.id}`,
    title: task.title,
    subtitle: `${task.type} · ${task.status}`,
    estMinutes: task.estMinutes,
    date: task.date,
    source: 'PLATFORM' as const,
    lane: task.status === 'DONE' ? ('DONE' as const) : normalizeLaneByDate(task.date),
  }))

  const todayKey = toDateKey(new Date())
  const textbook = args.pendingTextbook.slice(0, 4).map((chapter, index) => ({
    id: `txt:${chapter.chapterId}`,
    title: `교재 보강: ${chapter.title}`,
    subtitle: '샘플문항 교재',
    estMinutes: chapter.estimatedMinutes,
    date: todayKey,
    source: 'TEXTBOOK' as const,
    lane: index === 0 ? ('TODAY' as const) : ('THIS_WEEK' as const),
  }))

  const merged = mergeById([...curriculum, ...platform, ...textbook])
  return merged.sort((a, b) => {
    if (a.lane === b.lane) return a.date.localeCompare(b.date)
    const rank: Record<SprintLane, number> = { TODAY: 0, THIS_WEEK: 1, DONE: 2 }
    return rank[a.lane] - rank[b.lane]
  })
}

export function mergeSprintBoardWithDefaults(
  currentItems: SprintBoardItem[],
  defaultItems: SprintBoardItem[] = [],
) {
  const doneSet = new Set(currentItems.filter((item) => item.lane === 'DONE').map((item) => item.id))
  const laneMap = new Map(currentItems.map((item) => [item.id, item.lane]))
  const merged = defaultItems.map((item) => ({
    ...item,
    lane: doneSet.has(item.id) ? 'DONE' : (laneMap.get(item.id) ?? item.lane),
  }))
  const customOnly = currentItems.filter((item) => !merged.some((base) => base.id === item.id))
  return mergeById([...merged, ...customOnly])
}

export function loadSprintBoard(defaultItems: SprintBoardItem[] = []) {
  const raw = localStorage.getItem(KEY)
  if (!raw) return defaultItems

  try {
    const parsed = JSON.parse(raw) as SprintStorage
    if (!Array.isArray(parsed.items)) return defaultItems
    return mergeSprintBoardWithDefaults(parsed.items, defaultItems)
  } catch {
    return defaultItems
  }
}

export function saveSprintBoard(items: SprintBoardItem[]) {
  const payload: SprintStorage = { items }
  localStorage.setItem(KEY, JSON.stringify(payload))
}

export function moveSprintItem(items: SprintBoardItem[], id: string, lane: SprintLane) {
  return items.map((item) => (item.id === id ? { ...item, lane } : item))
}

export function getSprintBoardMetrics(items: SprintBoardItem[]) {
  const todayKey = toDateKey(new Date())
  const total = items.length
  const done = items.filter((item) => item.lane === 'DONE').length
  const today = items.filter((item) => item.date === todayKey && item.lane !== 'DONE')
  const todayDone = items.filter((item) => item.date === todayKey && item.lane === 'DONE').length
  const totalMinutes = items.reduce((sum, item) => sum + item.estMinutes, 0)
  const doneMinutes = items.filter((item) => item.lane === 'DONE').reduce((sum, item) => sum + item.estMinutes, 0)

  return {
    total,
    done,
    completionRate: total ? Math.round((done / total) * 100) : 0,
    todayCount: today.length,
    todayDoneCount: todayDone,
    totalMinutes,
    doneMinutes,
    minuteCompletionRate: totalMinutes ? Math.round((doneMinutes / totalMinutes) * 100) : 0,
  }
}

export function clearSprintBoard() {
  localStorage.removeItem(KEY)
}

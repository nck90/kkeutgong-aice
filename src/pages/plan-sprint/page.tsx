import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import {
  buildDefaultSprintItems,
  clearSprintBoard,
  getSprintBoardMetrics,
  loadSprintBoard,
  mergeSprintBoardWithDefaults,
  moveSprintItem,
  saveSprintBoard,
  type SprintBoardItem,
  type SprintLane,
} from '@/shared/lib/sprint-board'
import { buildCurriculum, loadStudyGoal } from '@/shared/lib/study-plan'
import { getPendingTextbookChapters } from '@/shared/lib/textbook'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { Surface } from '@/widgets/cards/surface'

const laneTitle: Record<SprintLane, string> = {
  TODAY: '오늘 실행',
  THIS_WEEK: '이번 주 대기',
  DONE: '완료',
}

export function PlanSprintPage() {
  const goal = loadStudyGoal()
  const curriculum = useMemo(() => (goal ? buildCurriculum(goal) : null), [goal])
  const pendingTextbook = useMemo(() => getPendingTextbookChapters(3), [])
  const { data: planTasks = [] } = useQuery({
    queryKey: ['plan-sprint-platform-tasks'],
    queryFn: () => apiClient.getPlanTasks(),
  })

  const defaultItems = useMemo(
    () =>
      buildDefaultSprintItems({
        curriculumTasks: curriculum?.nextTasks ?? [],
        platformTasks: planTasks,
        pendingTextbook,
      }),
    [curriculum, planTasks, pendingTextbook],
  )

  const [items, setItems] = useState<SprintBoardItem[]>(() => loadSprintBoard())
  const boardItems = useMemo(() => mergeSprintBoardWithDefaults(items, defaultItems), [items, defaultItems])

  useEffect(() => {
    saveSprintBoard(boardItems)
  }, [boardItems])

  const metrics = useMemo(() => getSprintBoardMetrics(boardItems), [boardItems])

  const lanes = useMemo(
    () =>
      (['TODAY', 'THIS_WEEK', 'DONE'] as SprintLane[]).map((lane) => ({
        lane,
        title: laneTitle[lane],
        items: boardItems.filter((item) => item.lane === lane),
      })),
    [boardItems],
  )

  const moveItem = (id: string, lane: SprintLane) =>
    setItems((prev) => moveSprintItem(mergeSprintBoardWithDefaults(prev, defaultItems), id, lane))

  const resetBoard = () => {
    clearSprintBoard()
    setItems(defaultItems)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6">
        <h1 className="text-2xl font-bold text-slate-900">학습 스프린트 보드</h1>
        <p className="mt-2 text-sm text-slate-600">
          플랜, 교재, 실습 과제를 한 보드에서 운영하고 매일 실행률을 관리합니다.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Surface title="전체 완료율">
          <p className="text-2xl font-bold text-slate-900">{metrics.completionRate}%</p>
          <p className="mt-1 text-xs text-slate-600">
            완료 {metrics.done}/{metrics.total}
          </p>
          <Progress className="mt-3 h-2.5" value={metrics.completionRate} />
        </Surface>
        <Surface title="학습 시간 완료율">
          <p className="text-2xl font-bold text-slate-900">{metrics.minuteCompletionRate}%</p>
          <p className="mt-1 text-xs text-slate-600">
            {metrics.doneMinutes} / {metrics.totalMinutes}분
          </p>
          <Progress className="mt-3 h-2.5" value={metrics.minuteCompletionRate} />
        </Surface>
        <Surface title="오늘 우선 과제">
          <p className="text-2xl font-bold text-slate-900">{metrics.todayCount}개</p>
          <p className="mt-1 text-xs text-slate-600">
            오늘 완료 {metrics.todayDoneCount}개 · 오늘 칼럼의 과제를 먼저 처리하세요.
          </p>
          <div className="mt-3 flex gap-2">
            <Button variant="outline" className="rounded-full px-4" onClick={resetBoard}>
              보드 리셋
            </Button>
            <Button asChild className="rounded-full px-4">
              <Link to="/plan">플랜으로 이동</Link>
            </Button>
          </div>
        </Surface>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        {lanes.map((lane) => (
          <Surface key={lane.lane} title={lane.title}>
            <div className="space-y-2.5">
              {lane.items.length ? (
                lane.items.map((item) => (
                  <article key={item.id} className="rounded-xl border border-border bg-white p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <Badge variant="outline">{item.source}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{item.subtitle}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.date} · {item.estMinutes}분
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {lane.lane !== 'TODAY' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full px-3"
                          onClick={() => moveItem(item.id, 'TODAY')}
                        >
                          오늘로 이동
                        </Button>
                      ) : null}
                      {lane.lane !== 'THIS_WEEK' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full px-3"
                          onClick={() => moveItem(item.id, 'THIS_WEEK')}
                        >
                          이번주 대기로
                        </Button>
                      ) : null}
                      {lane.lane !== 'DONE' ? (
                        <Button size="sm" className="rounded-full px-3" onClick={() => moveItem(item.id, 'DONE')}>
                          완료 처리
                        </Button>
                      ) : null}
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-xl border border-dashed border-border bg-white p-4 text-sm text-slate-500">
                  이 칼럼에 과제가 없습니다.
                </p>
              )}
            </div>
          </Surface>
        ))}
      </section>
    </div>
  )
}

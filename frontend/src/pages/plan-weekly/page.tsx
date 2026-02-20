import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { summarizeOutcomeSignals } from '@/shared/lib/adaptive-feedback'
import {
  adjustTasksByOutcomeSignals,
  buildCurriculum,
  deriveAdaptiveIntensity,
  injectPendingTextbookTasks,
  loadStudyGoal,
} from '@/shared/lib/study-plan'
import { getPendingTextbookChapters, getTextbookCompletionSummary } from '@/shared/lib/textbook'
import { Badge } from '@/shared/ui/badge'
import { Progress } from '@/shared/ui/progress'
import { Surface } from '@/widgets/cards/surface'
import { apiClient } from '@/shared/api/client'

export function PlanWeeklyPage() {
  const goal = loadStudyGoal()
  const curriculum = useMemo(() => (goal ? buildCurriculum(goal) : null), [goal])
  const { data: mistakes = [] } = useQuery({ queryKey: ['mistakes'], queryFn: () => apiClient.getMistakes() })
  const intensity = useMemo(
    () => (curriculum ? deriveAdaptiveIntensity(Math.max(0, curriculum.daysLeft), mistakes) : null),
    [curriculum, mistakes],
  )
  const textbookSummary = useMemo(() => getTextbookCompletionSummary(), [])
  const pendingTextbook = useMemo(
    () => getPendingTextbookChapters(intensity?.textbookPriorityCount ?? 2),
    [intensity],
  )
  const weeklyInjected = useMemo(
    () =>
      curriculum
        ? injectPendingTextbookTasks(curriculum.nextTasks.slice(0, 7), pendingTextbook, {
            dailyBoostMin: intensity?.dailyBoostMin ?? 0,
          })
        : { adjustedTasks: [], injections: [] },
    [curriculum, pendingTextbook, intensity],
  )
  const outcome = useMemo(() => summarizeOutcomeSignals(7), [])
  const weeklyOutcomeAdjusted = useMemo(
    () =>
      curriculum
        ? adjustTasksByOutcomeSignals(
            weeklyInjected.adjustedTasks.length ? weeklyInjected.adjustedTasks : curriculum.nextTasks.slice(0, 7),
            outcome,
            Math.max(0, curriculum.daysLeft),
          )
        : { adjustedTasks: [], notes: [] },
    [curriculum, weeklyInjected.adjustedTasks, outcome],
  )
  const { data } = useQuery({ queryKey: ['plan-weekly'], queryFn: () => apiClient.getWeeklyPlanSummary() })

  if (!data) return null

  return (
    <div className="space-y-5">
      <Surface title="주간 리포트 / 플랜 조정">
        <div className="grid gap-2 md:grid-cols-3">
          <div className="rounded border p-3 text-sm">이행률: {data.adherence}%</div>
          <div className="rounded border p-3 text-sm">PASS율: {data.passRate}%</div>
          <div className="rounded border p-3 text-sm">Top Error: {data.topError}</div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {data.recommendations.map((item) => (
            <button className="rounded border border-stone-300 bg-white px-3 py-2 text-sm" key={item}>
              {item}
            </button>
          ))}
        </div>
      </Surface>

      {goal && curriculum ? (
        <Surface title="시험 대비 진행 현황">
          <div className="space-y-3">
            {curriculum.phases.map((phase) => (
              <article key={phase.id} className="rounded-xl border border-border bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{phase.title}</p>
                  <Badge variant="outline">
                    {phase.days}일 / {phase.weight}%
                  </Badge>
                </div>
                <Progress value={phase.weight} className="mt-2 h-2.5" />
              </article>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3">
            <p className="text-sm font-semibold text-slate-900">주간 보정 포인트</p>
            <p className="mt-1 text-xs text-slate-700">
              Top 오류: {mistakes[0]?.code ?? 'NONE'} · 다음 주는 드릴/교재 파트 비중을 우선 강화합니다.
            </p>
          </div>
          <div className="mt-3 rounded-xl border border-sky-100 bg-sky-50 p-3">
            <p className="text-sm font-semibold text-slate-900">
              교재 완료율 {textbookSummary.completionRate}% ({textbookSummary.completed}/{textbookSummary.total})
            </p>
            {intensity ? (
              <p className="mt-1 text-xs text-slate-700">
                강도: {intensity.pace} · 교재 우선 {intensity.textbookPriorityCount}개 · +{intensity.dailyBoostMin}분
              </p>
            ) : null}
            <div className="mt-1 space-y-1 text-xs text-slate-700">
              {weeklyInjected.injections.length ? (
                weeklyInjected.injections.map((item) => (
                  <p key={item.chapterId}>
                    - {item.targetDate}: {item.chapterTitle}
                  </p>
                ))
              ) : (
                <p>- 미완료 교재 없음, 기본 일정 유지</p>
              )}
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-violet-100 bg-violet-50 p-3">
            <p className="text-sm font-semibold text-slate-900">
              세션결과 기반 주간 전략: {outcome.strategy}
            </p>
            <p className="mt-1 text-xs text-slate-700">
              최근 {outcome.recentCount}회 · PASS율 {outcome.passRate}% · Fail성 {outcome.failLikeCount}회
            </p>
            <div className="mt-1 space-y-1 text-xs text-slate-700">
              {weeklyOutcomeAdjusted.notes.length ? (
                weeklyOutcomeAdjusted.notes.map((note) => <p key={note}>- {note}</p>)
              ) : (
                <p>- 결과 기반 추가 조정 없음</p>
              )}
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-border bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">자동 재편성된 주간 실행안</p>
            <div className="mt-2 space-y-1.5">
              {weeklyOutcomeAdjusted.adjustedTasks.slice(0, 7).map((task) => (
                <div key={`${task.date}-${task.title}`} className="rounded-lg border border-border/80 bg-slate-50 px-2.5 py-2">
                  <p className="text-xs font-semibold text-slate-800">{task.title}</p>
                  <p className="text-[11px] text-slate-600">
                    {task.date} · {task.phaseTitle} · {task.minutes}분
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Surface>
      ) : null}
    </div>
  )
}

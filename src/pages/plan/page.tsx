import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { summarizeOutcomeSignals } from '@/shared/lib/adaptive-feedback'
import {
  adjustTasksByOutcomeSignals,
  buildAdaptivePlan,
  buildCurriculum,
  calcDDay,
  deriveAdaptiveIntensity,
  formatDateLabel,
  formatDateTimeLabel,
  getExamById,
  injectPendingTextbookTasks,
  loadStudyGoal,
  resolveTargetDate,
} from '@/shared/lib/study-plan'
import {
  getPendingTextbookChapters,
  getRecommendedNextChapterId,
  getTextbookCompletionSummary,
} from '@/shared/lib/textbook'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { Surface } from '@/widgets/cards/surface'

export function PlanPage() {
  const { date } = useParams()
  const goal = loadStudyGoal()
  const targetDate = goal ? resolveTargetDate(goal) : date ?? '2026-02-27'
  const selectedDate = date ?? targetDate

  const { data = [] } = useQuery({
    queryKey: ['plan', selectedDate],
    queryFn: () => apiClient.getPlanTasks(selectedDate),
  })
  const { data: mistakes = [] } = useQuery({
    queryKey: ['mistakes'],
    queryFn: () => apiClient.getMistakes(),
  })
  const { data: history = [] } = useQuery({
    queryKey: ['history'],
    queryFn: () => apiClient.getHistory(),
  })

  const curriculum = useMemo(() => (goal ? buildCurriculum(goal) : null), [goal])
  const adaptive = useMemo(
    () => (curriculum ? buildAdaptivePlan(curriculum.nextTasks, mistakes, history) : null),
    [curriculum, mistakes, history],
  )
  const outcome = useMemo(() => summarizeOutcomeSignals(7), [])
  const intensity = useMemo(
    () => (curriculum ? deriveAdaptiveIntensity(Math.max(0, curriculum.daysLeft), mistakes) : null),
    [curriculum, mistakes],
  )
  const pendingTextbook = useMemo(
    () => getPendingTextbookChapters(intensity?.textbookPriorityCount ?? 2),
    [intensity],
  )
  const textbookInjected = useMemo(
    () =>
      adaptive
        ? injectPendingTextbookTasks(adaptive.personalizedTasks, pendingTextbook, {
            dailyBoostMin: intensity?.dailyBoostMin ?? 0,
          })
        : { adjustedTasks: [], injections: [] },
    [adaptive, pendingTextbook, intensity],
  )
  const outcomeAdjusted = useMemo(() => {
    if (!curriculum) return { adjustedTasks: [], notes: [] }
    const base =
      textbookInjected.adjustedTasks.length
        ? textbookInjected.adjustedTasks
        : adaptive?.personalizedTasks ?? curriculum.nextTasks
    return adjustTasksByOutcomeSignals(base, outcome, Math.max(0, curriculum.daysLeft))
  }, [curriculum, textbookInjected.adjustedTasks, adaptive, outcome])
  const textbookSummary = useMemo(() => getTextbookCompletionSummary(), [])
  const recommendedChapterId = useMemo(() => getRecommendedNextChapterId(), [])
  const exam = useMemo(() => getExamById(goal?.examId), [goal?.examId])
  const dDay = exam ? calcDDay(exam.startAt) : calcDDay(targetDate)

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 p-6">
        <h1 className="text-2xl font-bold text-slate-900">학습 플랜</h1>
        <p className="mt-2 text-sm text-slate-600">
          남은 기간에 맞춰 합격 확률을 끌어올리는 커리큘럼과 일정을 자동 구성합니다.
        </p>
      </div>

      {!goal ? (
        <Surface title="목표 설정 필요">
          <p className="text-sm text-slate-600">
            아직 시험/목표일 설정이 없습니다. 온보딩에서 목표를 선택하면 남은 일수 기반 플랜이 생성됩니다.
          </p>
          <div className="mt-4">
            <Button asChild className="rounded-full px-5">
              <Link to="/onboarding/schedule">목표 설정하러 가기</Link>
            </Button>
          </div>
        </Surface>
      ) : null}

      {goal && curriculum ? (
        <>
          <Surface title="합격 목표 타임라인">
            <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
              <div className="rounded-xl border border-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Target</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {goal.mode === 'exam' && exam
                    ? `${exam.title} · ${formatDateTimeLabel(exam.startAt)}`
                    : `목표 완료일 · ${formatDateLabel(`${curriculum.targetDateKey}T00:00:00+09:00`)}`}
                </p>
                <p className="mt-1 text-sm text-slate-600">D-{dDay > 0 ? dDay : 0} · Track {goal.level}</p>
                {goal.mode === 'exam' && exam ? (
                  <p className="mt-2 text-xs text-slate-500">
                    접수마감: {formatDateTimeLabel(exam.registrationEnd)} · 응시료 {exam.feeKrw.toLocaleString()}원
                  </p>
                ) : null}
              </div>
              <div className="rounded-xl border border-border bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Study Load</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">주 {goal.weeklyHours}시간</p>
                <p className="mt-1 text-sm text-slate-600">
                  {goal.preferredSlot} · 휴무일 {goal.offDay}
                </p>
                <div className="mt-3">
                  <Progress
                    value={Math.min(100, Math.round((goal.weeklyHours / 12) * 100))}
                    className="h-2.5"
                  />
                </div>
              </div>
            </div>
          </Surface>

          <Surface title="커리큘럼 로드맵">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {curriculum.phases.map((phase) => (
                <article key={phase.id} className="rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{phase.id}</p>
                  <h3 className="mt-1 text-sm font-semibold text-slate-900">{phase.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{phase.subtitle}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-700">
                    {phase.days}일 · 비중 {phase.weight}%
                  </p>
                  <div className="mt-3 space-y-1">
                    {phase.outcomes.map((outcome) => (
                      <p key={outcome} className="text-[11px] text-slate-500">
                        - {outcome}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-slate-900">샘플문항 교재화 학습 단계</p>
              <p className="mt-1 text-xs text-slate-600">
                샘플문항을 단순 풀이가 아니라 교재 챕터로 분해해 개념을 먼저 학습한 뒤 실습/모의로 연결합니다.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {curriculum.sampleTextbookChapters.map((chapter) => (
                  <Badge key={chapter} variant="outline" className="bg-white text-slate-700">
                    {chapter}
                  </Badge>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">
                    교재 완료율 {textbookSummary.completionRate}% ({textbookSummary.completed}/{textbookSummary.total})
                  </Badge>
                  <Button asChild variant="secondary" className="rounded-full px-4">
                    <Link to={recommendedChapterId ? `/textbook/${recommendedChapterId}` : '/textbook'}>
                      추천 챕터 학습
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Surface>

          <Surface title="다음 10일 실행 일정">
            {intensity ? (
              <div className="mb-3 rounded-xl border border-sky-100 bg-sky-50 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    자동 강도 프로파일: {intensity.pace}
                  </p>
                  <Badge variant="outline">+{intensity.dailyBoostMin}분/일</Badge>
                </div>
                <div className="mt-1 space-y-1 text-xs text-slate-700">
                  {intensity.reasons.map((reason) => (
                    <p key={reason}>- {reason}</p>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="space-y-2.5">
              {outcomeAdjusted.adjustedTasks.map((task) => (
                <article key={`${task.date}-${task.phaseId}`} className="rounded-xl border border-border bg-white p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{task.title}</p>
                    <Badge variant="outline">{task.phaseTitle}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-slate-600">
                    {task.date} · 권장 {task.minutes}분
                  </p>
                </article>
              ))}
            </div>
            {textbookInjected.injections.length ? (
              <div className="mt-3 rounded-xl border border-sky-100 bg-sky-50 p-3">
                <p className="text-sm font-semibold text-slate-900">교재 미완료 자동 재배치</p>
                <div className="mt-1 space-y-1 text-xs text-slate-700">
                  {textbookInjected.injections.map((item) => (
                    <p key={item.chapterId}>
                      - {item.targetDate}: {item.chapterTitle}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-3 rounded-xl border border-violet-100 bg-violet-50 p-3">
              <p className="text-sm font-semibold text-slate-900">
                세션 결과 기반 재편성: {outcome.strategy}
              </p>
              <p className="mt-1 text-xs text-slate-700">
                최근 {outcome.recentCount}회 · PASS율 {outcome.passRate}% · Fail성 {outcome.failLikeCount}회
              </p>
              <div className="mt-1 space-y-1 text-xs text-slate-700">
                {outcomeAdjusted.notes.length ? (
                  outcomeAdjusted.notes.map((note) => <p key={note}>- {note}</p>)
                ) : (
                  <p>- 결과 기반 추가 조정 없음</p>
                )}
              </div>
            </div>
          </Surface>

          <Surface title="개인화 보정 레이어 (오답/히스토리 기반)">
            <div className="space-y-2.5">
              {adaptive?.focusAreas.length ? (
                adaptive.focusAreas.map((focus) => (
                  <article key={focus.code} className="rounded-xl border border-border bg-white p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{focus.title}</p>
                      <Badge variant="outline">{focus.code}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{focus.reason}</p>
                    <p className="mt-1 text-xs font-medium text-slate-700">{focus.recommendation}</p>
                  </article>
                ))
              ) : (
                <article className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">개인화 신호 안정</p>
                  <p className="mt-1 text-xs text-slate-600">
                    최근 히스토리 기준 치명적 반복 에러가 적어 기본 커리큘럼으로 진행합니다.
                  </p>
                </article>
              )}
            </div>
          </Surface>
        </>
      ) : null}

      <Surface title={`Platform Plan Tasks · ${selectedDate}`}>
        <div className="space-y-3">
          {data.map((task) => (
            <article key={task.id} className="rounded-xl border border-border bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{task.title}</h3>
                <Badge variant={task.status === 'DONE' ? 'default' : 'outline'}>{task.status}</Badge>
              </div>
              <p className="text-sm text-slate-600">
                {task.type} · 예상 {task.estMinutes}분
              </p>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild className="rounded-full px-4">
            <Link to="/plan/sprint">실행 보드 열기</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-4">
            <Link to="/onboarding/schedule">목표/시험 재설정</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full px-4">
            <Link to="/plan/weekly">주간 리포트</Link>
          </Button>
        </div>
      </Surface>
    </div>
  )
}

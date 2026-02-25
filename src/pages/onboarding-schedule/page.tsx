import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AICE_EXAM_SESSIONS,
  buildCurriculum,
  calcDDay,
  formatDateTimeLabel,
  getExamById,
  loadStudyGoal,
  saveStudyGoal,
  type ExamTrack,
  type StudyGoal,
} from '@/shared/lib/study-plan'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { Surface } from '@/widgets/cards/surface'

const week = ['월', '화', '수', '목', '금', '토', '일']

const levelOptions: ExamTrack[] = ['Basic', 'Associate', 'Professional']

export function OnboardingSchedulePage() {
  const seed = loadStudyGoal()

  const [mode, setMode] = useState<'exam' | 'custom'>(seed?.mode ?? 'exam')
  const [examId, setExamId] = useState(seed?.examId ?? AICE_EXAM_SESSIONS[0]?.id ?? '')
  const [customTargetDate, setCustomTargetDate] = useState(seed?.customTargetDate ?? '2026-03-31')
  const [level, setLevel] = useState<ExamTrack>(seed?.level ?? 'Associate')
  const [weeklyHours, setWeeklyHours] = useState(seed?.weeklyHours ?? 8)
  const [preferredSlot, setPreferredSlot] = useState<StudyGoal['preferredSlot']>(
    seed?.preferredSlot ?? '오후 집중형',
  )
  const [offDay, setOffDay] = useState(seed?.offDay ?? '일요일')
  const [saved, setSaved] = useState(false)

  const filteredExams = useMemo(
    () => AICE_EXAM_SESSIONS.filter((item) => item.track === level),
    [level],
  )

  const selectedExam = useMemo(() => getExamById(examId), [examId])

  const previewGoal = useMemo<StudyGoal>(
    () => ({
      mode,
      examId: mode === 'exam' ? examId : undefined,
      customTargetDate: mode === 'custom' ? customTargetDate : undefined,
      level,
      weeklyHours,
      preferredSlot,
      offDay,
    }),
    [mode, examId, customTargetDate, level, weeklyHours, preferredSlot, offDay],
  )

  const curriculum = useMemo(() => buildCurriculum(previewGoal), [previewGoal])
  const dDay = mode === 'exam' && selectedExam ? calcDDay(selectedExam.startAt) : curriculum.daysLeft

  const save = () => {
    saveStudyGoal(previewGoal)
    setSaved(true)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Onboarding 2 / 3</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">시험 목표 기반 학습 스케줄 생성</h1>
        <p className="mt-2 text-sm text-slate-600">
          정기시험을 선택하면 남은 기간에 맞춰 합격형 커리큘럼을 자동 생성하고, 시험을 안 고르면 목표일까지 역산해 생성합니다.
        </p>
      </div>

      <Surface title="목표 선택">
        <div className="grid gap-3 md:grid-cols-3">
          {levelOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLevel(option)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                level === option
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-border bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <p className="text-xs uppercase tracking-wide opacity-80">Track</p>
              <p className="mt-1 text-sm font-semibold">{option}</p>
            </button>
          ))}
        </div>

        <div className="mt-4 inline-flex rounded-full border border-border bg-white p-1">
          <button
            type="button"
            onClick={() => setMode('exam')}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${mode === 'exam' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            정기시험 선택
          </button>
          <button
            type="button"
            onClick={() => setMode('custom')}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${mode === 'custom' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
          >
            목표일 직접 입력
          </button>
        </div>

        {mode === 'exam' ? (
          <div className="mt-4 space-y-2">
            {filteredExams.map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => setExamId(exam.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  examId === exam.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-border bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {exam.title} · {formatDateTimeLabel(exam.startAt)}
                  </p>
                  <Badge variant={examId === exam.id ? 'secondary' : 'outline'}>{exam.statusLabel}</Badge>
                </div>
                <p className={`mt-1 text-xs ${examId === exam.id ? 'text-slate-200' : 'text-slate-500'}`}>
                  접수: {formatDateTimeLabel(exam.registrationStart)} ~ {formatDateTimeLabel(exam.registrationEnd)} ·{' '}
                  {exam.feeKrw.toLocaleString()}원
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-slate-700">
              목표 완료일
              <input
                className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm"
                type="date"
                value={customTargetDate}
                onChange={(event) => setCustomTargetDate(event.target.value)}
              />
            </label>
          </div>
        )}
      </Surface>

      <Surface title="학습 시간/리듬 설정">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            주간 총 학습시간
            <input
              className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm"
              type="number"
              min={3}
              max={40}
              value={weeklyHours}
              onChange={(event) => setWeeklyHours(Number(event.target.value))}
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            선호 시간대
            <select
              className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm"
              value={preferredSlot}
              onChange={(event) => setPreferredSlot(event.target.value as StudyGoal['preferredSlot'])}
            >
              <option>오전 집중형</option>
              <option>오후 집중형</option>
              <option>야간 집중형</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            휴무일
            <input
              className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm"
              type="text"
              value={offDay}
              onChange={(event) => setOffDay(event.target.value)}
            />
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">남은 기간 기반 주간 분배 프리뷰</h3>
            <span className="text-xs text-slate-500">D-{dDay > 0 ? dDay : 0}</span>
          </div>
          <div className="space-y-2.5">
            {week.map((day, index) => {
              const value = index === 6 ? 0 : index >= 4 ? 16 : 18
              return (
                <div key={day} className="grid grid-cols-[22px_1fr_48px] items-center gap-3 text-xs">
                  <span className="font-semibold text-slate-500">{day}</span>
                  <Progress value={value} className="h-2.5" />
                  <span className="text-right text-slate-600">{value * Math.max(3, weeklyHours)}m</span>
                </div>
              )
            })}
          </div>
        </div>
      </Surface>

      <Surface title="자동 커리큘럼 프리뷰 (핵심 포인트)">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {curriculum.phases.map((phase) => (
            <article key={phase.id} className="rounded-xl border border-border bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{phase.id}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{phase.title}</p>
              <p className="mt-1 text-xs text-slate-600">{phase.subtitle}</p>
              <p className="mt-2 text-xs font-semibold text-slate-700">
                {phase.days}일 · 비중 {phase.weight}%
              </p>
            </article>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 p-4">
          <p className="text-sm font-semibold text-slate-900">샘플문항 교재화 챕터</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {curriculum.sampleTextbookChapters.map((chapter) => (
              <Badge key={chapter} variant="outline" className="bg-white text-slate-700">
                {chapter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs text-slate-500">
            {saved ? '저장 완료: Plan 화면에서 바로 생성된 일정 확인 가능' : '설정 저장 후 Plan 화면에서 일정/커리큘럼 확인'}
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="secondary" className="rounded-full px-5">
              <Link to="/textbook">교재 먼저 보기</Link>
            </Button>
            <Button variant="outline" className="rounded-full px-5" onClick={save}>
              플랜 생성/저장
            </Button>
            <Button asChild className="rounded-full px-5">
              <Link to="/plan">바로 플랜 보기</Link>
            </Button>
          </div>
        </div>
      </Surface>

      <div className="flex items-center justify-between">
        <Button asChild variant="outline" className="rounded-full px-5">
          <Link to="/onboarding/profile">이전</Link>
        </Button>
        <Button asChild className="rounded-full px-5">
          <Link to="/onboarding/policy">다음: 시험 정책 설정</Link>
        </Button>
      </div>
    </div>
  )
}

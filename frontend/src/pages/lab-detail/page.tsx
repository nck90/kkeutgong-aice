import { useQuery } from '@tanstack/react-query'
import { BookOpenCheck, Clock3, Flag, Play, Sparkles, Target } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import {
  calcDDay,
  deriveSessionStartRecommendation,
  loadStudyGoal,
  resolveTargetDate,
} from '@/shared/lib/study-plan'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function LabDetailPage() {
  const { labId } = useParams()
  const navigate = useNavigate()

  const { data: lab, isLoading } = useQuery({
    queryKey: ['lab', labId],
    queryFn: () => apiClient.getLabById(labId!),
  })
  const { data: mistakes = [] } = useQuery({
    queryKey: ['mistakes'],
    queryFn: () => apiClient.getMistakes(),
  })

  const goal = loadStudyGoal()
  const targetDate = goal ? resolveTargetDate(goal) : '2026-02-27'
  const dDay = calcDDay(targetDate)

  if (isLoading) return <div className="p-8 text-center text-slate-500">코스 정보를 불러오는 중입니다...</div>
  if (!lab) return <div className="p-8 text-center text-slate-500">코스를 찾을 수 없습니다.</div>

  const recommendation = deriveSessionStartRecommendation({
    daysLeft: Math.max(0, dDay),
    mistakes,
    examMode: lab.examMode,
  })

  return (
    <div className="space-y-6 pb-10">
      <section className="rounded-3xl border border-slate-900/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 text-white md:p-9">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-white/15 text-white">
            {lab.difficulty}
          </Badge>
          <Badge variant={lab.examMode ? 'default' : 'outline'} className="border-white/30 bg-white/10 text-white">
            {lab.examMode ? '실전 모의고사' : '실습 코스'}
          </Badge>
          {lab.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/20 px-2.5 py-1 text-[11px] text-slate-200">
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">{lab.title}</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">{lab.goal}</p>

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-200">
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4" />
            예상 {lab.time}분
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpenCheck className="h-4 w-4" />
            {lab.steps} 단계 구성
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Target className="h-4 w-4" />
            PASS 기준 제출
          </span>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          <Button
            size="lg"
            className="rounded-full bg-white px-6 font-semibold text-slate-900 hover:bg-slate-100"
            onClick={() => navigate(`/labs/${lab.id}/start`)}
          >
            <Play className="mr-1 h-4 w-4" />
            세션 시작
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/35 bg-transparent px-6 text-white hover:bg-white/10"
            onClick={() => navigate('/explore')}
          >
            다른 코스 보기
          </Button>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">학습 단계 로드맵</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: lab.steps }).map((_, index) => (
              <article key={index} className="rounded-xl border border-border bg-white px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">Step {index + 1}. 실습 단계</h3>
                    <p className="text-sm text-slate-600">전처리/학습/검증 순으로 진행합니다.</p>
                  </div>
                  <Badge variant="outline">필수</Badge>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-2xl border-border/80 bg-white/90">
            <CardHeader>
              <CardTitle className="text-lg">평가 규칙</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p className="inline-flex items-center gap-2">
                <Flag className="h-4 w-4 text-sky-700" />
                제출 변수 정확성 검증
              </p>
              <p className="inline-flex items-center gap-2">
                <Flag className="h-4 w-4 text-sky-700" />
                정책 위반 코드 차단
              </p>
              <p className="inline-flex items-center gap-2">
                <Flag className="h-4 w-4 text-sky-700" />
                PASS/FAIL/PARTIAL 피드백
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-sky-100 bg-gradient-to-b from-sky-50 to-white">
            <CardHeader>
              <CardTitle className="text-lg">추천 학습 팁</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="inline-flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 text-sky-700" />
                실행 전에 답안 변수명(`answerXX`)을 먼저 선언하면 오류율이 크게 줄어듭니다.
              </p>
              <div className="mt-3 rounded-xl border border-sky-100 bg-white p-3">
                <p className="text-xs font-semibold text-slate-500">추천 세션 시작값</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {recommendation.mode} / {recommendation.policy}
                </p>
                <p className="text-xs text-slate-600">
                  D-{Math.max(0, dDay)} 기준 · 집중 {recommendation.focus}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

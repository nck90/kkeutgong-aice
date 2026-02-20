import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { ArrowRight, ChartNoAxesCombined, CircleAlert, Clock3, Rocket, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import {
  clearOutcomeEvents,
  summarizeOutcomeByMode,
  summarizeOutcomeSignals,
  summarizeOutcomeTrend,
} from '@/shared/lib/adaptive-feedback'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Progress } from '@/shared/ui/progress'

export function DashboardPage() {
  const [, forceRefresh] = useState(0)
  const { data: history = [] } = useQuery({ queryKey: ['history'], queryFn: apiClient.getHistory })
  const { data: summary } = useQuery({ queryKey: ['weekly-summary'], queryFn: apiClient.getWeeklyPlanSummary })
  const { data: labs = [] } = useQuery({ queryKey: ['labs'], queryFn: apiClient.getLabs })
  const outcomeSummary = summarizeOutcomeSignals(7)
  const trend = summarizeOutcomeTrend(7)
  const modeBreakdown = summarizeOutcomeByMode(14)

  const focusLabs = labs.slice(0, 3)

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-3xl p-7 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">Learner Command Center</p>
            <h1 className="mt-2 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              AICE 실전 대비를 위한 학습 운영 대시보드
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 md:text-base">
              오늘의 우선 과제와 반복 오류를 기준으로 자동 플랜이 조정됩니다.
              지금 필요한 과제부터 바로 시작하세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild className="rounded-full px-5">
              <Link to="/labs">
                실습 코스 탐색
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="rounded-full px-5">
              <Link to="/plan/sprint">스프린트 보드</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link to="/plan">오늘 플랜 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="주간 준수율"
          value={`${summary?.adherence ?? 0}%`}
          caption="학습 리듬 안정화"
          progress={summary?.adherence ?? 0}
          icon={<Target className="h-4 w-4 text-slate-400" />}
        />
        <MetricCard
          title="실습 통과율"
          value={`${summary?.passRate ?? 0}%`}
          caption="최근 14일 기준"
          progress={summary?.passRate ?? 0}
          icon={<Rocket className="h-4 w-4 text-slate-400" />}
        />
        <MetricCard
          title="집중 학습 시간"
          value="12h 40m"
          caption="이번 주 누적"
          progress={74}
          icon={<Clock3 className="h-4 w-4 text-slate-400" />}
        />
        <MetricCard
          title="교정 필요 항목"
          value={summary?.topError ?? 'N/A'}
          caption="반복 오류 상위"
          progress={42}
          icon={<CircleAlert className="h-4 w-4 text-slate-400" />}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-xl">적응형 신호(최근 7일)</CardTitle>
            <Badge variant="outline">
              {outcomeSummary.strategy} · PASS {outcomeSummary.passRate}%
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-2">
              {trend.length ? (
                trend.map((point) => {
                  const total = point.pass + point.partial + point.fail + point.error
                  const passRate = total ? Math.round((point.pass / total) * 100) : 0
                  return (
                    <article key={point.date} className="rounded-xl border border-border bg-white p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-900">{point.date}</p>
                        <p className="text-xs text-slate-500">PASS {passRate}%</p>
                      </div>
                      <Progress value={passRate} className="mt-2 h-2" />
                      <p className="mt-1 text-xs text-slate-600">
                        pass {point.pass} / partial {point.partial} / fail {point.fail} / error {point.error}
                      </p>
                    </article>
                  )
                })
              ) : (
                <p className="text-sm text-slate-500">세션 결과 데이터가 아직 없습니다.</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">모드별 성과</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modeBreakdown.map((row) => (
              <article key={row.mode} className="rounded-xl border border-border bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{row.mode}</p>
                  <Badge variant="outline">{row.total}회</Badge>
                </div>
                <p className="mt-1 text-xs text-slate-600">PASS율 {row.passRate}%</p>
              </article>
            ))}
            <Button
              variant="outline"
              className="mt-2 w-full rounded-full"
              onClick={() => {
                clearOutcomeEvents()
                forceRefresh((prev) => prev + 1)
              }}
            >
              로컬 적응 데이터 초기화
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-xl">우선 실행 과제</CardTitle>
            <Button asChild size="sm" variant="outline" className="rounded-full">
              <Link to="/classes">전체 보기</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {focusLabs.map((lab) => (
              <article key={lab.id} className="rounded-xl border border-border bg-white p-4 transition hover:border-slate-300">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">{lab.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{lab.goal}</p>
                  </div>
                  <Badge variant={lab.examMode ? 'default' : 'outline'}>
                    {lab.examMode ? 'Mock Friendly' : 'Practice'}
                  </Badge>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{lab.steps} Steps</span>
                  <span>예상 {lab.time}분</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Progress value={42} className="h-2 w-[70%]" />
                  <Button asChild size="sm" className="rounded-full px-4">
                    <Link to={`/aice/labs/${lab.id}/start`}>진입</Link>
                  </Button>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">최근 제출 로그</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.slice(0, 6).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between rounded-lg border border-border/70 bg-white px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{entry.mode}</p>
                  <p className="text-xs text-slate-500">{entry.date}</p>
                </div>
                <Badge variant={entry.result === 'PASS' ? 'default' : entry.result === 'FAIL' ? 'destructive' : 'secondary'}>
                  {entry.result}
                </Badge>
              </div>
            ))}
            <Button asChild variant="ghost" className="mt-2 w-full rounded-xl">
              <Link to="/history">
                히스토리 열기
                <ChartNoAxesCombined className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function MetricCard({
  title,
  value,
  caption,
  progress,
  icon,
}: {
  title: string
  value: string
  caption: string
  progress: number
  icon: React.ReactNode
}) {
  return (
    <Card className="rounded-2xl border-border/80 bg-white/90">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold text-slate-600">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{caption}</p>
        <Progress value={progress} className="mt-3 h-2" />
      </CardContent>
    </Card>
  )
}

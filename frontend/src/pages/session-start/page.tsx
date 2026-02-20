import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { sessionStartSchema, type SessionStartForm } from '@/features/session/sessionStartSchema'
import { apiClient } from '@/shared/api/client'
import {
  calcDDay,
  deriveSessionStartRecommendation,
  loadStudyGoal,
  resolveTargetDate,
} from '@/shared/lib/study-plan'
import { toast } from '@/shared/lib/toast'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Surface } from '@/widgets/cards/surface'

export function SessionStartPage() {
  const navigate = useNavigate()
  const { labId = 'lab-pipeline-01' } = useParams()

  const goal = loadStudyGoal()
  const targetDate = goal ? resolveTargetDate(goal) : '2026-02-27'
  const dDay = calcDDay(targetDate)

  const { data: lab } = useQuery({
    queryKey: ['lab', labId],
    queryFn: () => apiClient.getLabById(labId),
  })
  const { data: mistakes = [] } = useQuery({
    queryKey: ['mistakes'],
    queryFn: () => apiClient.getMistakes(),
  })

  const recommendation = useMemo(
    () =>
      deriveSessionStartRecommendation({
        daysLeft: Math.max(0, dDay),
        mistakes,
        examMode: lab?.examMode ?? true,
      }),
    [dDay, mistakes, lab?.examMode],
  )

  const form = useForm<SessionStartForm>({
    resolver: zodResolver(sessionStartSchema),
    defaultValues: {
      mode: recommendation.mode,
      policy: recommendation.policy,
      consent: false,
    },
  })

  useEffect(() => {
    form.setValue('mode', recommendation.mode)
    form.setValue('policy', recommendation.policy)
  }, [form, recommendation.mode, recommendation.policy])

  const startMutation = useMutation({
    mutationFn: async (values: SessionStartForm) => apiClient.startSession({ labId, ...values }),
    onSuccess: ({ sessionId }) => {
      navigate(`/learning/session/${sessionId}`)
    },
    onError: (error) => {
      toast({
        tone: 'error',
        title: '세션 생성 실패',
        description: error.message,
      })
    },
  })

  const applyRecommendation = () => {
    form.setValue('mode', recommendation.mode)
    form.setValue('policy', recommendation.policy)
    toast({
      tone: 'success',
      title: '추천 설정 적용',
      description: `${recommendation.mode} / ${recommendation.policy}로 설정했습니다.`,
    })
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 p-6">
        <h1 className="text-2xl font-bold text-slate-900">세션 시작 / 전략 추천</h1>
        <p className="mt-2 text-sm text-slate-600">
          D-day와 최근 오류 패턴을 바탕으로 이번 세션의 권장 모드/정책을 제안합니다.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline">D-{Math.max(0, dDay)}</Badge>
          <Badge variant="secondary">Focus {recommendation.focus}</Badge>
          <Badge variant="outline">Timer {recommendation.suggestedTimerMin}m</Badge>
        </div>
      </div>

      <Surface title="권장 세션 프로파일">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <Card className="rounded-2xl border-border/80 bg-white/90">
            <CardHeader>
              <CardTitle className="text-lg">추천 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                - Mode: <span className="font-semibold">{recommendation.mode}</span>
              </p>
              <p>
                - Policy: <span className="font-semibold">{recommendation.policy}</span>
              </p>
              <p>
                - 권장 집중 시간: <span className="font-semibold">{recommendation.suggestedTimerMin}분</span>
              </p>
              <div className="pt-2">
                {recommendation.reasons.map((reason) => (
                  <p key={reason} className="text-xs text-slate-600">
                    - {reason}
                  </p>
                ))}
              </div>
              <Button variant="secondary" className="mt-2 rounded-full px-4" onClick={applyRecommendation}>
                추천 설정 적용
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border/80 bg-white/90">
            <CardHeader>
              <CardTitle className="text-lg">실행 전 체크리스트</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-sm text-slate-700">
              <p>- 답안 변수 템플릿 선언</p>
              <p>- 허용 문서/정책 범위 확인</p>
              <p>- 실행시간 병목 구간 점검</p>
              <p>- 제출 전 type/변수 검증</p>
            </CardContent>
          </Card>
        </div>
      </Surface>

      <Surface title="세션 생성">
        <form className="grid gap-4" onSubmit={form.handleSubmit((values) => startMutation.mutate(values))}>
          <label className="grid gap-1 text-sm">
            Mode
            <select className="rounded-xl border border-border bg-white p-2.5" {...form.register('mode')}>
              <option value="Practice">Practice</option>
              <option value="Practice+">Practice+</option>
              <option value="Mock">Mock</option>
            </select>
          </label>

          <label className="grid gap-1 text-sm">
            Policy
            <select className="rounded-xl border border-border bg-white p-2.5" {...form.register('policy')}>
              <option value="OPEN">OPEN</option>
              <option value="ALLOWLIST_ONLY">ALLOWLIST_ONLY</option>
              <option value="RESTRICTED">RESTRICTED</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...form.register('consent')} /> 규칙을 읽고 이해했습니다
          </label>
          {form.formState.errors.consent ? (
            <p className="text-sm text-red-600">{form.formState.errors.consent.message}</p>
          ) : null}

          <Button className="w-fit rounded-full px-5" disabled={startMutation.isPending}>
            {startMutation.isPending ? '세션 생성 중...' : '세션 시작'}
          </Button>
        </form>
      </Surface>
    </div>
  )
}

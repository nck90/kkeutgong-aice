import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSessionPlayer } from '@/entities/session/model/useSessionPlayer'
import { useSessionTimer } from '@/entities/session/model/useSessionTimer'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'
import { PolicyBlockedDialog } from '@/widgets/modal/policyBlockedDialog'

export function SessionPage() {
  const { sessionId = 'demo-001' } = useParams()
  const navigate = useNavigate()

  const { data } = useQuery({ queryKey: ['session', sessionId], queryFn: () => apiClient.getSession(sessionId) })
  const { steps, openStep, progress, hydrateSteps } = useSessionPlayer(data?.steps ?? [])
  const { seconds, formatted } = useSessionTimer(data?.timerSec ?? 0, data?.mode === 'Mock')
  const [code, setCode] = useState('answer02 = df.fillna(0)')
  const [policyError, setPolicyError] = useState('')

  useEffect(() => {
    if (data?.steps?.length) hydrateSteps(data.steps)
  }, [data?.steps, hydrateSteps])

  useEffect(() => {
    if (data?.mode === 'Mock' && seconds === 0) {
      navigate(`/aice/mock/session/${sessionId}/result`)
    }
  }, [data?.mode, navigate, seconds, sessionId])

  const submitMutation = useMutation({
    mutationFn: () => apiClient.submitStep(sessionId, code),
    onSuccess: (result) => {
      if (result.errorCodes.includes('POLICY_BLOCKED')) {
        setPolicyError('POLICY_BLOCKED')
        return
      }
      hydrateSteps(result.nextSteps)
    },
  })

  if (!data) return null

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-3">
        <Surface title={`세션 ${sessionId}`} right={<span className="text-sm">진행률 {progress}%</span>}>
          <ul className="space-y-2 text-sm">
            {steps.map((step) => (
              <li key={step.no} className="rounded border p-2">
                Step {step.no} · {step.title} · {step.state}
              </li>
            ))}
          </ul>
        </Surface>
        <Surface title="문제/코드" right={<span className="text-xs text-stone-600">Mode: {data.mode}</span>}>
          <label className="mb-2 block text-sm font-medium" htmlFor="editor">
            답안 코드
          </label>
          <textarea
            id="editor"
            aria-label="답안 코드 에디터"
            className="h-60 w-full rounded-md border border-stone-300 p-2 font-mono text-sm"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          {data.mode === 'Mock' ? <p className="mt-2 text-sm text-stone-600">남은 시간: {formatted}</p> : null}
        </Surface>
        <Surface title="채점/피드백">
          <p className="mb-2 text-sm">필수 변수: {openStep?.requiredVars.join(', ') ?? '-'}</p>
          <div className="flex flex-wrap gap-2">
            <button
              className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white"
              onClick={() => submitMutation.mutate()}
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? '제출 중...' : '스텝 제출'}
            </button>
            <Link className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm" to={`/aice/session/${sessionId}/review`}>
              리뷰 이동
            </Link>
          </div>
        </Surface>
      </div>

      <PolicyBlockedDialog open={Boolean(policyError)} errorCode={policyError} onClose={() => setPolicyError('')} />
    </>
  )
}

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useSessionPlayer } from '@/entities/session/model/useSessionPlayer'
import { mockApi } from '@/shared/api/mockApi'
import { Surface } from '@/widgets/cards/surface'

export function SessionPage() {
  const { sessionId = 'demo-001' } = useParams()
  const { data } = useQuery({ queryKey: ['session', sessionId], queryFn: () => mockApi.getSession(sessionId) })
  const { steps, openStep, progress, submitOpenStep } = useSessionPlayer(data?.steps ?? [])

  if (!data) return null

  return (
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
      <Surface title="문제/코드">
        <textarea className="h-60 w-full rounded-md border border-stone-300 p-2 font-mono text-sm" defaultValue={'answer02 = df.fillna(0)'} />
      </Surface>
      <Surface title="채점/피드백">
        <p className="mb-3 text-sm">필수 변수: {openStep?.requiredVars.join(', ')}</p>
        <button className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white" onClick={submitOpenStep}>
          스텝 제출
        </button>
      </Surface>
    </div>
  )
}

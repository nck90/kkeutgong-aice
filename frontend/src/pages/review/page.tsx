import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function ReviewPage() {
  const { sessionId = 'demo-001' } = useParams()
  const { data } = useQuery({ queryKey: ['review', sessionId], queryFn: () => apiClient.getSessionReview(sessionId) })

  if (!data) return null

  return (
    <Surface title={`세션 리뷰 - ${sessionId}`}>
      <p className="mb-2 text-sm">PASS: {data.passCount} / FAIL: {data.failCount}</p>
      <p className="mb-3 text-sm">Top Error: {data.topErrorCode}</p>
      <ul className="space-y-2 text-sm">
        {data.stepTimeline.map((item) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={item.stepNo}>
            Step {item.stepNo} · {item.state} · {item.elapsedSec}s
          </li>
        ))}
      </ul>
    </Surface>
  )
}

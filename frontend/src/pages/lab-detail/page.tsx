import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function LabDetailPage() {
  const { labId = 'lab-pipeline-01' } = useParams()
  const { data } = useQuery({ queryKey: ['lab-detail', labId], queryFn: () => apiClient.getLabById(labId) })

  if (!data) return null

  return (
    <div className="grid gap-4">
      <Surface title={data.title} right={<span className="text-xs">난이도: {data.difficulty}</span>}>
        <p className="text-sm text-stone-700">{data.goal}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span className="rounded-full border border-stone-300 px-2 py-1 text-xs" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </Surface>
      <Surface title="AICE 규칙">
        <ul className="space-y-1 text-sm">
          <li>답안 변수명 체크</li>
          <li>지정 셀 외 작성 제한</li>
          <li>참고 제한 정책 지원</li>
        </ul>
        <Link className="mt-3 inline-block rounded-md bg-stone-900 px-3 py-2 text-sm text-white" to={`/aice/labs/${labId}/start`}>
          세션 시작
        </Link>
      </Surface>
    </div>
  )
}

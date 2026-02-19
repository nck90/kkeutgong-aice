import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function ReferenceViewerPage() {
  const { docId = 'pd-merge' } = useParams()
  const { data } = useQuery({ queryKey: ['reference-doc', docId], queryFn: () => apiClient.getReferenceDocById(docId) })
  if (!data) return null

  return (
    <Surface title={`문서 뷰어 - ${data.title}`}>
      <p className="text-sm">카테고리: {data.category}</p>
      <p className="mt-2 text-sm">허용 여부: {data.allowed ? '허용' : '차단'}</p>
      <article className="mt-3 rounded border border-stone-200 bg-stone-50 p-3 text-sm text-stone-700">
        내장 문서 뷰어 더미 콘텐츠입니다. 실제 연동 시 markdown/pdf 렌더러로 교체합니다.
      </article>
    </Surface>
  )
}

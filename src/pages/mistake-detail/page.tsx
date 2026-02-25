import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function MistakeDetailPage() {
  const { errorCode = 'ANSWER_VAR_MISSING' } = useParams()
  const { data } = useQuery({ queryKey: ['mistake', errorCode], queryFn: () => apiClient.getMistakeByCode(errorCode) })

  if (!data) return null

  return (
    <Surface title={`실수 상세 - ${data.code}`}>
      <p className="text-sm">설명: {data.description}</p>
      <p className="mt-2 text-sm">치명도: {data.severity} · 최근 14일: {data.count14d}회</p>
      <button className="mt-3 rounded-md bg-stone-900 px-3 py-2 text-sm text-white">교정 드릴 플랜에 추가</button>
    </Surface>
  )
}

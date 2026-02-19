import { useParams } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

export function AdminLabEditPage() {
  const { labId = 'new' } = useParams()
  return (
    <Surface title={`관리자 Lab 편집 - ${labId}`}>
      <div className="flex flex-wrap gap-2 text-sm">
        <button className="rounded border border-stone-300 bg-white px-3 py-2">메타</button>
        <button className="rounded border border-stone-300 bg-white px-3 py-2">시험지 템플릿</button>
        <button className="rounded border border-stone-300 bg-white px-3 py-2">스텝</button>
        <button className="rounded border border-stone-300 bg-white px-3 py-2">채점</button>
      </div>
    </Surface>
  )
}

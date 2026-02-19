import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function LabsPage() {
  const { data = [] } = useQuery({ queryKey: ['labs'], queryFn: apiClient.getLabs })

  return (
    <Surface title="실습 Labs">
      <div className="grid gap-2 md:grid-cols-2">
        {data.map((lab) => (
          <article key={lab.id} className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <h3 className="font-semibold">{lab.title}</h3>
            <p className="text-sm text-stone-600">{lab.goal}</p>
            <Link className="mt-2 inline-block text-sm underline" to={`/aice/labs/${lab.id}`}>
              상세 보기
            </Link>
          </article>
        ))}
      </div>
    </Surface>
  )
}

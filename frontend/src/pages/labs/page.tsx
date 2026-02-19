import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/shared/api/mockApi'
import { Surface } from '@/widgets/cards/surface'

export function LabsPage() {
  const { data = [] } = useQuery({ queryKey: ['labs'], queryFn: mockApi.getLabs })

  return (
    <Surface title="실습 Labs">
      <div className="grid gap-2 md:grid-cols-2">
        {data.map((lab) => (
          <article key={lab.id} className="rounded-md border border-stone-200 bg-stone-50 p-3">
            <h3 className="font-semibold">{lab.title}</h3>
            <p className="text-sm text-stone-600">{lab.goal}</p>
          </article>
        ))}
      </div>
    </Surface>
  )
}

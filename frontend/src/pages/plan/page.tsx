import { useQuery } from '@tanstack/react-query'
import { mockApi } from '@/shared/api/mockApi'
import { Surface } from '@/widgets/cards/surface'

export function PlanPage() {
  const { data = [] } = useQuery({ queryKey: ['plan', '2026-02-19'], queryFn: () => mockApi.getPlanTasks('2026-02-19') })

  return (
    <Surface title="내 플랜">
      <ul className="space-y-2">
        {data.map((task) => (
          <li key={task.id} className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
            {task.type} · {task.title} · {task.estMinutes}분 · {task.status}
          </li>
        ))}
      </ul>
    </Surface>
  )
}

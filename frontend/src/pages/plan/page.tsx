import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function PlanPage() {
  const { date } = useParams()
  const selectedDate = date ?? '2026-02-19'
  const { data = [] } = useQuery({ queryKey: ['plan', selectedDate], queryFn: () => apiClient.getPlanTasks(selectedDate) })

  return (
    <Surface title={`내 플랜 (${selectedDate})`}>
      <ul className="space-y-2">
        {data.map((task) => (
          <li key={task.id} className="rounded-md border border-stone-200 bg-stone-50 p-3 text-sm">
            {task.type} · {task.title} · {task.estMinutes}분 · {task.status}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link className="rounded border border-stone-300 bg-white px-3 py-2 text-sm" to="/aice/plan/day/2026-02-20">
          2026-02-20 보기
        </Link>
        <Link className="rounded border border-stone-300 bg-white px-3 py-2 text-sm" to="/aice/plan/weekly">
          주간 리포트
        </Link>
      </div>
    </Surface>
  )
}

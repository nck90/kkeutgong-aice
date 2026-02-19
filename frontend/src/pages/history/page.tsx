import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function HistoryPage() {
  const { data = [] } = useQuery({ queryKey: ['history'], queryFn: () => apiClient.getHistory() })

  return (
    <Surface title="학습 히스토리">
      <ul className="space-y-2 text-sm">
        {data.map((entry) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={entry.id}>
            {entry.date} · {entry.mode} · {entry.result} {entry.errorCode ? `· ${entry.errorCode}` : ''}
          </li>
        ))}
      </ul>
    </Surface>
  )
}

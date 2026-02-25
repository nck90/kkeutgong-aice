import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function MistakesPage() {
  const { data = [] } = useQuery({ queryKey: ['mistakes'], queryFn: () => apiClient.getMistakes() })

  return (
    <Surface title="실수 교정">
      <ul className="space-y-2 text-sm">
        {data.map((item) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={item.code}>
            {item.code} · severity={item.severity} · 14일={item.count14d}{' '}
            <Link className="underline" to={`/aice/mistakes/${item.code}`}>
              상세
            </Link>
          </li>
        ))}
      </ul>
    </Surface>
  )
}

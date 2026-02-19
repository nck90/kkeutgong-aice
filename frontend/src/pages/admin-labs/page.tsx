import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function AdminLabsPage() {
  const { data = [] } = useQuery({ queryKey: ['admin-labs'], queryFn: () => apiClient.getAdminLabs() })

  return (
    <Surface title="관리자 Labs 목록">
      <ul className="space-y-2 text-sm">
        {data.map((lab) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={lab.id}>
            {lab.title} · {lab.status} · v{lab.version} · {lab.updatedAt}{' '}
            <Link className="underline" to={`/admin/labs/${lab.id}`}>
              편집
            </Link>
          </li>
        ))}
      </ul>
    </Surface>
  )
}

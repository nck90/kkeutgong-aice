import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function ReferencePage() {
  const { data = [] } = useQuery({ queryKey: ['reference-docs'], queryFn: () => apiClient.getReferenceDocs() })

  return (
    <Surface title="허용문서 목록">
      <ul className="space-y-2 text-sm">
        {data.map((doc) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={doc.id}>
            {doc.title} · {doc.allowed ? '허용' : '차단'} ·{' '}
            <Link className="underline" to={`/aice/reference/${doc.id}`}>
              열기
            </Link>
          </li>
        ))}
      </ul>
    </Surface>
  )
}

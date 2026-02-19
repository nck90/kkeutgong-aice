import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function AdminPolicyPage() {
  const { data = [] } = useQuery({ queryKey: ['admin-policy'], queryFn: () => apiClient.getPolicyRules() })

  return (
    <Surface title="정책 관리">
      <ul className="space-y-2 text-sm">
        {data.map((rule) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={rule.id}>
            {rule.mode} · hint={rule.hintLevel} · retry={rule.retryLimit}
          </li>
        ))}
      </ul>
    </Surface>
  )
}

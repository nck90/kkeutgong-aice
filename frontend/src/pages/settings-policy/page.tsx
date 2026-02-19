import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function SettingsPolicyPage() {
  const { data = [] } = useQuery({ queryKey: ['policy-rules'], queryFn: () => apiClient.getPolicyRules() })

  return (
    <Surface title="설정 - 정책/모드">
      <ul className="space-y-2 text-sm">
        {data.map((rule) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={rule.id}>
            {rule.mode} · reference={rule.allowReference} · hint={rule.hintLevel} · retry={rule.retryLimit} · time={rule.timeLimitMin}m
          </li>
        ))}
      </ul>
    </Surface>
  )
}

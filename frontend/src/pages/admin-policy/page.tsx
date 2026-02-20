import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function AdminPolicyPage() {
  const { data = [] } = useQuery({ queryKey: ['admin-policy'], queryFn: () => apiClient.getPolicyRules() })

  return (
    <AdminShell title="Policy Rules" subtitle="모드별 제한 정책과 힌트/재시도 규칙을 운영합니다.">
      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle>Policy Matrix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.map((rule) => (
            <article key={rule.id} className="grid gap-2 rounded-xl border border-border bg-white p-3 md:grid-cols-[120px_1fr_auto_auto] md:items-center">
              <Badge variant="outline">{rule.mode}</Badge>
              <p className="text-sm text-slate-700">reference={rule.allowReference} · retry={rule.retryLimit}</p>
              <Badge variant="secondary">hint={rule.hintLevel}</Badge>
              <Badge>{rule.timeLimitMin}m</Badge>
            </article>
          ))}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function AdminGradingPage() {
  const specs = [
    { id: 'spec-001', rule: '필수 변수 체크', mode: 'Mock', feedback: 'Minimal' },
    { id: 'spec-002', rule: 'DF 상태 체크', mode: 'Practice', feedback: 'Detailed' },
    { id: 'spec-003', rule: 'Hidden UnitTest', mode: 'Practice+', feedback: 'Limited' },
  ]

  return (
    <AdminShell
      title="Grading Specs"
      subtitle="채점 규칙 세트를 모드별로 관리하고 피드백 강도를 조절합니다."
    >
      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle>Spec Registry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {specs.map((spec) => (
            <article key={spec.id} className="grid gap-2 rounded-xl border border-border bg-white p-3 md:grid-cols-[120px_1fr_auto_auto] md:items-center">
              <Badge variant="outline">{spec.id}</Badge>
              <p className="text-sm font-medium text-slate-800">{spec.rule}</p>
              <Badge variant="secondary">{spec.mode}</Badge>
              <Badge>{spec.feedback}</Badge>
            </article>
          ))}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

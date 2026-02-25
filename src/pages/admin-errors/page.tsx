import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

const errors = [
  ['ANSWER_VAR_MISSING', 'HIGH', '답안 변수 누락'],
  ['ANSWER_VAR_TYPE_MISMATCH', 'MEDIUM', '타입 불일치'],
  ['POLICY_BLOCKED', 'HIGH', '정책 위반 차단'],
  ['EXEC_TIMEOUT', 'MEDIUM', '실행 시간 초과'],
] as const

export function AdminErrorsPage() {
  return (
    <AdminShell title="Error Code Center" subtitle="오류코드 설명, 심각도, 가이드 문구를 관리합니다.">
      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle>Error Dictionary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {errors.map(([code, severity, desc]) => (
            <article key={code} className="grid gap-2 rounded-xl border border-border bg-white p-3 md:grid-cols-[220px_100px_1fr] md:items-center">
              <p className="text-xs font-semibold text-slate-800">{code}</p>
              <Badge variant={severity === 'HIGH' ? 'destructive' : 'secondary'}>{severity}</Badge>
              <p className="text-sm text-slate-600">{desc}</p>
            </article>
          ))}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function AdminNotebooksPage() {
  const templates = [
    ['tmpl_assoc_regression_v5', 'JUPYTER', '5 steps'],
    ['tmpl_basic_prep_v2', 'JUPYTER', '4 steps'],
    ['tmpl_future_block_v3', 'BLOCK', '6 blocks'],
  ]

  return (
    <AdminShell title="Notebook Templates" subtitle="문제 셀, 답안 셀, 정책 고정 셀 구성을 템플릿으로 운영합니다.">
      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle>Template Library</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {templates.map(([name, engine, structure]) => (
            <article key={name} className="grid gap-2 rounded-xl border border-border bg-white p-3 md:grid-cols-[1fr_120px_160px] md:items-center">
              <p className="text-sm font-medium text-slate-800">{name}</p>
              <Badge variant="outline">{engine}</Badge>
              <p className="text-xs text-slate-500">{structure}</p>
            </article>
          ))}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

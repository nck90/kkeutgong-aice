import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function AdminDatasetsPage() {
  const rows = [
    ['dataset_kaggle_train_v3', 'PUBLISHED', 'public/read-only'],
    ['dataset_eval_hidden_v2', 'SECURED', 'internal-only'],
    ['dataset_synthetic_aug_v1', 'DRAFT', 'review pending'],
  ]

  return (
    <AdminShell title="Dataset Registry" subtitle="실습/평가 데이터셋 버전과 접근 정책을 관리합니다.">
      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle>Datasets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {rows.map(([name, status, access]) => (
            <article key={name} className="grid gap-2 rounded-xl border border-border bg-white p-3 md:grid-cols-[1fr_140px_160px] md:items-center">
              <p className="text-sm font-medium text-slate-800">{name}</p>
              <Badge variant={status === 'PUBLISHED' ? 'default' : status === 'SECURED' ? 'secondary' : 'outline'}>
                {status}
              </Badge>
              <p className="text-xs text-slate-500">{access}</p>
            </article>
          ))}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

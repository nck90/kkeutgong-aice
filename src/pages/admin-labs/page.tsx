import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function AdminLabsPage() {
  const { data = [] } = useQuery({ queryKey: ['admin-labs'], queryFn: () => apiClient.getAdminLabs() })

  return (
    <AdminShell
      title="Labs Management"
      subtitle="실습 코스의 생성, 버전 관리, 배포 승인 흐름을 운영합니다."
      right={<Button className="rounded-full">새 Lab 생성</Button>}
    >
      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-xl">Lab Catalog</CardTitle>
          <Badge variant="outline">{data.length} items</Badge>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.map((lab) => (
            <article key={lab.id} className="grid gap-2 rounded-xl border border-border/80 bg-white p-3 md:grid-cols-[1fr_auto_auto_auto] md:items-center">
              <div>
                <p className="font-semibold text-slate-900">{lab.title}</p>
                <p className="text-xs text-slate-500">updated: {lab.updatedAt}</p>
              </div>
              <Badge variant={lab.status === 'PUBLISHED' ? 'default' : 'secondary'}>{lab.status}</Badge>
              <Badge variant="outline">v{lab.version}</Badge>
              <Button asChild size="sm" className="rounded-full px-4">
                <Link to={`/admin/labs/${lab.id}`}>편집</Link>
              </Button>
            </article>
          ))}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

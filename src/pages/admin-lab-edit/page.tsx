import { useParams } from 'react-router-dom'
import { AdminShell } from '@/widgets/admin/AdminShell'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'

export function AdminLabEditPage() {
  const { labId = 'new' } = useParams()

  return (
    <AdminShell
      title={`Lab Editor · ${labId}`}
      subtitle="메타데이터, 템플릿, 채점 규칙을 버전 단위로 편집합니다."
      right={<Button className="rounded-full">변경사항 저장</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle>편집 섹션</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {['메타 정보', '시험지 템플릿', 'Step 구성', '채점 스펙'].map((item) => (
              <button key={item} className="rounded-xl border border-border bg-white px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:border-slate-300">
                {item}
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle>릴리즈 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>현재 버전: v1.3.0</p>
            <p>상태: DRAFT</p>
            <p>최근 승인: 2026-02-18</p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  )
}

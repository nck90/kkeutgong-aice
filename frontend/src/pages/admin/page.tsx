import { Link } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

export function AdminPage() {
  return (
    <Surface title="관리자 홈">
      <div className="grid gap-2 md:grid-cols-4">
        <div className="rounded border p-2 text-sm">DRAFT Labs: 8</div>
        <div className="rounded border p-2 text-sm">PUBLISHED: 22</div>
        <div className="rounded border p-2 text-sm">오류 Top: POLICY_BLOCKED</div>
        <div className="rounded border p-2 text-sm">완주율: 61%</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <Link className="underline" to="/admin/labs">
          Labs 관리
        </Link>
        <Link className="underline" to="/admin/policy">
          정책 관리
        </Link>
        <Link className="underline" to="/admin/analytics">
          운영 분석
        </Link>
      </div>
    </Surface>
  )
}

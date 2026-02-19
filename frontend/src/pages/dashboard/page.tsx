import { Surface } from '@/widgets/cards/surface'

export function DashboardPage() {
  return (
    <Surface title="대시보드">
      <div className="grid gap-2 md:grid-cols-4">
        <div className="rounded border p-2 text-sm">Ready Index: 73</div>
        <div className="rounded border p-2 text-sm">14일 이행률: 68%</div>
        <div className="rounded border p-2 text-sm">Lab PASS율: 71%</div>
        <div className="rounded border p-2 text-sm">Mock 평균: 74</div>
      </div>
    </Surface>
  )
}

import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function PlanWeeklyPage() {
  const { data } = useQuery({ queryKey: ['plan-weekly'], queryFn: () => apiClient.getWeeklyPlanSummary() })
  if (!data) return null

  return (
    <Surface title="주간 리포트 / 플랜 조정">
      <div className="grid gap-2 md:grid-cols-3">
        <div className="rounded border p-2 text-sm">이행률: {data.adherence}%</div>
        <div className="rounded border p-2 text-sm">PASS율: {data.passRate}%</div>
        <div className="rounded border p-2 text-sm">Top Error: {data.topError}</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {data.recommendations.map((item) => (
          <button className="rounded border border-stone-300 bg-white px-3 py-2 text-sm" key={item}>
            {item}
          </button>
        ))}
      </div>
    </Surface>
  )
}

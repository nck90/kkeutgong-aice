import { Surface } from '@/widgets/cards/surface'

export function AdminAnalyticsPage() {
  return (
    <Surface title="운영 분석">
      <div className="grid gap-2 md:grid-cols-3">
        <div className="rounded border p-2 text-sm">완주율: 61%</div>
        <div className="rounded border p-2 text-sm">FAIL Top: ANSWER_VAR_MISSING</div>
        <div className="rounded border p-2 text-sm">Timeout 비율: 11%</div>
      </div>
    </Surface>
  )
}

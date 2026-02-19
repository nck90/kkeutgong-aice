import { Surface } from '@/widgets/cards/surface'

export function AdminGradingPage() {
  return (
    <Surface title="GradingSpec 관리">
      <ul className="space-y-2 text-sm">
        <li className="rounded border border-stone-200 bg-stone-50 p-2">spec-001 · 필수 변수 체크 · Mock 피드백 최소</li>
        <li className="rounded border border-stone-200 bg-stone-50 p-2">spec-002 · DF 상태 체크 · Practice 피드백 상세</li>
      </ul>
    </Surface>
  )
}

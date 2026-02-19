import { Surface } from '@/widgets/cards/surface'

export function OnboardingPolicyPage() {
  return (
    <Surface title="온보딩 3/3 - 정책/모드">
      <div className="grid gap-3 md:grid-cols-3">
        <button className="rounded border border-stone-300 bg-white p-3 text-left text-sm">Practice: 상세 피드백</button>
        <button className="rounded border border-stone-300 bg-white p-3 text-left text-sm">Practice+: 힌트 제한</button>
        <button className="rounded border border-stone-900 bg-stone-900 p-3 text-left text-sm text-white">Mock: 시간/힌트 제한</button>
      </div>
      <p className="mt-3 text-sm text-stone-600">참고 정책 기본값: 허용문서만 (ALLOWLIST_ONLY)</p>
    </Surface>
  )
}

import { Surface } from '@/widgets/cards/surface'

export function OnboardingProfilePage() {
  return (
    <Surface title="온보딩 1/3 - 시험 프로필">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          시험 레벨
          <select className="rounded border border-stone-300 bg-white p-2">
            <option>Associate</option>
            <option>Basic</option>
            <option>Junior</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          시험일
          <input className="rounded border border-stone-300 p-2" type="date" defaultValue="2026-03-28" />
        </label>
      </div>
      <p className="mt-3 text-sm text-stone-600">D-3 이하인 경우 압축 플랜 경고를 노출합니다.</p>
    </Surface>
  )
}

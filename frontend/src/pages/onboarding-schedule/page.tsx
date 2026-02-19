import { Surface } from '@/widgets/cards/surface'

export function OnboardingSchedulePage() {
  return (
    <Surface title="온보딩 2/3 - 가용시간/일정">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="grid gap-1 text-sm">
          주간 총 학습시간(시간)
          <input className="rounded border border-stone-300 p-2" type="number" defaultValue={8} />
        </label>
        <label className="grid gap-1 text-sm">
          선호 시간대
          <select className="rounded border border-stone-300 bg-white p-2">
            <option>오전</option>
            <option>오후</option>
            <option>야간</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          휴무일
          <input className="rounded border border-stone-300 p-2" type="text" defaultValue="일요일" />
        </label>
      </div>
    </Surface>
  )
}

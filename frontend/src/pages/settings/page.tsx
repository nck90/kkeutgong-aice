import { Surface } from '@/widgets/cards/surface'

export function SettingsPage() {
  return (
    <Surface title="설정">
      <div className="flex flex-wrap gap-2">
        <button className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white">시험 프로필</button>
        <button className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm">일정/가용시간</button>
        <button className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm">정책/모드</button>
      </div>
    </Surface>
  )
}

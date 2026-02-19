import { Surface } from '@/widgets/cards/surface'

export function SettingsSchedulePage() {
  return (
    <Surface title="설정 - 일정/가용시간">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="grid gap-1 text-sm">
          월
          <input className="rounded border border-stone-300 p-2" type="number" defaultValue={60} />
        </label>
        <label className="grid gap-1 text-sm">
          화
          <input className="rounded border border-stone-300 p-2" type="number" defaultValue={45} />
        </label>
        <label className="grid gap-1 text-sm">
          수
          <input className="rounded border border-stone-300 p-2" type="number" defaultValue={45} />
        </label>
      </div>
    </Surface>
  )
}

import { Surface } from '@/widgets/cards/surface'

export function SettingsProfilePage() {
  return (
    <Surface title="설정 - 시험 프로필">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          시험일
          <input className="rounded border border-stone-300 p-2" type="date" defaultValue="2026-03-28" />
        </label>
        <label className="grid gap-1 text-sm">
          목표
          <select className="rounded border border-stone-300 bg-white p-2">
            <option>합격 우선</option>
            <option>고득점 우선</option>
          </select>
        </label>
      </div>
    </Surface>
  )
}

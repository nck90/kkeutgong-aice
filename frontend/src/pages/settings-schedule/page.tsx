import { Surface } from '@/widgets/cards/surface'

const days = [
  ['월', 70],
  ['화', 45],
  ['수', 50],
  ['목', 45],
  ['금', 65],
  ['토', 90],
  ['일', 0],
] as const

export function SettingsSchedulePage() {
  return (
    <div className="space-y-6">
      <Surface title="요일별 학습 슬롯(분)">
        <div className="grid gap-3 md:grid-cols-4">
          {days.map(([day, minutes]) => (
            <label key={day} className="grid gap-1.5 rounded-xl border border-border bg-white p-3 text-sm font-medium text-slate-700">
              {day}
              <input
                className="h-10 rounded-lg border border-border bg-white px-2.5 text-sm"
                type="number"
                defaultValue={minutes}
              />
            </label>
          ))}
        </div>
      </Surface>

      <Surface title="학습 패턴 설정">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            집중 세션 길이
            <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm">
              <option>25분 (Pomodoro)</option>
              <option>45분</option>
              <option>60분</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            선호 시간대
            <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm">
              <option>오전 집중형</option>
              <option>오후 집중형</option>
              <option>야간 집중형</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            복습 자동 배치
            <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm">
              <option>매일</option>
              <option>격일</option>
              <option>주 2회</option>
            </select>
          </label>
        </div>
      </Surface>
    </div>
  )
}

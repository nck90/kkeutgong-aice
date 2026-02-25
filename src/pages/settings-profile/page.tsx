import { Surface } from '@/widgets/cards/surface'

export function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <Surface title="시험 프로필">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            응시 레벨
            <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm">
              <option>Associate</option>
              <option>Basic</option>
              <option>Junior</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            시험일
            <input className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm" type="date" defaultValue="2026-03-28" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            목표 유형
            <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm">
              <option>합격 우선</option>
              <option>고득점 우선</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            목표 점수
            <input className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm" type="number" defaultValue={88} />
          </label>
        </div>
      </Surface>

      <Surface title="자동 플랜 기준">
        <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">D-14 이하</p>
            <p className="mt-1 font-semibold">압축 플랜 자동 활성화</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">실수율 20% 초과</p>
            <p className="mt-1 font-semibold">교정 태스크 우선 배치</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-4">
            <p className="text-xs font-semibold text-slate-500">Mock 미수행 7일</p>
            <p className="mt-1 font-semibold">모의고사 알림/추천</p>
          </div>
        </div>
      </Surface>
    </div>
  )
}

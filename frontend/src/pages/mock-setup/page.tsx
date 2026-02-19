import { Link } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

export function MockSetupPage() {
  return (
    <Surface title="모의시험 설정">
      <div className="grid gap-3 md:grid-cols-3">
        <label className="grid gap-1 text-sm">
          유형
          <select className="rounded border border-stone-300 bg-white p-2">
            <option>회귀</option>
            <option>분류</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          난이도
          <select className="rounded border border-stone-300 bg-white p-2">
            <option>MID</option>
            <option>HARD</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          시간 제한
          <input className="rounded border border-stone-300 p-2" type="number" defaultValue={60} />
        </label>
      </div>
      <Link className="mt-3 inline-block rounded-md bg-stone-900 px-3 py-2 text-sm text-white" to="/aice/mock/consent">
        다음
      </Link>
    </Surface>
  )
}

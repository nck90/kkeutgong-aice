import { Link } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

export function SettingsPage() {
  return (
    <Surface title="설정">
      <div className="flex flex-wrap gap-2">
        <Link className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white" to="/aice/settings/profile">
          시험 프로필
        </Link>
        <Link className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm" to="/aice/settings/schedule">
          일정/가용시간
        </Link>
        <Link className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm" to="/aice/settings/policy">
          정책/모드
        </Link>
      </div>
    </Surface>
  )
}

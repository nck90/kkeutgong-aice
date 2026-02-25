import { NavLink } from 'react-router-dom'

const learnerLinks = [
  ['AICE 홈', '/aice'],
  ['온보딩 프로필', '/aice/onboarding/profile'],
  ['내 플랜', '/aice/plan'],
  ['플랜 Day', '/aice/plan/day/2026-02-19'],
  ['Labs', '/aice/labs'],
  ['Lab 상세', '/aice/labs/lab-pipeline-01'],
  ['세션 시작', '/aice/labs/lab-pipeline-01/start'],
  ['플레이어', '/aice/session/demo-001'],
  ['리뷰', '/aice/session/demo-001/review'],
  ['모의 홈', '/aice/mock'],
  ['모의 설정', '/aice/mock/setup'],
  ['모의 실행', '/aice/mock/session/mock-001'],
  ['실수 교정', '/aice/mistakes'],
  ['참고문서', '/aice/reference'],
  ['대시보드', '/aice/dashboard'],
  ['설정', '/aice/settings'],
] as const

const adminLinks = [
  ['관리자 홈', '/admin'],
  ['Labs 관리', '/admin/labs'],
  ['Lab 편집', '/admin/labs/lab-pipeline-01'],
  ['Grading', '/admin/grading'],
  ['Policy', '/admin/policy'],
  ['Release', '/admin/releases'],
  ['Analytics', '/admin/analytics'],
] as const

export function Sidebar() {
  return (
    <aside className="w-72 shrink-0 overflow-auto border-r border-stone-200 bg-stone-50 p-4">
      <h1 className="mb-4 text-lg font-bold">AICE Frontend</h1>

      <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-stone-500">Learner</p>
      <nav className="space-y-1">
        {learnerLinks.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-white'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <p className="mb-2 mt-6 text-xs font-semibold uppercase tracking-wide text-stone-500">Admin</p>
      <nav className="space-y-1">
        {adminLinks.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-sm ${isActive ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-white'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

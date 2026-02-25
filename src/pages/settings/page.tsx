import { Link } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

const cards = [
  {
    title: '시험 프로필',
    description: '레벨, 시험일, 목표 점수, 압축 플랜 기준을 관리합니다.',
    to: '/aice/settings/profile',
  },
  {
    title: '일정/가용시간',
    description: '요일별 학습 슬롯과 집중 시간대를 최적화합니다.',
    to: '/aice/settings/schedule',
  },
  {
    title: '정책/모드',
    description: 'Practice/Mock 제약 조건과 힌트 강도를 조정합니다.',
    to: '/aice/settings/policy',
  },
]

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-white via-sky-50 to-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">학습 환경 설정</h1>
        <p className="mt-2 text-sm text-slate-600">
          설정은 즉시 플랜, 세션 정책, 추천 학습 시나리오에 반영됩니다.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="group">
            <Surface title={card.title}>
              <p className="text-sm text-slate-600">{card.description}</p>
              <p className="mt-4 text-sm font-semibold text-slate-900 group-hover:text-sky-700">설정 열기</p>
            </Surface>
          </Link>
        ))}
      </div>
    </div>
  )
}

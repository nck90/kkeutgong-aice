import { Link } from 'react-router-dom'
import { deriveOnboardingEntryDecision } from '@/shared/lib/onboarding-routing'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Surface } from '@/widgets/cards/surface'

const levelCards = [
  {
    level: 'Future',
    description: '블록코딩 중심의 AI 사고력 입문',
    examTime: '50분',
  },
  {
    level: 'Junior',
    description: '기초 데이터 이해와 시각화 훈련',
    examTime: '60분',
  },
  {
    level: 'Basic',
    description: '전처리와 모델링의 기본 흐름 학습',
    examTime: '70분',
  },
  {
    level: 'Associate',
    description: '실전형 분석 파이프라인 구축',
    examTime: '90분',
  },
]

export function OnboardingProfilePage() {
  const entry = deriveOnboardingEntryDecision()

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-amber-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Onboarding 1 / 3</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">시험 프로필을 먼저 설정하세요</h1>
        <p className="mt-2 text-sm text-slate-600">
          이 정보는 플랜 압축, 실수 교정 우선순위, 모의고사 타이머 정책에 직접 반영됩니다.
        </p>
      </div>

      <Surface title="시험 목표 설정">
        <div className="mb-4 rounded-xl border border-sky-100 bg-sky-50 p-3">
          <p className="text-sm font-semibold text-slate-900">자동 진입 추천</p>
          <p className="mt-1 text-xs text-slate-700">
            추천 경로: {entry.path} · {entry.reason}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            AICE 목표 레벨
            <select className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm">
              <option>Associate</option>
              <option>Basic</option>
              <option>Junior</option>
              <option>Future</option>
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-slate-700">
            응시 예정일
            <input
              className="h-11 rounded-xl border border-border bg-white px-3 text-sm shadow-sm"
              type="date"
              defaultValue="2026-03-28"
            />
          </label>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {levelCards.map((card) => (
            <div key={card.level} className="rounded-xl border border-border/90 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">{card.level}</h3>
                <Badge variant="outline">시험 {card.examTime}</Badge>
              </div>
              <p className="text-sm text-slate-600">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          시험일까지 14일 이하일 경우 자동 압축 플랜을 활성화해 핵심 라운드 중심으로 재배치합니다.
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">필수 항목 2/2 완료</p>
          <Button asChild className="rounded-full px-5">
            <Link to="/onboarding/schedule">다음: 학습 스케줄 설정</Link>
          </Button>
        </div>
      </Surface>
    </div>
  )
}

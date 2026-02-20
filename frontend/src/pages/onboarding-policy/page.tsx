import { Link } from 'react-router-dom'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Surface } from '@/widgets/cards/surface'

const modeCards = [
  {
    mode: 'Practice',
    title: '학습 친화 모드',
    summary: '참고문서 자유, 상세 피드백 제공, 재시도 제한 없음',
    hint: 'FULL',
    retry: '∞',
  },
  {
    mode: 'Practice+',
    title: '준실전 모드',
    summary: '허용문서만 접근, 핵심 힌트만 제공, 재시도 3회',
    hint: 'LIMITED',
    retry: '3',
  },
  {
    mode: 'Mock',
    title: '실전 모드',
    summary: '시간 제한, 힌트 최소화, 정책 위반 즉시 차단',
    hint: 'MINIMAL',
    retry: '1',
  },
]

export function OnboardingPolicyPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-rose-50 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Onboarding 3 / 3</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">시험 정책을 선택합니다</h1>
        <p className="mt-2 text-sm text-slate-600">
          정책은 세션 실행 권한, 참고문서 접근 범위, 힌트 강도와 직결됩니다.
        </p>
      </div>

      <Surface title="모드/정책 선택">
        <div className="grid gap-3 md:grid-cols-3">
          {modeCards.map((card, index) => (
            <button
              type="button"
              key={card.mode}
              className={`rounded-2xl border p-4 text-left transition-all ${
                index === 2
                  ? 'border-slate-900 bg-slate-900 text-white shadow-lg'
                  : 'border-border bg-white hover:border-slate-300'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-bold">{card.mode}</h3>
                <Badge variant={index === 2 ? 'secondary' : 'outline'}>{card.title}</Badge>
              </div>
              <p className={`text-sm ${index === 2 ? 'text-slate-200' : 'text-slate-600'}`}>{card.summary}</p>
              <div className={`mt-4 text-xs ${index === 2 ? 'text-slate-300' : 'text-slate-500'}`}>
                힌트: {card.hint} · 재시도: {card.retry}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-900">
          기본 정책은 <strong>ALLOWLIST_ONLY</strong>로 설정되며, 외부 문서 접근은 화이트리스트 기준으로 제한됩니다.
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button asChild variant="outline" className="rounded-full px-5">
            <Link to="/onboarding/schedule">이전</Link>
          </Button>
          <Button asChild className="rounded-full px-5">
            <Link to="/diagnostic">온보딩 완료하고 진단 시작</Link>
          </Button>
        </div>
      </Surface>
    </div>
  )
}

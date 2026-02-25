import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'
import { Badge } from '@/shared/ui/badge'
import { Surface } from '@/widgets/cards/surface'

export function SettingsPolicyPage() {
  const { data = [] } = useQuery({ queryKey: ['policy-rules'], queryFn: () => apiClient.getPolicyRules() })

  return (
    <div className="space-y-6">
      <Surface title="모드별 정책 설정">
        <div className="grid gap-4 md:grid-cols-3">
          {data.map((rule) => (
            <article key={rule.id} className="rounded-2xl border border-border bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">{rule.mode}</h3>
                <Badge variant={rule.mode === 'Mock' ? 'default' : 'outline'}>{rule.hintLevel}</Badge>
              </div>
              <dl className="space-y-1.5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <dt>Reference</dt>
                  <dd className="font-medium text-slate-900">{rule.allowReference}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Retry Limit</dt>
                  <dd className="font-medium text-slate-900">{rule.retryLimit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Time Limit</dt>
                  <dd className="font-medium text-slate-900">{rule.timeLimitMin}m</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </Surface>

      <Surface title="정책 가이드">
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Mock 모드는 실전 재현이 목적이므로 힌트 노출을 최소화합니다.</li>
          <li>Practice+는 학습과 실전의 균형을 맞추는 중간 정책입니다.</li>
          <li>정책 위반 코드 패턴은 실행 단계에서 즉시 차단됩니다.</li>
        </ul>
      </Surface>
    </div>
  )
}

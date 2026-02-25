import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { calcDDay, deriveAdaptiveIntensity, loadStudyGoal, resolveTargetDate } from '@/shared/lib/study-plan'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Surface } from '@/widgets/cards/surface'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/client'

export function MockSetupPage() {
  const goal = loadStudyGoal()
  const targetDate = goal ? resolveTargetDate(goal) : '2026-02-27'
  const dDay = calcDDay(targetDate)
  const { data: mistakes = [] } = useQuery({
    queryKey: ['mistakes'],
    queryFn: () => apiClient.getMistakes(),
  })

  const intensity = useMemo(
    () => deriveAdaptiveIntensity(Math.max(0, dDay), mistakes),
    [dDay, mistakes],
  )

  const suggestedTime =
    intensity.pace === 'INTENSIVE' ? 90 : intensity.pace === 'BALANCED' ? 70 : 50

  return (
    <Surface title="모의시험 설정">
      <div className="mb-4 rounded-xl border border-sky-100 bg-sky-50 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">D-{Math.max(0, dDay)}</Badge>
          <Badge variant="secondary">강도 {intensity.pace}</Badge>
          <Badge variant="outline">권장 {suggestedTime}분</Badge>
        </div>
        <p className="mt-2 text-xs text-slate-700">
          {intensity.reasons.join(' · ')}
        </p>
      </div>

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
          <input className="rounded border border-stone-300 p-2" type="number" defaultValue={suggestedTime} />
        </label>
      </div>
      <Button asChild className="mt-3 rounded-full px-5">
        <Link to="/mock/consent">다음</Link>
      </Button>
    </Surface>
  )
}

import { useQuery } from '@tanstack/react-query'
import { CalendarClock, Filter, History as HistoryIcon } from 'lucide-react'
import { apiClient } from '@/shared/api/client'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function HistoryPage() {
  const { data = [] } = useQuery({ queryKey: ['history'], queryFn: apiClient.getHistory })

  return (
    <div className="space-y-6">
      <section className="glass-panel rounded-3xl p-7 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-700">History</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">학습 실행 히스토리</h1>
        <p className="mt-2 text-sm text-slate-600">
          모드별 제출 결과와 반복 오류 패턴을 확인해 다음 플랜에 반영할 수 있습니다.
        </p>
      </section>

      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="inline-flex items-center gap-2 text-xl">
            <HistoryIcon className="h-5 w-5 text-slate-400" />
            최근 실행 로그
          </CardTitle>
          <button className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
            <Filter className="h-3.5 w-3.5" />
            필터
          </button>
        </CardHeader>
        <CardContent className="space-y-2">
          {data.map((entry) => (
            <article
              key={entry.id}
              className="grid gap-2 rounded-xl border border-border/70 bg-white p-3 md:grid-cols-[120px_1fr_auto] md:items-center"
            >
              <Badge variant="outline" className="justify-center">
                {entry.mode}
              </Badge>
              <div>
                <p className="inline-flex items-center gap-1 text-sm font-medium text-slate-800">
                  <CalendarClock className="h-3.5 w-3.5 text-slate-400" />
                  {entry.date}
                </p>
                {entry.errorCode ? (
                  <p className="mt-0.5 text-xs text-red-600">ErrorCode: {entry.errorCode}</p>
                ) : (
                  <p className="mt-0.5 text-xs text-slate-500">치명 오류 없이 정상 제출</p>
                )}
              </div>
              <div>
                <Badge variant={entry.result === 'PASS' ? 'default' : entry.result === 'FAIL' ? 'destructive' : 'secondary'}>
                  {entry.result}
                </Badge>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

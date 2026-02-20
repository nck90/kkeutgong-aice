import { useMemo } from 'react'
import {
  summarizeOutcomeByMode,
  summarizeOutcomeSignals,
  summarizeOutcomeTrend,
} from '@/shared/lib/adaptive-feedback'
import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Progress } from '@/shared/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'

export function AdminAnalyticsPage() {
  const signal = useMemo(() => summarizeOutcomeSignals(14), [])
  const trend = useMemo(() => summarizeOutcomeTrend(14), [])
  const modeRows = useMemo(() => summarizeOutcomeByMode(14), [])

  const topError = signal.topErrors[0]?.code ?? 'NONE'
  const timeoutRateHint = signal.topErrors.find((item) => item.code === 'EXEC_TIMEOUT')?.count ?? 0

  return (
    <AdminShell
      title="Operational Analytics"
      subtitle="학습 품질, 적응형 신호, 모드별 성과를 통합 분석합니다."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <Metric title="최근 전략" value={signal.strategy} progress={signal.strategy === 'ADVANCE' ? 84 : signal.strategy === 'STABLE' ? 66 : 42} />
        <Metric title="PASS율(14d)" value={`${signal.passRate}%`} progress={signal.passRate} />
        <Metric title="FAIL성 제출" value={`${signal.failLikeCount}회`} progress={Math.min(100, signal.failLikeCount * 12)} />
        <Metric title="Top Error" value={topError} progress={Math.min(100, timeoutRateHint * 10)} />
      </div>

      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Mode Performance Matrix (14d)</CardTitle>
          <Badge variant="outline">local adaptive data</Badge>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mode</TableHead>
                <TableHead>Attempts</TableHead>
                <TableHead>Pass Rate</TableHead>
                <TableHead>Signal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {modeRows.map((row) => (
                <TableRow key={row.mode}>
                  <TableCell className="font-semibold text-slate-900">{row.mode}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>{row.passRate}%</TableCell>
                  <TableCell>
                    <Badge variant={row.passRate >= 80 ? 'default' : row.passRate >= 60 ? 'secondary' : 'destructive'}>
                      {row.passRate >= 80 ? 'GOOD' : row.passRate >= 60 ? 'WATCH' : 'RISK'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle>Daily Outcome Trend (14d)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          {trend.length ? (
            trend.map((point) => {
              const total = point.pass + point.partial + point.fail + point.error
              const passRate = total ? Math.round((point.pass / total) * 100) : 0
              return (
                <article key={point.date} className="rounded-xl border border-border bg-white p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{point.date}</p>
                    <p className="text-xs text-slate-500">{passRate}%</p>
                  </div>
                  <Progress value={passRate} className="mt-2 h-2" />
                  <p className="mt-1 text-xs text-slate-600">
                    pass {point.pass} / partial {point.partial} / fail {point.fail} / error {point.error}
                  </p>
                </article>
              )
            })
          ) : (
            <p className="text-sm text-slate-500">수집된 세션 결과가 없습니다.</p>
          )}
        </CardContent>
      </Card>
    </AdminShell>
  )
}

function Metric({ title, value, progress }: { title: string; value: string; progress: number }) {
  return (
    <Card className="rounded-2xl border-border/80 bg-white/90">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-600">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <Progress value={progress} className="mt-3 h-2" />
      </CardContent>
    </Card>
  )
}

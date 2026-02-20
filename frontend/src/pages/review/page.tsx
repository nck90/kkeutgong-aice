import { useQuery } from '@tanstack/react-query'
import { AlertTriangle, ArrowLeft, TimerReset } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { apiClient } from '@/shared/api/client'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export function ReviewPage() {
  const { sessionId = 'demo-001' } = useParams()
  const { data } = useQuery({
    queryKey: ['review', sessionId],
    queryFn: () => apiClient.getSessionReview(sessionId),
  })

  if (!data) return <div className="p-8 text-center text-slate-500">리뷰를 불러오는 중입니다...</div>

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to={`/learning/session/${sessionId}`}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">세션 리뷰</h1>
            <p className="text-xs text-slate-500">Session ID: {sessionId}</p>
          </div>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-border/80 bg-white/95">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm text-slate-600">PASS / FAIL</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">
              {data.passCount}
              <span className="mx-2 text-slate-300">/</span>
              {data.failCount}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/80 bg-white/95">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm text-slate-600">Top Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {data.topErrorCode}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/80 bg-white/95">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm text-slate-600">총 스텝</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
              <TimerReset className="h-5 w-5 text-sky-600" />
              {data.stepTimeline.length} steps
            </p>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-2xl border-border/80 bg-white/95">
        <CardHeader>
          <CardTitle>단계별 타임라인</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {data.stepTimeline.map((item) => (
            <article
              key={item.stepNo}
              className="flex items-center justify-between rounded-xl border border-border/70 bg-white px-4 py-3"
            >
              <div>
                <h3 className="font-semibold text-slate-900">Step {item.stepNo}</h3>
                <p className="text-xs text-slate-500">소요시간: {item.elapsedSec}초</p>
              </div>
              <Badge variant={item.state === 'PASS' ? 'default' : item.state === 'FAIL' ? 'destructive' : 'secondary'}>
                {item.state}
              </Badge>
            </article>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

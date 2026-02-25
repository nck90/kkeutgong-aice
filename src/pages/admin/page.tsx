import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock3, ShieldAlert } from 'lucide-react'
import { AdminShell } from '@/widgets/admin/AdminShell'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import type { ReactNode } from 'react'

export function AdminPage() {
  return (
    <AdminShell
      title="AICE Admin Control Tower"
      subtitle="콘텐츠 배포, 정책 적용, 품질 지표를 한 화면에서 운영합니다."
      right={
        <Button asChild className="rounded-full bg-white text-slate-900 hover:bg-slate-100">
          <Link to="/admin/labs">
            Labs 운영 시작
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">오늘의 운영 태스크</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Task title="lab-prep-02 검수 완료" meta="Owner: content-team · ETA 14:30" done />
            <Task title="Mock 정책 v1.4 롤아웃" meta="Cluster: primary · ETA 16:00" />
            <Task title="오류코드 문구 QA" meta="Top 5 에러코드 가이드 리라이팅" />
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">운영 알림</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <AlertRow icon={<ShieldAlert className="h-4 w-4 text-rose-600" />} text="POLICY_BLOCKED 비율 전일 대비 +3.1%" />
            <AlertRow icon={<Clock3 className="h-4 w-4 text-amber-600" />} text="모의고사 평균 제출시간 7분 증가" />
            <AlertRow icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />} text="PUBLISHED 랩 22개 상태 정상" />
          </CardContent>
        </Card>
      </section>
    </AdminShell>
  )
}

function Task({ title, meta, done = false }: { title: string; meta: string; done?: boolean }) {
  return (
    <article className="rounded-xl border border-border bg-white px-4 py-3">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500">{meta}</p>
      <p className={`mt-2 text-[11px] font-semibold ${done ? 'text-emerald-600' : 'text-sky-700'}`}>
        {done ? 'DONE' : 'IN PROGRESS'}
      </p>
    </article>
  )
}

function AlertRow({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-slate-700">
      {icon}
      <span>{text}</span>
    </div>
  )
}

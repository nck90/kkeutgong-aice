import { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Rocket, ShieldAlert } from 'lucide-react'
import { AdminShell } from '@/widgets/admin/AdminShell'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'

type WorkflowStage = {
  key: 'AUTHORING' | 'REVIEW' | 'APPROVAL' | 'DEPLOY'
  label: string
  owner: string
  count: number
}

type ReleaseItem = {
  version: string
  stage: WorkflowStage['key']
  owner: string
  updatedAt: string
  note: string
  risk: 'LOW' | 'MEDIUM' | 'HIGH'
}

const stages: WorkflowStage[] = [
  { key: 'AUTHORING', label: '작성', owner: 'Content Team', count: 4 },
  { key: 'REVIEW', label: '검수', owner: 'QA Team', count: 2 },
  { key: 'APPROVAL', label: '승인', owner: 'Ops Lead', count: 1 },
  { key: 'DEPLOY', label: '배포', owner: 'Platform Team', count: 1 },
]

const releases: ReleaseItem[] = [
  {
    version: 'v1.4.0-rc2',
    stage: 'REVIEW',
    owner: 'qa-lead',
    updatedAt: '2026-02-19 12:20',
    note: '모의고사 오류코드 UX 개선 포함',
    risk: 'MEDIUM',
  },
  {
    version: 'v1.4.0',
    stage: 'APPROVAL',
    owner: 'ops-director',
    updatedAt: '2026-02-19 11:10',
    note: '정책 가드 강화 + 세션 분석 패널',
    risk: 'LOW',
  },
  {
    version: 'v1.3.2',
    stage: 'DEPLOY',
    owner: 'platform',
    updatedAt: '2026-02-18 20:05',
    note: 'prod 배포 완료, 모니터링 24h',
    risk: 'LOW',
  },
]

export function AdminReleasesPage() {
  const [stageFilter, setStageFilter] = useState<'ALL' | WorkflowStage['key']>('ALL')

  const filteredReleases = useMemo(() => {
    if (stageFilter === 'ALL') return releases
    return releases.filter((release) => release.stage === stageFilter)
  }, [stageFilter])

  return (
    <AdminShell
      title="Release Workflow Center"
      subtitle="작성부터 배포까지 단계를 명확히 추적하고, 게이트 기준으로 승인합니다."
      right={
        <Button className="rounded-full px-4 font-semibold">
          신규 릴리즈 생성
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">Approval Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stages.map((stage) => (
              <article key={stage.key} className="rounded-xl border border-border bg-white p-3">
                <p className="text-sm font-semibold text-slate-900">{stage.label}</p>
                <p className="mt-1 text-xs text-slate-500">Owner: {stage.owner}</p>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <span>{stage.count}</span>
                  <span>대기 항목</span>
                </div>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-white/90">
          <CardHeader>
            <CardTitle className="text-xl">Gate Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ChecklistItem done text="Lint / Test / Build 통과" />
            <ChecklistItem done text="정책 예외 시나리오 회귀 점검" />
            <ChecklistItem done={false} text="운영자 최종 승인 서명" />
            <ChecklistItem done={false} text="배포 후 모니터링 룰 활성화" />
          </CardContent>
        </Card>
      </section>

      <Card className="mt-4 rounded-2xl border-border/80 bg-white/90">
        <CardHeader>
          <CardTitle className="text-xl">Release Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Tabs
            defaultValue="ALL"
            value={stageFilter}
            onValueChange={(value) => setStageFilter(value as 'ALL' | WorkflowStage['key'])}
          >
            <TabsList className="h-10 bg-slate-100">
              <TabsTrigger value="ALL">전체</TabsTrigger>
              <TabsTrigger value="AUTHORING">작성</TabsTrigger>
              <TabsTrigger value="REVIEW">검수</TabsTrigger>
              <TabsTrigger value="APPROVAL">승인</TabsTrigger>
              <TabsTrigger value="DEPLOY">배포</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Version</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Detail</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReleases.map((release) => (
                  <TableRow key={release.version}>
                    <TableCell className="font-semibold text-slate-900">{release.version}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{release.stage}</Badge>
                    </TableCell>
                    <TableCell>
                      <RiskBadge level={release.risk} />
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-slate-700">{release.note}</p>
                      <p className="text-xs text-slate-500">
                        owner: {release.owner} · updated: {release.updatedAt}
                      </p>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="rounded-full">
                        단계 이동
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminShell>
  )
}

function ChecklistItem({ done, text }: { done: boolean; text: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2">
      {done ? (
        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
      ) : (
        <ShieldAlert className="h-4 w-4 text-amber-600" />
      )}
      <span className="text-slate-700">{text}</span>
    </div>
  )
}

function RiskBadge({ level }: { level: ReleaseItem['risk'] }) {
  if (level === 'HIGH') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-1 text-[11px] font-semibold text-rose-700">
        <ShieldAlert className="h-3.5 w-3.5" />
        HIGH
      </span>
    )
  }

  if (level === 'MEDIUM') {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-[11px] font-semibold text-amber-700">
        <Rocket className="h-3.5 w-3.5" />
        MEDIUM
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
      <CheckCircle2 className="h-3.5 w-3.5" />
      LOW
    </span>
  )
}

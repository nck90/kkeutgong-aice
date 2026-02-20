import { Panel, Group, Separator } from 'react-resizable-panels'
import { BarChart3, Check, Clock3, Play, ShieldCheck, Variable } from 'lucide-react'
import { MonacoEditor } from '@/features/code-editor/MonacoEditor'
import { Terminal } from '@/features/execution/Terminal'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Progress } from '@/shared/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import type { SessionStep, SubmitResult } from '@/shared/types/domain'

type FeedbackEntry = {
  id: string
  at: string
  stepNo: number
  result: SubmitResult['result'] | 'ERROR'
  message: string
}

type VariableCheck = {
  required: string[]
  assigned: string[]
  missing: string[]
  score: number
}

interface IdeWorkspaceProps {
  sessionId: string
  mode: 'Practice' | 'Practice+' | 'Mock'
  policy: 'OPEN' | 'ALLOWLIST_ONLY' | 'RESTRICTED'
  activeStep: number
  instruction: string
  code: string
  steps: SessionStep[]
  progress: number
  timerLabel: string
  onCodeChange: (value: string | undefined) => void
  logs: string[]
  runCount: number
  lastRunMs: number
  variableCheck: VariableCheck
  feedbackHistory: FeedbackEntry[]
  onRun: () => void
  onSubmit: () => void
  isRunning: boolean
}

export function IdeWorkspace({
  sessionId,
  mode,
  policy,
  activeStep,
  instruction,
  code,
  steps,
  progress,
  timerLabel,
  onCodeChange,
  logs,
  runCount,
  lastRunMs,
  variableCheck,
  feedbackHistory,
  onRun,
  onSubmit,
  isRunning,
}: IdeWorkspaceProps) {
  const passedCount = steps.filter((step) => step.state === 'PASS').length
  const passLabel = `${passedCount}/${steps.length} steps`

  return (
    <div className="flex h-full w-full flex-col bg-[#f4f8fc]">
      <div className="border-b border-border/80 bg-white/85 px-4 py-2.5 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="inline-flex items-center gap-2">
            <Badge variant="outline">Session {sessionId}</Badge>
            <Badge variant="secondary">{mode}</Badge>
            <Badge>{policy}</Badge>
            <Badge variant="outline">Step {activeStep}</Badge>
          </div>
          <span className="text-slate-500">runtime: sandbox-simulated · autosave: enabled</span>
        </div>
      </div>

      <Group orientation="horizontal">
        <Panel defaultSize={31} minSize={22} className="border-r border-border bg-white/90">
          <div className="flex h-full flex-col">
            <div className="border-b border-border bg-slate-50 px-4 py-2.5">
              <h2 className="text-sm font-semibold text-slate-800">문제 설명</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="whitespace-pre-wrap rounded-xl border border-border/80 bg-white p-4 text-sm leading-relaxed text-slate-700">
                {instruction}
              </div>
            </div>
          </div>
        </Panel>

        <Separator className="w-1 bg-border/80 transition-colors hover:bg-slate-300" />

        <Panel defaultSize={44} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex h-10 items-center justify-between border-b border-border bg-slate-50 px-4">
              <span className="text-xs font-semibold text-slate-600">main.py</span>
              <span className="text-xs text-slate-400">python 3.11</span>
            </div>
            <div className="flex-1">
              <MonacoEditor value={code} onChange={onCodeChange} />
            </div>
          </div>
        </Panel>

        <Separator className="w-1 bg-border/80 transition-colors hover:bg-slate-300" />

        <Panel defaultSize={25} minSize={16} className="border-l border-border bg-slate-950">
          <div className="flex h-full flex-col">
            <div className="flex h-10 items-center justify-between border-b border-slate-700 px-4">
              <span className="text-xs font-semibold text-slate-300">Execution Log</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                Policy Guard
              </span>
            </div>
            <div className="h-[42%] min-h-[160px] overflow-hidden border-b border-slate-700/70">
              <Terminal logs={logs} />
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <BarChart3 className="h-3.5 w-3.5" />
                    Session Analytics
                  </span>
                  <span>{passLabel}</span>
                </div>
                <Progress value={progress} className="h-1.5 bg-slate-800" indicatorClassName="bg-emerald-500" />
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span>진행률 {progress}%</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3.5 w-3.5" />
                    {timerLabel}
                  </span>
                </div>
              </div>

              <Tabs defaultValue="metrics" className="mt-3">
                <TabsList className="w-full">
                  <TabsTrigger value="metrics" className="flex-1">
                    Metrics
                  </TabsTrigger>
                  <TabsTrigger value="variables" className="flex-1">
                    Variables
                  </TabsTrigger>
                  <TabsTrigger value="attempts" className="flex-1">
                    Attempts
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metrics" className="mt-2">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                    <p className="text-xs font-semibold text-slate-200">Runtime Metrics</p>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                      <MetricChip label="Run Count" value={String(runCount)} />
                      <MetricChip label="Last Runtime" value={`${lastRunMs}ms`} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="variables" className="mt-2">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
                    <div className="flex items-center justify-between">
                      <p className="inline-flex items-center gap-1 text-xs font-semibold text-slate-200">
                        <Variable className="h-3.5 w-3.5" />
                        Variable Check
                      </p>
                      <Badge variant="outline" className="border-slate-500 text-[10px] text-slate-200">
                        score {variableCheck.score}
                      </Badge>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400">
                      required: {variableCheck.required.join(', ') || '-'}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-400">
                      assigned: {variableCheck.assigned.join(', ') || '-'}
                    </p>
                    <p className="mt-1 text-[11px] text-rose-300">
                      missing: {variableCheck.missing.join(', ') || 'none'}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="attempts" className="mt-2">
                  <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-2">
                    {feedbackHistory.length ? (
                      <Table>
                        <TableHeader>
                          <TableRow className="border-slate-700 hover:bg-transparent">
                            <TableHead className="text-[10px] text-slate-400">Time</TableHead>
                            <TableHead className="text-[10px] text-slate-400">Step</TableHead>
                            <TableHead className="text-[10px] text-slate-400">Result</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {feedbackHistory.map((item) => (
                            <TableRow key={item.id} className="border-slate-800 hover:bg-slate-800/60">
                              <TableCell className="text-[11px] text-slate-400">{item.at}</TableCell>
                              <TableCell className="text-[11px] text-slate-300">{item.stepNo}</TableCell>
                              <TableCell className="max-w-[180px] text-[11px] text-slate-300">
                                <p className="font-semibold">{item.result}</p>
                                <p className="truncate text-slate-500">{item.message}</p>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="p-2 text-[11px] text-slate-500">아직 제출 피드백이 없습니다.</p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Panel>
      </Group>

      <div className="flex h-14 items-center justify-between border-t border-border bg-white/95 px-4">
        <span className="text-xs text-slate-500">실행 대기: 0.1s · 채점 엔진: unit+var check</span>
        <div className="flex items-center gap-2.5">
          <Button
            variant="secondary"
            onClick={onRun}
            disabled={isRunning}
            className="gap-2 rounded-full px-4 font-semibold"
          >
            <Play className="h-4 w-4" />
            실행
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isRunning}
            className="gap-2 rounded-full px-5 font-semibold"
          >
            <Check className="h-4 w-4" />
            제출
          </Button>
        </div>
      </div>
    </div>
  )
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5">
      <p className="text-[10px] text-slate-500">{label}</p>
      <p className="mt-0.5 text-xs font-semibold text-slate-200">{value}</p>
    </div>
  )
}

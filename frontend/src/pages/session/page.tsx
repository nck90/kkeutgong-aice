import { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useSessionPlayer } from '@/entities/session/model/useSessionPlayer'
import { useSessionTimer } from '@/entities/session/model/useSessionTimer'
import { apiClient } from '@/shared/api/client'
import { recordOutcomeEvent } from '@/shared/lib/adaptive-feedback'
import { toast } from '@/shared/lib/toast'
import type { SubmitResult } from '@/shared/types/domain'
import { Skeleton } from '@/shared/ui/skeleton'
import { PolicyBlockedDialog } from '@/widgets/modal/policyBlockedDialog'
import { IdeWorkspace } from './IdeWorkspace'

type FeedbackEntry = {
  id: string
  at: string
  stepNo: number
  result: SubmitResult['result'] | 'ERROR'
  message: string
}

const extractAssignedVars = (source: string) => {
  return Array.from(new Set(source.match(/\b[a-zA-Z_]\w*(?=\s*=)/g) ?? []))
}

export function SessionPage() {
  const { sessionId = 'demo-001' } = useParams()

  const { data } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => apiClient.getSession(sessionId),
  })
  const { steps, openStep, progress, hydrateSteps } = useSessionPlayer(data?.steps ?? [])
  const { formatted } = useSessionTimer(data?.timerSec ?? 0, data?.mode === 'Mock')

  const [code, setCode] = useState('answer02 = df.fillna(0)')
  const [logs, setLogs] = useState<string[]>([])
  const [policyError, setPolicyError] = useState('')
  const [runCount, setRunCount] = useState(0)
  const [lastRunMs, setLastRunMs] = useState(0)
  const [feedbackHistory, setFeedbackHistory] = useState<FeedbackEntry[]>([])
  const modeForEvent = data?.mode ?? 'Practice+'

  useEffect(() => {
    if (data?.steps?.length) hydrateSteps(data.steps)
  }, [data?.steps, hydrateSteps])

  const activeStep = useMemo(() => openStep ?? steps[0], [openStep, steps])

  const submitMutation = useMutation({
    mutationFn: () => apiClient.submitStep(sessionId, code),
    onSuccess: (result) => {
      const now = new Date().toLocaleTimeString('ko-KR', { hour12: false })
      if (result.errorCodes.includes('POLICY_BLOCKED')) {
        recordOutcomeEvent({
          sessionId,
          mode: modeForEvent,
          result: 'FAIL',
          errorCodes: ['POLICY_BLOCKED'],
        })
        setPolicyError('POLICY_BLOCKED')
        toast({
          tone: 'error',
          title: '정책 위반 감지',
          description: '허용되지 않은 접근 패턴으로 제출이 차단되었습니다.',
        })
        setFeedbackHistory((prev) => [
          {
            id: `${Date.now()}-policy`,
            at: now,
            stepNo: activeStep?.no ?? 0,
            result: 'FAIL',
            message: '정책 위반으로 제출이 차단되었습니다.',
          },
          ...prev,
        ])
        return
      }

      const resultMessage =
        result.result === 'PASS'
          ? '정답 처리되었습니다.'
          : result.result === 'PARTIAL'
            ? '부분 정답입니다. 보완 후 재제출하세요.'
            : '오답입니다. 변수 선언/타입을 다시 확인하세요.'

      setLogs((prev) => [...prev, `[${result.result}] ${resultMessage}`])
      recordOutcomeEvent({
        sessionId,
        mode: modeForEvent,
        result: result.result,
        errorCodes: result.errorCodes,
      })
      toast({
        tone: result.result === 'PASS' ? 'success' : result.result === 'PARTIAL' ? 'info' : 'error',
        title: `Step ${activeStep?.no ?? '-'} 제출 결과: ${result.result}`,
        description: resultMessage,
      })
      setFeedbackHistory((prev) => [
        {
          id: `${Date.now()}-submit`,
          at: now,
          stepNo: activeStep?.no ?? 0,
          result: result.result,
          message: result.errorCodes.length
            ? `${resultMessage} (${result.errorCodes.join(', ')})`
            : resultMessage,
        },
        ...prev,
      ])
      hydrateSteps(result.nextSteps)
    },
    onError: (err) => {
      const now = new Date().toLocaleTimeString('ko-KR', { hour12: false })
      setLogs((prev) => [...prev, `[ERROR] Submission failed: ${err.message}`])
      recordOutcomeEvent({
        sessionId,
        mode: modeForEvent,
        result: 'ERROR',
        errorCodes: [],
      })
      toast({
        tone: 'error',
        title: '제출 실패',
        description: err.message,
      })
      setFeedbackHistory((prev) => [
        {
          id: `${Date.now()}-error`,
          at: now,
          stepNo: activeStep?.no ?? 0,
          result: 'ERROR',
          message: err.message,
        },
        ...prev,
      ])
    },
  })

  const handleRun = () => {
    const simulatedMs = Math.max(120, Math.min(1800, Math.round(code.length * 3.2)))
    setRunCount((prev) => prev + 1)
    setLastRunMs(simulatedMs)
    setLogs((prev) => [
      ...prev,
      '[RUN] Executing code in sandbox runtime...',
      `> ${code.split('\n')[0]}...`,
    ])
    setTimeout(() => {
      setLogs((prev) => [
        ...prev,
        `[OUT] Runtime ${simulatedMs}ms`,
        '[OUT] DataFrame shape: (100, 5)',
        '[OUT] Missing values handled',
      ])
    }, 650)
  }

  if (!data || !activeStep) {
    return (
      <div className="flex h-full w-full flex-col gap-3 p-4">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="grid flex-1 grid-cols-[1.2fr_1.4fr_1fr] gap-3">
          <Skeleton className="h-full rounded-xl" />
          <Skeleton className="h-full rounded-xl" />
          <Skeleton className="h-full rounded-xl" />
        </div>
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    )
  }

  const assignedVars = extractAssignedVars(code)
  const missingVars = activeStep.requiredVars.filter((variable) => !assignedVars.includes(variable))
  const variableScore = activeStep.requiredVars.length
    ? Math.max(
        0,
        Math.round(((activeStep.requiredVars.length - missingVars.length) / activeStep.requiredVars.length) * 100),
      )
    : 100
  const requiredVars = activeStep.requiredVars.join(', ')
  const instruction = `# Step ${activeStep.no}: ${activeStep.title}\n\n1) \`df\` 전처리 결과를 확인하세요.\n2) 답안 변수(\`${requiredVars}\`)를 정확히 선언하세요.\n3) 코드 실행 후 제출해 채점 결과를 확인하세요.`

  return (
    <>
      <IdeWorkspace
        sessionId={sessionId}
        mode={data.mode}
        policy={data.policy}
        activeStep={activeStep.no}
        instruction={instruction}
        code={code}
        onCodeChange={(val) => setCode(val || '')}
        steps={steps}
        progress={progress}
        timerLabel={formatted}
        logs={logs}
        runCount={runCount}
        lastRunMs={lastRunMs}
        variableCheck={{
          required: activeStep.requiredVars,
          assigned: assignedVars,
          missing: missingVars,
          score: variableScore,
        }}
        feedbackHistory={feedbackHistory.slice(0, 6)}
        onRun={handleRun}
        onSubmit={() => submitMutation.mutate()}
        isRunning={submitMutation.isPending}
      />

      <PolicyBlockedDialog
        open={Boolean(policyError)}
        errorCode={policyError}
        onClose={() => setPolicyError('')}
      />
    </>
  )
}

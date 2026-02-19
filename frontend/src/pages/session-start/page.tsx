import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { sessionStartSchema, type SessionStartForm } from '@/features/session/sessionStartSchema'
import { apiClient } from '@/shared/api/client'
import { Surface } from '@/widgets/cards/surface'

export function SessionStartPage() {
  const navigate = useNavigate()
  const { labId = 'lab-pipeline-01' } = useParams()

  const form = useForm<SessionStartForm>({
    resolver: zodResolver(sessionStartSchema),
    defaultValues: {
      mode: 'Practice+',
      policy: 'ALLOWLIST_ONLY',
      consent: false,
    },
  })

  const startMutation = useMutation({
    mutationFn: async (values: SessionStartForm) => apiClient.startSession({ labId, ...values }),
    onSuccess: ({ sessionId }) => {
      navigate(`/aice/session/${sessionId}`)
    },
  })

  return (
    <Surface title="세션 시작 / 환경 체크">
      <form className="grid gap-4" onSubmit={form.handleSubmit((values) => startMutation.mutate(values))}>
        <label className="grid gap-1 text-sm">
          Mode
          <select className="rounded border border-stone-300 bg-white p-2" {...form.register('mode')}>
            <option value="Practice">Practice</option>
            <option value="Practice+">Practice+</option>
            <option value="Mock">Mock</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          Policy
          <select className="rounded border border-stone-300 bg-white p-2" {...form.register('policy')}>
            <option value="OPEN">OPEN</option>
            <option value="ALLOWLIST_ONLY">ALLOWLIST_ONLY</option>
            <option value="RESTRICTED">RESTRICTED</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...form.register('consent')} /> 규칙을 읽고 이해했습니다
        </label>
        {form.formState.errors.consent ? <p className="text-sm text-red-600">{form.formState.errors.consent.message}</p> : null}

        <button className="w-fit rounded-md bg-stone-900 px-3 py-2 text-sm text-white" disabled={startMutation.isPending}>
          {startMutation.isPending ? '세션 생성 중...' : '세션 시작'}
        </button>
      </form>
    </Surface>
  )
}

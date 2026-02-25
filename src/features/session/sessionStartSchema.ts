import { z } from 'zod'

export const sessionStartSchema = z.object({
  mode: z.enum(['Practice', 'Practice+', 'Mock']),
  policy: z.enum(['OPEN', 'ALLOWLIST_ONLY', 'RESTRICTED']),
  consent: z.boolean().refine((value) => value, { message: '규칙 동의가 필요합니다.' }),
})

export type SessionStartForm = z.infer<typeof sessionStartSchema>

import { Surface } from '@/widgets/cards/surface'

export function AdminErrorsPage() {
  return (
    <Surface title="오류코드 관리">
      <ul className="space-y-2 text-sm">
        <li>ANSWER_VAR_MISSING</li>
        <li>ANSWER_VAR_TYPE_MISMATCH</li>
        <li>POLICY_BLOCKED</li>
      </ul>
    </Surface>
  )
}

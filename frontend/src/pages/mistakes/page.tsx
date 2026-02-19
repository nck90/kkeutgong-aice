import { Surface } from '@/widgets/cards/surface'

export function MistakesPage() {
  return (
    <Surface title="실수 교정">
      <ul className="space-y-2 text-sm">
        <li>ANSWER_VAR_MISSING</li>
        <li>ANSWER_VAR_TYPE_MISMATCH</li>
        <li>EXEC_TIMEOUT</li>
      </ul>
    </Surface>
  )
}

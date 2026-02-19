import { Surface } from '@/widgets/cards/surface'

export function ReviewPage() {
  return (
    <Surface title="세션 리뷰">
      <ul className="space-y-2 text-sm">
        <li>Step 1 PASS (12m)</li>
        <li>Step 2 FAIL (ANSWER_VAR_TYPE_MISMATCH)</li>
        <li>Step 3 OPEN</li>
      </ul>
    </Surface>
  )
}

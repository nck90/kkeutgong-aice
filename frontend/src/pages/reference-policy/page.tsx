import { Surface } from '@/widgets/cards/surface'

export function ReferencePolicyPage() {
  return (
    <Surface title="정책별 허용 범위">
      <ul className="space-y-2 text-sm">
        <li>Practice: OPEN 허용</li>
        <li>Practice+: ALLOWLIST_ONLY 권장</li>
        <li>Mock: ALLOWLIST_ONLY 고정</li>
      </ul>
    </Surface>
  )
}

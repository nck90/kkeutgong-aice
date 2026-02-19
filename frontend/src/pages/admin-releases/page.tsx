import { Surface } from '@/widgets/cards/surface'

export function AdminReleasesPage() {
  return (
    <Surface title="배포/버전 관리">
      <ul className="space-y-2 text-sm">
        <li className="rounded border border-stone-200 bg-stone-50 p-2">v1.3.0 · PUBLISHED · 2026-02-18</li>
        <li className="rounded border border-stone-200 bg-stone-50 p-2">v1.2.4 · ROLLBACK 가능</li>
      </ul>
    </Surface>
  )
}

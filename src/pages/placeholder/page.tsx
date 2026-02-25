import { Surface } from '@/widgets/cards/surface'

export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <Surface title={title}>
      <p className="text-sm text-stone-600">
        {description ?? '이 화면은 Sprint 1에서 라우팅/레이아웃 기준으로 연결된 플레이스홀더입니다.'}
      </p>
    </Surface>
  )
}

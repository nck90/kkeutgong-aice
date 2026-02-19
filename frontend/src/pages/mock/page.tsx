import { Link } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

export function MockPage() {
  return (
    <Surface title="모의시험">
      <p className="text-sm text-stone-600">시간 제한, 힌트 제한, 허용문서만 정책 시뮬레이션</p>
      <Link className="mt-3 inline-block rounded-md bg-stone-900 px-3 py-2 text-sm text-white" to="/aice/mock/setup">
        모의 시작
      </Link>
    </Surface>
  )
}

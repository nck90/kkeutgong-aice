import { Link } from 'react-router-dom'
import { Surface } from '@/widgets/cards/surface'

export function MockConsentPage() {
  return (
    <Surface title="모의 규칙 동의">
      <ul className="space-y-2 text-sm">
        <li>지정 셀 외 작성 금지</li>
        <li>허용문서 외 참고 금지</li>
        <li>시간 종료 시 자동 제출</li>
      </ul>
      <Link className="mt-3 inline-block rounded-md bg-stone-900 px-3 py-2 text-sm text-white" to="/aice/mock/session/mock-001">
        모의 시작
      </Link>
    </Surface>
  )
}

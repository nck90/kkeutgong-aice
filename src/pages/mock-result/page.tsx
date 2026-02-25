import { Surface } from '@/widgets/cards/surface'

export function MockResultPage() {
  return (
    <Surface title="모의시험 결과">
      <div className="grid gap-2 md:grid-cols-4">
        <div className="rounded border p-2 text-sm">총점: 76</div>
        <div className="rounded border p-2 text-sm">실패 스텝: 2</div>
        <div className="rounded border p-2 text-sm">Top 실수: EXEC_TIMEOUT</div>
        <div className="rounded border p-2 text-sm">추천: D-7 플랜</div>
      </div>
    </Surface>
  )
}

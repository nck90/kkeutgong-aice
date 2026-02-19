import { Link } from 'react-router-dom'
import { useAppModeStore } from '@/features/ui/model/useAppModeStore'
import { Surface } from '@/widgets/cards/surface'

export function HomePage() {
  const mode = useAppModeStore((state) => state.mode)
  const setMode = useAppModeStore((state) => state.setMode)

  return (
    <Surface title="AICE Home" right={<span className="rounded-full border px-2 py-1 text-xs">Current: {mode}</span>}>
      <p className="mb-3 text-sm text-stone-600">더미데이터 기반 프론트 데모 (Sprint 1 IA 반영)</p>
      <div className="mb-3 flex flex-wrap gap-2">
        {(['Practice', 'Practice+', 'Mock'] as const).map((item) => (
          <button
            key={item}
            className={`rounded-md px-3 py-2 text-sm ${mode === item ? 'bg-stone-900 text-white' : 'border border-stone-300 bg-white'}`}
            onClick={() => setMode(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Link className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white" to="/aice/plan">
          내 플랜 보기
        </Link>
        <Link className="rounded-md border border-stone-300 bg-white px-3 py-2 text-sm" to="/aice/labs">
          Labs 보기
        </Link>
      </div>
    </Surface>
  )
}

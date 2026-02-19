import { Surface } from '@/widgets/cards/surface'

const items = ['pandas 로딩/기초', '결측/이상치 처리', 'train_test_split/스케일링', 'MAE/MSE 이해', '그래프 해석']

export function DiagnosticPage() {
  return (
    <Surface title="초기 진단 (10~15분)">
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </Surface>
  )
}

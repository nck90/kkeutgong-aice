import { Surface } from '@/widgets/cards/surface'

const docs = [
  ['pd-merge', 'Pandas merge/join', '허용'],
  ['skl-split', 'sklearn train_test_split', '허용'],
  ['external-blog', '임의 외부 블로그', '차단'],
] as const

export function ReferencePage() {
  return (
    <Surface title="허용문서 목록">
      <ul className="space-y-2 text-sm">
        {docs.map(([id, title, allowed]) => (
          <li className="rounded border border-stone-200 bg-stone-50 p-2" key={id}>
            {title} · {allowed}
          </li>
        ))}
      </ul>
    </Surface>
  )
}

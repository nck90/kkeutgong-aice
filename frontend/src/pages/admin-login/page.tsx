import { Surface } from '@/widgets/cards/surface'

export function AdminLoginPage() {
  return (
    <Surface title="관리자 로그인">
      <div className="grid gap-2 md:max-w-sm">
        <input className="rounded border border-stone-300 p-2 text-sm" placeholder="email" type="email" />
        <input className="rounded border border-stone-300 p-2 text-sm" placeholder="password" type="password" />
        <button className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white">로그인</button>
      </div>
    </Surface>
  )
}

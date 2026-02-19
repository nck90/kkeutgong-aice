import type { PropsWithChildren, ReactNode } from 'react'

export function Surface({ title, right, children }: PropsWithChildren<{ title: string; right?: ReactNode }>) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <header className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">{title}</h2>
        {right}
      </header>
      {children}
    </section>
  )
}

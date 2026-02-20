import type { PropsWithChildren, ReactNode } from 'react'

export function Surface({ title, right, children }: PropsWithChildren<{ title: string; right?: ReactNode }>) {
  return (
    <section className="glass-panel rounded-2xl p-5 md:p-6">
      <header className="mb-5 flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {right}
      </header>
      {children}
    </section>
  )
}

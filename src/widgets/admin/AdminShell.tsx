import type { PropsWithChildren, ReactNode } from 'react'
import { BarChart3, BookCopy, Database, FileWarning, FlaskRound, GitBranch, NotepadTextDashed, Shield, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Badge } from '@/shared/ui/badge'
import { Card, CardContent } from '@/shared/ui/card'
import { cn } from '@/shared/lib/utils'

const navItems = [
  { to: '/admin', label: 'Overview', icon: Sparkles },
  { to: '/admin/labs', label: 'Labs', icon: BookCopy },
  { to: '/admin/notebooks', label: 'Notebooks', icon: NotepadTextDashed },
  { to: '/admin/datasets', label: 'Datasets', icon: Database },
  { to: '/admin/grading', label: 'Grading', icon: FlaskRound },
  { to: '/admin/policy', label: 'Policy', icon: Shield },
  { to: '/admin/errors', label: 'Errors', icon: FileWarning },
  { to: '/admin/releases', label: 'Releases', icon: GitBranch },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

export function AdminShell({
  title,
  subtitle,
  right,
  children,
}: PropsWithChildren<{ title: string; subtitle: string; right?: ReactNode }>) {
  const location = useLocation()

  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-slate-900/80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 text-white md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">Operations Console</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-slate-200 md:text-base">{subtitle}</p>
          </div>
          {right}
        </div>
      </section>

      <Card className="rounded-2xl border-border/80 bg-white/90">
        <CardContent className="flex flex-wrap gap-2 p-3">
          {navItems.map((item) => {
            const active = location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-colors',
                  active
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200',
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            )
          })}
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-4">
        <StatCard label="Draft Labs" value="8" tone="amber" />
        <StatCard label="Published" value="22" tone="sky" />
        <StatCard label="Top Error" value="ANSWER_VAR_MISSING" tone="rose" />
        <StatCard label="Completion" value="61%" tone="emerald" />
      </div>

      {children}
    </div>
  )
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string
  value: string
  tone: 'amber' | 'sky' | 'rose' | 'emerald'
}) {
  const tones = {
    amber: 'bg-amber-50 border-amber-100 text-amber-800',
    sky: 'bg-sky-50 border-sky-100 text-sky-800',
    rose: 'bg-rose-50 border-rose-100 text-rose-800',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-800',
  } as const

  return (
    <article className={cn('rounded-xl border px-3 py-3', tones[tone])}>
      <p className="text-[11px] font-semibold uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
      <Badge variant="outline" className="mt-2 bg-white/70 text-[11px]">
        live mock
      </Badge>
    </article>
  )
}

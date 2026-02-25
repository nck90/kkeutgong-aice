import { CheckCircle2, Info, TriangleAlert, X } from 'lucide-react'
import { useToastStore } from '@/shared/lib/toast'
import { cn } from '@/shared/lib/utils'

export function Toaster() {
  const items = useToastStore((state) => state.items)
  const dismiss = useToastStore((state) => state.dismiss)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(92vw,360px)] flex-col gap-2">
      {items.map((item) => (
        <article
          key={item.id}
          className={cn(
            'pointer-events-auto rounded-xl border bg-white/95 p-3 shadow-lg backdrop-blur',
            item.tone === 'success' && 'border-emerald-200',
            item.tone === 'error' && 'border-rose-200',
            item.tone === 'info' && 'border-slate-200',
          )}
        >
          <div className="flex items-start gap-2">
            <span className="mt-0.5">
              {item.tone === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : item.tone === 'error' ? (
                <TriangleAlert className="h-4 w-4 text-rose-600" />
              ) : (
                <Info className="h-4 w-4 text-slate-600" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              {item.description ? <p className="mt-1 text-xs text-slate-600">{item.description}</p> : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(item.id)}
              className="inline-flex h-5 w-5 items-center justify-center rounded text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="dismiss toast"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

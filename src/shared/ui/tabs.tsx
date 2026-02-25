import { createContext, useContext, useState, type ReactNode } from 'react'
import { cn } from '@/shared/lib/utils'

type TabsContextValue = {
  value: string
  setValue: (next: string) => void
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used inside <Tabs />')
  }
  return context
}

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}: {
  defaultValue: string
  value?: string
  onValueChange?: (next: string) => void
  className?: string
  children: ReactNode
}) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const setValue = (next: string) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }

  const context: TabsContextValue = { value: current, setValue }

  return (
    <TabsContext.Provider value={context}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('inline-flex h-9 items-center rounded-md bg-slate-800 p-1', className)}>
      {children}
    </div>
  )
}

export function TabsTrigger({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: ReactNode
}) {
  const ctx = useTabsContext()
  const active = ctx.value === value

  return (
    <button
      type="button"
      onClick={() => ctx.setValue(value)}
      className={cn(
        'inline-flex items-center rounded px-2.5 py-1 text-xs font-semibold transition-colors',
        active ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white',
        className,
      )}
    >
      {children}
    </button>
  )
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string
  className?: string
  children: ReactNode
}) {
  const ctx = useTabsContext()
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}

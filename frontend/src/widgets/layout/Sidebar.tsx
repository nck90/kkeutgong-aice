/* 
  Deprecating Global Sidebar for Home/Dashboard.
  Elice uses a Sidebar ONLY for the Learning/Lecture pages.
  This file is kept for backward compatibility if needed, but the new design moves navigation to the Top Header.
*/

import { cn } from '@/shared/lib/utils'

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-[260px] bg-white border-r border-[#E5E8EB] transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:hidden', // Only show on mobile if toggled
        )}
      >
        <div className="p-5 font-bold text-lg">Menu</div>
        {/* Mobile menu items would go here */}
      </aside>
    </>
  )
}

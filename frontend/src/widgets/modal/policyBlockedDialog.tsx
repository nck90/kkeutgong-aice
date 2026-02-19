import * as Dialog from '@radix-ui/react-dialog'

type Props = {
  open: boolean
  errorCode: string
  onClose: () => void
}

export function PolicyBlockedDialog({ open, errorCode, onClose }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border border-stone-200 bg-white p-4 shadow-lg">
          <Dialog.Title className="text-base font-semibold">정책 위반으로 제출이 차단되었습니다</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-stone-600">
            오류코드: {errorCode}. 금지 import 또는 외부 네트워크 접근을 제거한 뒤 다시 제출하세요.
          </Dialog.Description>
          <div className="mt-4 flex justify-end">
            <button className="rounded-md bg-stone-900 px-3 py-2 text-sm text-white" onClick={onClose}>
              확인
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

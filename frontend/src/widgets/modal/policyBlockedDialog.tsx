import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { AlertTriangle } from "lucide-react"

interface PolicyBlockedDialogProps {
  open: boolean
  errorCode: string
  onClose: () => void
}

export function PolicyBlockedDialog({ open, errorCode, onClose }: PolicyBlockedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
          </div>
          <DialogTitle className="text-center text-xl">제출이 차단되었습니다</DialogTitle>
          <DialogDescription className="text-center pt-2">
            보안 정책 위반이 감지되었습니다.<br />
            허용되지 않은 라이브러리나 네트워크 요청이 포함되어 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 text-center">
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            Error Code: {errorCode}
          </span>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button type="button" variant="secondary" className="w-full sm:w-auto" onClick={onClose}>
            확인 및 수정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

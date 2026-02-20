import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { ShieldCheck } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getAuthSession, login } from '@/shared/api/auth'
import { toast } from '@/shared/lib/toast'
import { HttpError } from '@/shared/api/http-client'
import { Button } from '@/shared/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { Input } from '@/shared/ui/input'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const redirectTo = useMemo(() => {
    const next = searchParams.get('next')
    return next && next.startsWith('/') ? next : '/admin'
  }, [searchParams])

  useEffect(() => {
    const session = getAuthSession()
    if (session?.user.role === 'ADMIN') {
      navigate(redirectTo, { replace: true })
    }
  }, [navigate, redirectTo])

  const loginMutation = useMutation({
    mutationFn: async () => login(email.trim(), password),
    onSuccess: (session) => {
      if (session.user.role !== 'ADMIN') {
        setError('관리자 권한 계정으로 로그인해주세요.')
        toast({
          tone: 'error',
          title: '권한 부족',
          description: '관리자 권한 계정으로 로그인해주세요.',
        })
        return
      }

      toast({
        tone: 'success',
        title: '로그인 성공',
        description: '관리자 콘솔로 이동합니다.',
      })
      navigate(redirectTo, { replace: true })
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        if (err.status === 401) {
          setError('이메일 또는 비밀번호가 올바르지 않습니다.')
          return
        }
        setError(err.message || '로그인 요청 중 오류가 발생했습니다.')
        return
      }
      setError('로그인 요청 중 오류가 발생했습니다.')
    },
  })

  const submit = () => {
    if (!email.trim() || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    setError(null)
    loginMutation.mutate()
  }

  return (
    <div className="mx-auto mt-12 max-w-md">
      <Card className="rounded-3xl border-border/80 bg-white/95 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-2xl">Admin Console Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="admin@aice.dev"
            type="email"
            className="h-11 rounded-xl"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            className="h-11 rounded-xl"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') submit()
            }}
          />
          {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
          <Button
            className="h-11 w-full rounded-xl font-semibold"
            onClick={submit}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

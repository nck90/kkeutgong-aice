import { apiRequest } from './http-client'

const AUTH_KEY = 'aice_auth'

type AuthSession = {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: 'USER' | 'ADMIN'
  }
}

export async function login(email: string, password: string): Promise<AuthSession> {
  const session = await apiRequest<AuthSession>('/api/auth/login', {
    method: 'POST',
    body: { email, password },
  })

  setAuthSession(session)
  return session
}

export async function register(email: string, password: string, name: string): Promise<AuthSession> {
  const session = await apiRequest<AuthSession>('/api/auth/register', {
    method: 'POST',
    body: { email, password, name },
  })

  setAuthSession(session)
  return session
}

export function setAuthSession(session: AuthSession) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(session))
}

export function getAuthSession(): AuthSession | null {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function getAccessToken(): string | null {
  return getAuthSession()?.token ?? null
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_KEY)
}

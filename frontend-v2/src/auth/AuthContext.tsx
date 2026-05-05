import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { tokenStorage } from '@/api/client'
import * as authApi from '@/api/auth'
import { decodeJwt, isTokenExpired, roleBucket } from './jwt'
import type { JwtPayload } from '@/api/types'

type RoleBucket = 'super_admin' | 'office_owner' | 'employee'

export interface AuthUser extends JwtPayload {
  role: RoleBucket
}

interface PendingLogin {
  username: string
  password: string
}

interface AuthState {
  user: AuthUser | null
  loading: boolean
  pending: PendingLogin | null
}

interface AuthContextValue extends AuthState {
  beginLogin: (username: string, password: string) => Promise<{ otp?: string }>
  completeLogin: (otp: string) => Promise<AuthUser>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (allowed: RoleBucket[]) => boolean
}

const Ctx = createContext<AuthContextValue | null>(null)

function loadInitial(): AuthUser | null {
  const raw = tokenStorage.getUserJSON()
  if (!raw) return null
  try {
    const u = JSON.parse(raw) as AuthUser
    const t = tokenStorage.get()
    if (!t) return null
    const decoded = decodeJwt(t)
    if (!decoded || isTokenExpired(decoded)) {
      tokenStorage.clearAll()
      return null
    }
    return u
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const [state, setState] = useState<AuthState>(() => ({
    user: loadInitial(),
    loading: false,
    pending: null,
  }))

  // If the token has expired between sessions, force logout
  useEffect(() => {
    const t = tokenStorage.get()
    if (!t) return
    const decoded = decodeJwt(t)
    if (!decoded || isTokenExpired(decoded)) {
      tokenStorage.clearAll()
      setState((s) => ({ ...s, user: null }))
    }
  }, [])

  const beginLogin = useCallback(async (username: string, password: string) => {
    setState((s) => ({ ...s, loading: true }))
    try {
      const res = await authApi.login({ username, password })
      setState((s) => ({ ...s, pending: { username, password } }))
      return { otp: res.otp }
    } finally {
      setState((s) => ({ ...s, loading: false }))
    }
  }, [])

  const completeLogin = useCallback(
    async (otp: string): Promise<AuthUser> => {
      setState((s) => ({ ...s, loading: true }))
      try {
        const pending = state.pending
        if (!pending) throw new Error('No pending login. Submit credentials first.')
        const tokens = await authApi.verifyLogin({
          username: pending.username,
          password: pending.password,
          otp,
        })

        tokenStorage.set(tokens.access_token)
        if (tokens.refresh_token) tokenStorage.setRefresh(tokens.refresh_token)

        const decoded = decodeJwt(tokens.access_token)
        if (!decoded) throw new Error('Could not decode token from server.')

        const user: AuthUser = { ...decoded, role: roleBucket(decoded.roles) }
        tokenStorage.setUserJSON(JSON.stringify(user))
        setState({ user, loading: false, pending: null })

        navigate(user.role === 'super_admin' ? '/admin' : '/office')
        return user
      } catch (e) {
        setState((s) => ({ ...s, loading: false }))
        throw e
      }
    },
    [state.pending, navigate],
  )

  const logout = useCallback(() => {
    tokenStorage.clearAll()
    setState({ user: null, loading: false, pending: null })
    navigate('/login')
  }, [navigate])

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      isAuthenticated: !!state.user,
      hasRole: (allowed) => !!state.user && allowed.includes(state.user.role),
      beginLogin,
      completeLogin,
      logout,
    }),
    [state, beginLogin, completeLogin, logout],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAuth() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useAuth must be used inside <AuthProvider>')
  return v
}

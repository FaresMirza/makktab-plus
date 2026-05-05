import type { JwtPayload } from '@/api/types'

export function decodeJwt(token: string): JwtPayload | null {
  try {
    const [, payload] = token.split('.')
    if (!payload) return null
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    )
    return JSON.parse(json) as JwtPayload
  } catch {
    return null
  }
}

export function isTokenExpired(payload: JwtPayload | null): boolean {
  if (!payload?.exp) return false
  return payload.exp * 1000 < Date.now()
}

// Convert backend roles → UI role bucket
export function roleBucket(roles: string[] | undefined): 'super_admin' | 'office_owner' | 'employee' {
  const list = roles || []
  if (list.includes('super_admin') || list.includes('admin')) return 'super_admin'
  if (list.includes('owner') || list.includes('office_owner') || list.includes('manager')) return 'office_owner'
  return 'employee'
}

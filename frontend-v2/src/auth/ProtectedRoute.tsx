import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface Props {
  allow?: ('super_admin' | 'office_owner' | 'employee')[]
}

export function ProtectedRoute({ allow }: Props) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  if (allow && user && !allow.includes(user.role)) {
    return <Navigate to={user.role === 'super_admin' ? '/admin' : '/office'} replace />
  }
  return <Outlet />
}

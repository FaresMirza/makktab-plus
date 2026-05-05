import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'
import styles from './ProtectedRoute.module.css'

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <i className={`pi pi-spin pi-spinner ${styles.spinner}`}></i>
        <p className={styles.loadingText}>جاري التحميل...</p>
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!currentUser || currentUser.status !== 'Active') {
    return <Navigate to="/login" replace />
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on role
    if (currentUser.role === 'super_admin') {
      return <Navigate to="/admin/dashboard" replace />
    } else {
      return <Navigate to="/office/dashboard" replace />
    }
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}

export default ProtectedRoute

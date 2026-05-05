import { useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../context/AuthContext'
import styles from './AdminSidebar.module.css'

const menuItems = [
  { label: 'لوحة التحكم', icon: 'pi pi-chart-bar', path: '/admin/dashboard' },
  { label: 'طلبات المكاتب المعلقة', icon: 'pi pi-clock', path: '/admin/pending-offices' },
  { label: 'إدارة المكاتب', icon: 'pi pi-building', path: '/admin/offices' },
  { label: 'سجلات الأمان', icon: 'pi pi-shield', path: '/admin/logs' },
  { label: 'إدارة المدراء', icon: 'pi pi-users', path: '/admin/admins-list' },
  { label: 'إضافة مدير', icon: 'pi pi-user-plus', path: '/admin/add-admin' },
]

function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const getDisplayName = () => {
    if (!currentUser) return 'Super Admin'
    return currentUser.username || currentUser.fullName || 'Super Admin'
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <i className={`pi pi-shield ${styles.logoIcon}`}></i>
        <h2 className={styles.logoText}>{getDisplayName()}</h2>
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <div
              key={item.path}
              className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
              onClick={() => navigate(item.path)}
            >
              <i className={`${item.icon} ${styles.menuIcon}`}></i>
              <span>{item.label}</span>
            </div>
          )
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        <i className="pi pi-power-off"></i>
        <span>تسجيل الخروج</span>
      </button>
    </aside>
  )
}

AdminSidebar.propTypes = {}

export default AdminSidebar

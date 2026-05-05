import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { Avatar } from 'primereact/avatar'
import { useAuth } from '../../context/AuthContext'
import styles from './Sidebar.module.css'

const navItems = [
  { label: 'لوحة التحكم', key: 'dashboard', path: '/office/dashboard', icon: 'pi-th-large' },
  { label: 'المشاريع', key: 'projects', path: '/office/projects', icon: 'pi-check-square' },
  { label: 'الموظفين', key: 'users', path: '/office/users', icon: 'pi-users' },
  { label: 'مهامي', key: 'my-tasks', path: '/office/my-tasks', icon: 'pi-table' },
  { label: 'الاشعارات', key: 'announcements', path: '/office/announcements', icon: 'pi-bell' },
  { label: 'الإعدادات', key: 'settings', path: '/office/settings', icon: 'pi-cog' },
]

function Sidebar({ onSelect }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()

  const getRoleLabel = () => {
    if (currentUser?.role === 'office_owner') return '(صاحب المكتب)'
    if (currentUser?.role === 'employee') return '(موظف)'
    return ''
  }

  // Filter nav items based on user role
  const getFilteredNavItems = () => {
    return navItems.filter((item) => {
      // Only office_owner can see users management
      if (item.key === 'users') {
        return currentUser?.role === 'office_owner'
      }
      return true
    })
  }

  const filteredNavItems = getFilteredNavItems()

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <aside className={styles.container}>
      <div className={styles.userProfile}>
        <Avatar
          label={(currentUser?.fullName || currentUser?.username)?.charAt(0) || 'U'}
          shape="circle"
          className={styles.avatar}
          size="xlarge"
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>
            {currentUser?.fullName || currentUser?.username || 'مستخدم'}
          </span>
          <span className={styles.userRole}>{getRoleLabel()}</span>
        </div>
      </div>
      
      <nav className={styles.nav}>
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                navigate(item.path)
                onSelect?.(item.key)
              }}
              className={`${styles.navButton} ${isActive ? styles.navButtonActive : ''}`}
            >
              <i className={`pi ${item.icon}`} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className={styles.logoutButton}
      >
        <i className="pi pi-power-off" />
        <span>تسجيل الخروج</span>
      </button>
    </aside>
  )
}

Sidebar.propTypes = {
  onSelect: PropTypes.func,
}

export default Sidebar

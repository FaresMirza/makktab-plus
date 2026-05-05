import PropTypes from 'prop-types'
import AdminSidebar from '../components/common/AdminSidebar'
import styles from './AdminLayout.module.css'

function AdminLayout({ children }) {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  )
}

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AdminLayout

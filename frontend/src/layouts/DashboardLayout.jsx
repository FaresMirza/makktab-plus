import PropTypes from 'prop-types'
import Sidebar from '../components/common/Sidebar'
import styles from './DashboardLayout.module.css'

function DashboardLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
}

export default DashboardLayout

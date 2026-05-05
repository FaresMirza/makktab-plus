import PropTypes from 'prop-types'
import styles from './AuthLayout.module.css'

function AuthLayout({ children }) {
  return (
    <div className={styles.shell}>
      <div className={styles.formCard}>{children}</div>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node,
}

export default AuthLayout

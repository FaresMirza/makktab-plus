import PropTypes from 'prop-types'
import logoImage from '../../assets/شعار1.png'
import styles from './AuthLayout.module.css'

function AuthLayout({ children }) {
  return (
    <div className={styles.container}>
      {/* Right Side - Form */}
      <div className={styles.rightSection}>
        {children}
      </div>

      {/* Left Side - Logo */}
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <img src={logoImage} alt="مكتب بلس" className={styles.logoImage} />
        </div>
      </div>
    </div>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthLayout

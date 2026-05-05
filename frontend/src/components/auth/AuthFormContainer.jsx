import PropTypes from 'prop-types'
import logoImage from '../../assets/شعار1.png'
import styles from './AuthFormContainer.module.css'

function AuthFormContainer({ children }) {
  return (
    <div className={styles.formContainer}>
      {/* Small Logo at Top Right */}
      <div className={styles.topLogoContainer}>
        <img src={logoImage} alt="شعار" className={styles.topLogo} />
      </div>
      
      {children}
    </div>
  )
}

AuthFormContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthFormContainer

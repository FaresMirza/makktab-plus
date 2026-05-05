import PropTypes from 'prop-types'
import { Password } from 'primereact/password'
import styles from './PasswordInput.module.css'

function PasswordInput({ id, label, value, onChange, placeholder, showForgotPassword, onForgotPassword }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.passwordWrapper}>
        <Password
          id={id}
          value={value}
          onChange={onChange}
          toggleMask
          feedback={false}
          inputStyle={{ width: '100%', padding: '12px 16px', fontSize: '15px', borderRadius: '8px', textAlign: 'right', paddingLeft: '3rem' }}
          placeholder={placeholder}
        />
      </div>
      {showForgotPassword && (
        <div className={styles.forgotPassword}>
          <span 
            className={styles.forgotLink}
            onClick={onForgotPassword}
          >
            نسيت كلمة المرور؟
          </span>
        </div>
      )}
    </div>
  )
}

PasswordInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showForgotPassword: PropTypes.bool,
  onForgotPassword: PropTypes.func,
}

PasswordInput.defaultProps = {
  showForgotPassword: false,
}

export default PasswordInput

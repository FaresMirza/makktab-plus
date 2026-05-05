import styles from './PasswordStrengthMeter.module.css'

/**
 * Password Strength Meter Component
 * Displays a visual indicator of password strength
 */
const PasswordStrengthMeter = ({ password, strength }) => {
  if (!password) return null

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{
            width: strength.width,
            backgroundColor: strength.color,
          }}
        />
      </div>
      <div
        className={styles.label}
        style={{ color: strength.color }}
      >
        {strength.label}
      </div>
    </div>
  )
}

export default PasswordStrengthMeter

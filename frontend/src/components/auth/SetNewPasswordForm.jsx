import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import PasswordInput from './PasswordInput'
import AuthFormHeader from './AuthFormHeader'
import styles from './SetNewPasswordForm.module.css'

function SetNewPasswordForm({ 
  newPassword, 
  setNewPassword, 
  confirmPassword, 
  setConfirmPassword,
  onSubmit, 
  loading,
  title = "تعيين كلمة مرور جديدة",
  subtitle = "اختر كلمة مرور قوية لحسابك"
}) {
  // Calculate password strength
  const getPasswordStrength = (password) => {
    if (!password) return { level: 0, label: '', color: '#e5e7eb', width: '0%' }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++
    
    if (strength <= 2) {
      return { level: 1, label: 'ضعيفة', color: '#ef4444', width: '33%' }
    } else if (strength <= 3) {
      return { level: 2, label: 'متوسطة', color: '#f59e0b', width: '66%' }
    } else {
      return { level: 3, label: 'قوية', color: '#10b981', width: '100%' }
    }
  }
  
  const passwordStrength = getPasswordStrength(newPassword)

  return (
    <>
      <AuthFormHeader title={title} subtitle={subtitle} />

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <PasswordInput
            id="newPassword"
            label="كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="كلمة المرور الجديدة"
            showForgotPassword={false}
          />
          
          {/* Custom Password Strength Meter */}
          <div className={styles.strengthMeterContainer}>
            <div className={styles.strengthMeterBar}>
              <div className={styles.strengthMeterFill} style={{
                width: passwordStrength.width,
                backgroundColor: passwordStrength.color,
              }} />
            </div>
            {newPassword && (
              <div className={styles.strengthLabel} style={{
                color: passwordStrength.color,
              }}>
                {passwordStrength.label}
              </div>
            )}
          </div>
        </div>

        <PasswordInput
          id="confirmPassword"
          label="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="تأكيد كلمة المرور"
          showForgotPassword={false}
        />

        <div className={styles.passwordHint}>
          <i className="pi pi-info-circle" />
          يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
        </div>

        <Button
          type="submit"
          label="حفظ"
          icon="pi pi-check"
          loading={loading}
          className="auth-primary-btn"
        />
      </form>
    </>
  )
}

SetNewPasswordForm.propTypes = {
  newPassword: PropTypes.string.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default SetNewPasswordForm

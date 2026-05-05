import { useState } from 'react'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import FormStepHeader from './FormStepHeader'
import PasswordStrengthMeter from './PasswordStrengthMeter'
import {
  validatePassword,
  validatePasswordMatch,
  getPasswordStrength,
} from '../../utils/validation'
import styles from './PasswordStepForm.module.css'

/**
 * Password Step Form Component
 * Second step of registration - sets password
 */
const PasswordStepForm = ({ onSubmit, onBack, showToast, loading }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      showToast('warn', 'بيانات ناقصة', 'يرجى إدخال كلمة المرور وتأكيدها')
      return
    }

    // Validate password
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      showToast('warn', 'كلمة مرور ضعيفة', passwordValidation.error)
      return
    }

    // Validate password match
    const matchValidation = validatePasswordMatch(password, confirmPassword)
    if (!matchValidation.isValid) {
      showToast('warn', 'كلمة المرور غير متطابقة', matchValidation.error)
      return
    }

    onSubmit(password)
  }

  return (
    <>
      <FormStepHeader
        title="تعيين كلمة المرور"
        subtitle="اختر كلمة مرور قوية لحسابك"
      />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            كلمة المرور
          </label>
          <div style={{ width: '100%' }}>
            <Password
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              inputClassName={styles.passwordInput}
              placeholder="كلمة المرور"
            />
          </div>

          <PasswordStrengthMeter password={password} strength={passwordStrength} />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            تأكيد كلمة المرور
          </label>
          <div style={{ width: '100%' }}>
            <Password
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              toggleMask
              feedback={false}
              inputClassName={styles.passwordInput}
              placeholder="تأكيد كلمة المرور"
            />
          </div>
        </div>

        <div className={styles.passwordHint}>
          <i className="pi pi-info-circle" />
          يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
        </div>

        <Button
          type="submit"
          label="التالي"
          icon="pi pi-arrow-left"
          className={styles.submitButton}
          loading={loading}
          disabled={loading}
        />

        <Button
          type="button"
          label="السابق"
          icon="pi pi-arrow-right"
          outlined
          onClick={onBack}
          className={styles.backButton}
          disabled={loading}
        />
      </form>
    </>
  )
}

export default PasswordStepForm

import { useState } from 'react'
import { InputOtp } from 'primereact/inputotp'
import { Button } from 'primereact/button'
import FormStepHeader from '../office-register/FormStepHeader'
import { useOtpTimer } from '../../hooks/useOtpTimer'
import { maskPhoneNumber } from '../../utils/validation'
import styles from './ActivateOtpStep.module.css'

/**
 * Activate OTP Step Component
 * For employee activation - verifies phone number via OTP
 */
const ActivateOtpStep = ({ 
  phone, 
  onVerify, 
  onBack, 
  onResend, 
  showToast, 
  loading,
  maxAttempts = 3,
  attemptsLeft 
}) => {
  const [otp, setOtp] = useState('')
  const { seconds, canResend, resetTimer, formatTimer } = useOtpTimer(90, true)

  const handleVerify = () => {
    if (!otp || otp.length !== 4) {
      showToast('warn', 'رمز غير مكتمل', 'يرجى إدخال رمز التحقق المكون من 4 أرقام')
      return
    }

    onVerify(otp)
  }

  const handleResend = () => {
    if (!canResend) return

    resetTimer()
    setOtp('')
    onResend()

    showToast('info', 'تم إعادة الإرسال', 'تم إرسال رمز جديد')
  }

  return (
    <>
      <FormStepHeader
        title="التحقق من رقم الجوال"
        subtitle={`تم إرسال رمز التحقق إلى ${maskPhoneNumber(phone)}`}
      />

      <div className={styles.container}>
        <div className={styles.otpWrapper}>
          <InputOtp
            value={otp}
            onChange={(e) => setOtp(e.value)}
            length={4}
            integerOnly
            disabled={loading || (attemptsLeft !== undefined && attemptsLeft <= 0)}
            style={{ gap: '12px' }}
          />
        </div>

        {attemptsLeft !== undefined && (
          <div className={styles.attemptsInfo}>
            <i className="pi pi-info-circle" style={{ marginRight: '4px' }} />
            <span style={{ direction: 'rtl', unicodeBidi: 'embed' }}>المحاولات المتبقية: {Math.max(attemptsLeft, 0)} من {maxAttempts}</span>
            
          </div>
        )}

        <p className={styles.resendText}>
          لم يصلك الرمز؟{' '}
          {canResend ? (
            <span onClick={handleResend} className={styles.resendLink}>
              إعادة الإرسال
            </span>
          ) : (
            <span className={styles.resendDisabled}>
              إعادة إرسال الرمز بعد {formatTimer(seconds)}
            </span>
          )}
        </p>

        <div className={styles.buttonGroup}>
          <Button
            label="تحقق والمتابعة"
            icon="pi pi-arrow-left"
            loading={loading}
            onClick={handleVerify}
            disabled={attemptsLeft !== undefined && attemptsLeft <= 0}
            className={styles.submitButton}
          />

          <Button
            label="السابق"
            icon="pi pi-arrow-right"
            outlined
            onClick={onBack}
            disabled={loading}
            className={styles.backButton}
          />
        </div>

        {attemptsLeft !== undefined && attemptsLeft <= 0 && (
          <div className={styles.lockedMessage}>
            لقد استنفدت جميع المحاولات. يرجى المحاولة لاحقاً أو التواصل مع الإدارة.
            <i className="pi pi-lock" style={{ marginRight: '6px' }} />
          </div>
        )}
      </div>
    </>
  )
}

export default ActivateOtpStep

import { useState } from 'react'
import { InputOtp } from 'primereact/inputotp'
import { Button } from 'primereact/button'
import FormStepHeader from './FormStepHeader'
import { useOtpTimer } from '../../hooks/useOtpTimer'
import { maskPhoneNumber } from '../../utils/validation'
import styles from './OtpVerificationStep.module.css'

/**
 * OTP Verification Step Component
 * Third step of registration - verifies phone number via OTP
 */
const OtpVerificationStep = ({ phone, onVerify, onBack, onResend, showToast, loading }) => {
  const [otp, setOtp] = useState('')
  const { seconds, canResend, resetTimer, formatTimer } = useOtpTimer(90, true)

  const handleVerify = () => {
    if (!otp || otp.length !== 6) {
      showToast('warn', 'رمز غير مكتمل', 'يرجى إدخال رمز التحقق المكون من 6 أرقام')
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
            length={6}
            integerOnly
            style={{ gap: '12px' }}
          />
        </div>

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
            label="تحقق"
            icon="pi pi-check"
            loading={loading}
            onClick={handleVerify}
            className={styles.submitButton}
          />

          <Button
            label="السابق"
            icon="pi pi-arrow-right"
            outlined
            onClick={onBack}
            className={styles.backButton}
          />
        </div>
      </div>
    </>
  )
}

export default OtpVerificationStep

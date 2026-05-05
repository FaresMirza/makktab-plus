import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import OtpInput from './OtpInput'
import AuthFormHeader from './AuthFormHeader'
import styles from './OtpVerificationForm.module.css'

function OtpVerificationForm({
  otp,
  setOtp,
  onVerify,
  onBack,
  loading,
  userPhone,
  maskPhoneNumber,
  canResend,
  onResend,
  remainingTime,
  formatTimer,
  title = "التحقق من الهوية",
  subtitle,
  length = 4,
  verifyButtonLabel = "تحقق",
  backButtonLabel = "العودة"
}) {
  const defaultSubtitle = userPhone 
    ? `تم إرسال رمز التحقق إلى ${maskPhoneNumber(userPhone)}`
    : 'أدخل رمز التحقق المرسل إلى هاتفك'
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && otp.length === length) {
      onVerify()
    }
  }
  
  return (
    <>
      <AuthFormHeader title={title} subtitle={subtitle || defaultSubtitle} />

      <div className={styles.container} onKeyPress={handleKeyPress} role="button" tabIndex={0}>
        <OtpInput
          value={otp}
          onChange={(e) => setOtp(e.value)}
          length={length}
          canResend={canResend}
          onResend={onResend}
          remainingTime={remainingTime}
          formatTimer={formatTimer}
        />

        <div className={styles.buttonGroup}>
          <Button
            label={verifyButtonLabel}
            icon="pi pi-check"
            loading={loading}
            onClick={onVerify}
            className={styles.verifyButton}
          />
          
          <Button
            label={backButtonLabel}
            icon="pi pi-arrow-right"
            onClick={onBack}
            outlined
            className={styles.backButton}
          />
        </div>
      </div>
    </>
  )
}

OtpVerificationForm.propTypes = {
  otp: PropTypes.string.isRequired,
  setOtp: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  userPhone: PropTypes.string,
  maskPhoneNumber: PropTypes.func.isRequired,
  canResend: PropTypes.bool.isRequired,
  onResend: PropTypes.func.isRequired,
  remainingTime: PropTypes.number.isRequired,
  formatTimer: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  length: PropTypes.number,
  verifyButtonLabel: PropTypes.string,
  backButtonLabel: PropTypes.string,
}

export default OtpVerificationForm

import PropTypes from 'prop-types'
import { InputOtp } from 'primereact/inputotp'
import styles from './OtpInput.module.css'

function OtpInput({ value, onChange, length, canResend, onResend, remainingTime, formatTimer }) {
  return (
    <div className={styles.otpContainer}>
      <div className={styles.otpWrapper}>
        <InputOtp
          value={value}
          onChange={onChange}
          length={length}
          integerOnly
          style={{ gap: '12px' }}
        />
      </div>

      <p className={styles.resendText}>
        لم يصلك الرمز؟{' '}
        {canResend ? (
          <span
            onClick={onResend}
            className={styles.resendLink}
          >
            إعادة الإرسال
          </span>
        ) : (
          <span className={styles.resendDisabled}>
            إعادة إرسال الرمز بعد {formatTimer(remainingTime)}
          </span>
        )}
      </p>
    </div>
  )
}

OtpInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  length: PropTypes.number,
  canResend: PropTypes.bool.isRequired,
  onResend: PropTypes.func.isRequired,
  remainingTime: PropTypes.number.isRequired,
  formatTimer: PropTypes.func.isRequired,
}

OtpInput.defaultProps = {
  length: 4,
}

export default OtpInput

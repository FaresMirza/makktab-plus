import { useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthFormContainer from '../../components/auth/AuthFormContainer'
import AuthFormHeader from '../../components/auth/AuthFormHeader'
import PhoneVerificationForm from '../../components/employee-activation/PhoneVerificationForm'
import ActivateOtpStep from '../../components/employee-activation/ActivateOtpStep'
import ActivatePasswordForm from '../../components/employee-activation/ActivatePasswordForm'
import ActivateSuccessMessage from '../../components/employee-activation/ActivateSuccessMessage'

const MAX_ATTEMPTS = 3

/**
 * Employee Activation Page
 * Multi-step activation process for employees added by office owners
 * Steps: Phone Verification -> OTP -> Password Creation -> Success
 */
function ActivatePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const toastRef = useRef(null)

  // Get token from URL (for API verification)
  // eslint-disable-next-line no-unused-vars
  const activationToken = searchParams.get('token')

  // Multi-step form state
  const [step, setStep] = useState('phone') // 'phone', 'otp', 'password', 'success'
  const [loading, setLoading] = useState(false)

  // Form data
  const [phoneNumber, setPhoneNumber] = useState('')
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS)

  /**
   * Show toast notification
   */
  const showToast = (severity, summary, detail) => {
    toastRef.current?.show({
      severity,
      summary,
      detail,
      life: 3000,
    })
  }

  /**
   * Handle phone verification submission
   */
  const handlePhoneSubmit = async (phone) => {
    setLoading(true)

    try {
      // In production: verify phone matches the one registered for this employee
      // await api.verifyEmployeePhone({ token: activationToken, phone })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock verification - in production, check against backend
      // For now, accept any valid Saudi phone number
      
      setPhoneNumber(phone)
      showToast('success', 'تم التحقق', 'تم إرسال رمز التحقق إلى جوالك')
      setStep('otp')
    } catch {
      showToast('error', 'خطأ في التحقق', 'رقم الجوال غير مطابق للرقم المسجل')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle OTP verification
   */
  const handleOtpVerify = async (otp) => {
    setLoading(true)

    try {
      // In production: verify OTP with backend
      // await api.verifyOtp({ token: activationToken, phone: phoneNumber, otp })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Mock OTP verification - accept '1234' for testing
      if (otp !== '1234') {
        const nextAttempts = attemptsLeft - 1
        setAttemptsLeft(nextAttempts)
        
        if (nextAttempts <= 0) {
          showToast('error', 'تم الحجب', 'لقد استنفدت جميع المحاولات')
        } else {
          showToast('error', 'رمز خاطئ', `المحاولات المتبقية: ${nextAttempts}`)
        }
        setLoading(false)
        return
      }
      
      showToast('success', 'تم التحقق', 'انتقل إلى إنشاء كلمة المرور')
      setStep('password')
    } catch {
      showToast('error', 'خطأ', 'حدث خطأ أثناء التحقق من الرمز')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle OTP resend
   */
  const handleResendOtp = () => {
    // In production: call API to resend OTP
    // await api.resendActivationOtp({ token: activationToken, phone: phoneNumber })
    
    // Reset attempts on resend (optional - depends on business logic)
    setAttemptsLeft(MAX_ATTEMPTS)
  }

  /**
   * Handle password creation and activation
   */
  const handlePasswordSubmit = async () => {
    setLoading(true)

    try {
      // In production: activate employee account with password
      // await api.activateEmployeeAccount({
      //   token: activationToken,
      //   phone: phoneNumber
      // })
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      showToast('success', 'تم التفعيل', 'تم تفعيل حسابك بنجاح')
      setStep('success')
    } catch {
      showToast('error', 'خطأ', 'حدث خطأ أثناء تفعيل الحساب')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Navigate to login page
   */
  const handleGoToLogin = () => {
    navigate('/auth/login')
  }

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone')
    } else if (step === 'password') {
      setStep('otp')
    }
  }

  /**
   * Render current step
   */
  const renderStep = () => {
    switch (step) {
      case 'phone':
        return (
          <PhoneVerificationForm
            onSubmit={handlePhoneSubmit}
            showToast={showToast}
            loading={loading}
          />
        )

      case 'otp':
        return (
          <ActivateOtpStep
            phone={phoneNumber}
            onVerify={handleOtpVerify}
            onBack={handleBack}
            onResend={handleResendOtp}
            showToast={showToast}
            loading={loading}
            maxAttempts={MAX_ATTEMPTS}
            attemptsLeft={attemptsLeft}
          />
        )

      case 'password':
        return (
          <ActivatePasswordForm
            onSubmit={handlePasswordSubmit}
            onBack={handleBack}
            showToast={showToast}
            loading={loading}
          />
        )

      case 'success':
        return <ActivateSuccessMessage onGoToLogin={handleGoToLogin} />

      default:
        return null
    }
  }

  return (
    <AuthLayout>
      <Toast ref={toastRef} position="top-center" />
      <AuthFormContainer>
        {renderStep()}
      </AuthFormContainer>
    </AuthLayout>
  )
}

export default ActivatePage

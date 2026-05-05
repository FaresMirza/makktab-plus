import { useRef, useState, useEffect } from 'react'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthFormContainer from '../../components/auth/AuthFormContainer'
import UsernameStepForm from '../../components/auth/UsernameStepForm'
import OtpVerificationForm from '../../components/auth/OtpVerificationForm'
import SetNewPasswordForm from '../../components/auth/SetNewPasswordForm'
import SuccessMessage from '../../components/auth/SuccessMessage'

function ForgotPasswordPage() {
  const navigate = useNavigate()
  const toastRef = useRef(null)
  
  // Multi-step form state
  const [step, setStep] = useState('username') // 'username', 'otp', 'password', 'success'
  const [loading, setLoading] = useState(false)
  
  // OTP Resend Timer
  const [resendTimer, setResendTimer] = useState(90)
  const [canResend, setCanResend] = useState(false)
  
  // User data
  const [username, setUsername] = useState('')
  const [userPhone, setUserPhone] = useState('') // Will be received from backend
  const [oldPassword, _setOldPassword] = useState('') // Will be received from backend for comparison
  
  // OTP step
  const [otp, setOtp] = useState('')
  
  // Password step
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameSubmit = async (e) => {
    e.preventDefault()
    
    if (!username) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'يرجى إدخال اسم المستخدم',
        life: 3000,
      })
      return
    }
    
    setLoading(true)
    
    // Simulate API call to check username and send OTP
    setTimeout(() => {
      setLoading(false)
      // Simulate receiving phone number from backend
      setUserPhone('0521632882')
      setResendTimer(90)
      setCanResend(false)
      setStep('otp')
    }, 1000)
  }

  const handleOtpVerify = async () => {
    if (!otp || otp.length !== 6) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'رمز غير مكتمل',
        detail: 'يرجى إدخال رمز التحقق المكون من 6 أرقام',
        life: 3000,
      })
      return
    }
    
    setLoading(true)
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setLoading(false)
      // In real implementation, backend will return the old password hash for comparison
      // For now, we set a dummy value to demonstrate the feature
      // setOldPassword('receivedFromBackend')
      setStep('password')
    }, 1000)
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!newPassword || !confirmPassword) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'يرجى إدخال كلمة المرور الجديدة وتأكيدها',
        life: 3000,
      })
      return
    }
    
    if (newPassword.length < 8) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'كلمة مرور ضعيفة',
        detail: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل',
        life: 3000,
      })
      return
    }
    
    if (newPassword !== confirmPassword) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'كلمة المرور غير متطابقة',
        detail: 'كلمة المرور وتأكيدها غير متطابقتين',
        life: 3000,
      })
      return
    }
    
    // Check if new password is same as old password
    // Note: oldPassword will be received from backend after OTP verification
    if (oldPassword && newPassword === oldPassword) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'كلمة مرور مكررة',
        detail: 'كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور القديمة',
        life: 3000,
      })
      return
    }
    
    setLoading(true)
    
    // Simulate API call to reset password
    setTimeout(() => {
      setLoading(false)
      setStep('success')
    }, 1000)
  }

  const handleGoToLogin = () => {
    navigate('/auth/login')
  }

  const handleBack = () => {
    if (step === 'otp') {
      setStep('username')
      setOtp('')
    }
  }

  // Timer for OTP resend
  useEffect(() => {
    if (step === 'otp' && resendTimer > 0 && !canResend) {
      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(interval)
    }
  }, [step, resendTimer, canResend])

  // Format timer display (MM:SS)
  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Mask phone number to show only last 4 digits
  const maskPhoneNumber = (phone) => {
    if (!phone || phone.length < 4) return phone
    const lastFour = phone.slice(-4)
    const prefix = phone.slice(0, 2)
    const masked = '*'.repeat(phone.length - 6)
    return `${lastFour}${masked}${prefix}`
  }

  // Handle resend OTP
  const handleResendOtp = () => {
    if (!canResend) return
    
    setResendTimer(90)
    setCanResend(false)
    
    toastRef.current?.show({
      severity: 'info',
      summary: 'تم إعادة الإرسال',
      detail: 'تم إرسال رمز جديد',
      life: 3000,
    })
  }

  return (
    <AuthLayout>
      <Toast ref={toastRef} position="top-center" />
      
      <AuthFormContainer>
        {step === 'username' && (
          <UsernameStepForm
            username={username}
            setUsername={setUsername}
            onSubmit={handleUsernameSubmit}
            loading={loading}
            onBack={handleGoToLogin}
          />
        )}

        {step === 'otp' && (
          <OtpVerificationForm
            otp={otp}
            setOtp={setOtp}
            onVerify={handleOtpVerify}
            onBack={handleBack}
            loading={loading}
            userPhone={userPhone}
            maskPhoneNumber={maskPhoneNumber}
            canResend={canResend}
            onResend={handleResendOtp}
            remainingTime={resendTimer}
            formatTimer={formatTimer}
            length={6}
            title="إستعادة كلمة المرور"
            subtitle={`سيتم إرسال رمز OTP برقم ${maskPhoneNumber(userPhone)}`}
            verifyButtonLabel="تحقق"
            backButtonLabel="السابق"
          />
        )}

        {step === 'password' && (
          <SetNewPasswordForm
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onSubmit={handlePasswordSubmit}
            loading={loading}
          />
        )}

        {step === 'success' && (
          <SuccessMessage
            title="تم تغيير كلمة المرور بنجاح"
            message="تم تغيير كلمة المرور الخاصة بك بنجاح. يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة."
            buttonLabel="تسجيل الدخول"
            buttonIcon="pi pi-sign-in"
            onButtonClick={handleGoToLogin}
          />
        )}
      </AuthFormContainer>
    </AuthLayout>
  )
}

export default ForgotPasswordPage

import { useRef, useState, useEffect } from 'react'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthFormContainer from '../../components/auth/AuthFormContainer'
import LoginForm from '../../components/auth/LoginForm'
import OtpVerificationForm from '../../components/auth/OtpVerificationForm'

function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('login') // 'login' or 'otp'
  const [loading, setLoading] = useState(false)
  const [userPhone, setUserPhone] = useState('') // Store phone number
  
  // OTP Resend Timer
  const [resendTimer, setResendTimer] = useState(90) // 90 seconds = 1:30
  const [canResend, setCanResend] = useState(false)
  
  const toastRef = useRef(null)
  const { login, verifyOTP } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!username || !password) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'أدخل اسم المستخدم وكلمة المرور',
        life: 2500,
      })
      return
    }

    setLoading(true)

    try {
      // Login to get OTP
      const result = await login(username, password)
      
      if (result?.needsActivation) {
        // User needs activation - handled by AuthContext
        setLoading(false)
        return
      }
      
      // Move to OTP step
      setLoading(false)
      
      // Store user phone if available
      if (result?.phone) {
        setUserPhone(result.phone)
      }
      
      // Reset timer and move to OTP step
      setResendTimer(90)
      setCanResend(false)
      setStep('otp')
      
    } catch (error) {
      setLoading(false)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ في تسجيل الدخول',
        detail: error.message || 'اسم المستخدم أو كلمة المرور غير صحيحة',
        life: 3000,
      })
    }
  }

  const handleOtpVerify = async () => {
    if (!otp || otp.length !== 4) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'رمز غير مكتمل',
        detail: 'أدخل رمز التحقق المكون من 4 أرقام',
        life: 2500,
      })
      return
    }

    setLoading(true)

    try {
      // Verify OTP and complete login
      await verifyOTP({ username, otp })
      
      toastRef.current?.show({
        severity: 'success',
        summary: 'تم تسجيل الدخول',
        detail: 'سيتم توجيهك الآن',
        life: 1500,
      })
    } catch (error) {
      setLoading(false)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: error.message || 'حدث خطأ أثناء تسجيل الدخول',
        life: 3000,
      })
    }
  }

  const handleBackToLogin = () => {
    setStep('login')
    setOtp('')
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
    const prefix = phone.slice(0, 2) // Keep first 2 digits (05)
    const masked = '*'.repeat(phone.length - 6) // Mask middle digits
    return `${prefix}${masked}${lastFour}`
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
        {step === 'login' ? (
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSubmit}
            loading={loading}
            onRegister={() => navigate('/auth/register')}
            onForgotPassword={() => navigate('/auth/forgot-password')}
            onBack={() => navigate('/')}
          />
        ) : (
          <OtpVerificationForm
            otp={otp}
            setOtp={setOtp}
            onVerify={handleOtpVerify}
            onBack={handleBackToLogin}
            loading={loading}
            userPhone={userPhone}
            maskPhoneNumber={maskPhoneNumber}
            canResend={canResend}
            onResend={handleResendOtp}
            remainingTime={resendTimer}
            formatTimer={formatTimer}
          />
        )}
      </AuthFormContainer>
    </AuthLayout>
  )
}

export default LoginPage

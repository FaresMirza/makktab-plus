import { useRef, useState } from 'react'
import { Toast } from 'primereact/toast'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import AuthFormContainer from '../../components/auth/AuthFormContainer'
import AuthFormHeader from '../../components/auth/AuthFormHeader'
import OfficeInfoForm from '../../components/office-register/OfficeInfoForm'    
import PasswordStepForm from '../../components/office-register/PasswordStepForm'
import OtpVerificationStep from '../../components/office-register/OtpVerificationStep'
import SuccessStep from '../../components/office-register/SuccessStep'
import { registerNewOffice, verifyRegistrationOTP } from '../../services/api'

/**
 * Multi-step registration process for engineering offices
 * Steps: Info -> Password -> OTP -> Success
 */
function OfficeRegisterPage() {
  const navigate = useNavigate()
  const toastRef = useRef(null)

  // Multi-step form state
  const [step, setStep] = useState('info') // 'info', 'password', 'otp', 'success'
  const [loading, setLoading] = useState(false)

  // Office info
  const [officeData, setOfficeData] = useState({
    name: '',
    ownerName: '',
    username: '',
    email: '',
    phone: '',
    city: '',
  })

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
   * Handle office info submission
   */
  const handleInfoSubmit = () => {
    setStep('password')
  }

  /**
   * Handle password submission
   */
  const handlePasswordSubmit = async (password) => {
    const fullData = { ...officeData, password }
    // Update central state just in case it's needed
    setOfficeData(fullData)
    
    const apiPayload = {
      officeName: officeData.name,
      ownerFullName: officeData.ownerName,
      username: officeData.username,
      email: officeData.email,
      phone: officeData.phone,
      city: officeData.city,
      password: password
    }
    
    setLoading(true)
    try {
      await registerNewOffice(apiPayload)
      setStep('otp')
    } catch (err) {
      showToast('error', 'خطأ في التسجيل', err?.response?.data?.message || 'تعذر تسجيل المكتب')
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
      await verifyRegistrationOTP({
        email: officeData.email,
        otp: String(otp)
      })
      setStep('success')
    } catch (err) {
      showToast('error', 'خطأ في التحقق', err?.response?.data?.message || 'رمز التحقق غير صحيح')
    } finally {
      setLoading(false)
    }
  }

  /**
   * Handle OTP resend
   */
  const handleResendOtp = () => {
    // In production, call API to resend OTP
    // Example: await api.resendOtp(officeData.phone)
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
    if (step === 'password') {
      setStep('info')
    } else if (step === 'otp') {
      setStep('password')
    }
  }

  /**
   * Render current step
   */
  const renderStep = () => {
    switch (step) {
      case 'info':
        return (
          <OfficeInfoForm
            officeData={officeData}
            onChange={setOfficeData}
            onSubmit={handleInfoSubmit}
            onBack={handleGoToLogin}
            showToast={showToast}
          />
        )

      case 'password':
        return (
          <PasswordStepForm
            onSubmit={handlePasswordSubmit}
            onBack={handleBack}
            showToast={showToast}
            loading={loading}
          />
        )

      case 'otp':
        return (
          <OtpVerificationStep
            phone={officeData.phone}
            onVerify={handleOtpVerify}
            onBack={handleBack}
            onResend={handleResendOtp}
            showToast={showToast}
            loading={loading}
          />
        )

      case 'success':
        return (
          <SuccessStep email={officeData.email} onGoToLogin={handleGoToLogin} />
        )

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

export default OfficeRegisterPage

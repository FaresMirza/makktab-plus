import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import FormStepHeader from '../office-register/FormStepHeader'
import { validateSaudiPhone } from '../../utils/validation'
import styles from './PhoneVerificationForm.module.css'

/**
 * Phone Verification Form Component
 * For employee activation - verify phone number matches the one registered by office owner
 */
const PhoneVerificationForm = ({ onSubmit, showToast, loading }) => {
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!phone) {
      showToast('warn', 'بيانات ناقصة', 'يرجى إدخال رقم الجوال')
      return
    }

    // Validate phone
    const phoneValidation = validateSaudiPhone(phone)
    if (!phoneValidation.isValid) {
      showToast('warn', 'رقم جوال غير صحيح', phoneValidation.error)
      return
    }

    onSubmit(phone)
  }

  return (
    <>
      <FormStepHeader
        title="تفعيل الحساب"
        subtitle="ادخل رقم هاتفك للتحقق (يجب أن يكون ذات الرقم المسجل لدى المكتب)"
      />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            رقم الجوال
          </label>
          <InputText
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
            placeholder="05xxxxxxxx"
            keyfilter="pint"
            maxLength={10}
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          label="التالي"
          icon="pi pi-arrow-left"
          loading={loading}
          className={styles.submitButton}
        />
      </form>
    </>
  )
}

export default PhoneVerificationForm

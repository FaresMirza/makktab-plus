import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import FormStepHeader from './FormStepHeader'
import { SAUDI_CITIES } from '../../constants/cities'
import {
  validateRequiredFields,
  validateUsername,
  validateEmail,
  validateSaudiPhone,
} from '../../utils/validation'
import styles from './OfficeInfoForm.module.css'

/**
 * Office Information Form Component
 * First step of registration - collects office details
 */
const OfficeInfoForm = ({ officeData, onChange, onSubmit, onBack, showToast }) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    const requiredValidation = validateRequiredFields({
      name: officeData.name,
      ownerName: officeData.ownerName,
      username: officeData.username,
      email: officeData.email,
      phone: officeData.phone,
      city: officeData.city,
    })

    if (!requiredValidation.isValid) {
      showToast('warn', 'بيانات ناقصة', requiredValidation.error)
      return
    }

    // Validate username
    const usernameValidation = validateUsername(officeData.username)
    if (!usernameValidation.isValid) {
      showToast('warn', 'اسم مستخدم غير صحيح', usernameValidation.error)
      return
    }

    // Validate email
    const emailValidation = validateEmail(officeData.email)
    if (!emailValidation.isValid) {
      showToast('warn', 'بريد إلكتروني غير صحيح', emailValidation.error)
      return
    }

    // Validate phone
    const phoneValidation = validateSaudiPhone(officeData.phone)
    if (!phoneValidation.isValid) {
      showToast('warn', 'رقم جوال غير صحيح', phoneValidation.error)
      return
    }

    onSubmit()
  }

  const handleChange = (field, value) => {
    onChange({ ...officeData, [field]: value })
  }

  return (
    <>
      <FormStepHeader
        title="تسجيل مكتب جديد"
        subtitle="أدخل بيانات مكتبك"
      />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            اسم المكتب
          </label>
          <InputText
            id="name"
            value={officeData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={styles.input}
            placeholder="اسم المكتب"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="ownerName" className={styles.label}>
            اسم صاحب المكتب
          </label>
          <InputText
            id="ownerName"
            value={officeData.ownerName}
            onChange={(e) => handleChange('ownerName', e.target.value)}
            className={styles.input}
            placeholder="اسم صاحب المكتب"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="username" className={styles.label}>
            اسم المستخدم
          </label>
          <InputText
            id="username"
            value={officeData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className={styles.input}
            placeholder="اسم المستخدم"
            maxLength={20}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            البريد الإلكتروني
          </label>
          <InputText
            id="email"
            value={officeData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={styles.input}
            placeholder="البريد الإلكتروني"
            keyfilter="email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            رقم الجوال
          </label>
          <InputText
            id="phone"
            value={officeData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={styles.input}
            placeholder="05xxxxxxxx"
            keyfilter="pint"
            maxLength={10}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="city" className={styles.label}>
            المدينة
          </label>
          <Dropdown
            id="city"
            value={officeData.city}
            options={SAUDI_CITIES}
            onChange={(e) => handleChange('city', e.value)}
            className={styles.dropdown}
            placeholder="اختر المدينة"
          />
        </div>

        <Button
          type="submit"
          label="التالي"
          icon="pi pi-arrow-left"
          className={styles.submitButton}
        />

        <Button
          type="button"
          label="رجوع"
          outlined
          onClick={onBack}
          className={styles.backButton}
        />
      </form>
    </>
  )
}

export default OfficeInfoForm

import { useState, useRef } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast'
import AdminLayout from '../../layouts/AdminLayout'
import { createAdmin } from '../../services/api'
import styles from './AddAdminPage.module.css'

function AddAdminPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const toastRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.email || !formData.fullName || !formData.password) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات غير مكتملة',
        detail: 'يرجى تعبئة جميع الحقول المطلوبة',
        life: 3000,
      })
      return
    }

    if (formData.password.length < 8) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'كلمة مرور ضعيفة',
        detail: 'يجب أن لا تقل كلمة المرور عن 8 أحرف',
        life: 3000,
      })
      return
    }

    setLoading(true)
    try {
      await createAdmin(formData)
      toastRef.current?.show({
        severity: 'success',
        summary: 'تمت الإضافة بنجاح',
        detail: 'تمت إضافة المدير الجديد للنظام بنجاح',
        life: 4000,
      })
      // Clear form
      setFormData({
        username: '',
        email: '',
        fullName: '',
        password: '',
      })
    } catch (error) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'فشل في الإضافة',
        detail: error?.response?.data?.message || 'تعذر إنشاء حساب المدير',
        life: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <Toast ref={toastRef} />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>إضافة مدير جديد</h1>
          <p className={styles.subtitle}>إنشاء حساب مسؤول بصلاحيات الإدارة</p>
        </div>

        <div className={styles.formContainer}>
          <Card className={styles.card}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName" className={styles.label}>الاسم الكامل <span className={styles.required}>*</span></label>
                <span className="p-input-icon-right">
                  <i className="pi pi-user" />
                  <InputText
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    className={styles.input}
                    disabled={loading}
                  />
                </span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="username" className={styles.label}>اسم المستخدم <span className={styles.required}>*</span></label>
                <span className="p-input-icon-right">
                  <i className="pi pi-id-card" />
                  <InputText
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="اسم المستخدم للدخول للنظام"
                    className={styles.input}
                    disabled={loading}
                  />
                </span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>البريد الإلكتروني <span className={styles.required}>*</span></label>
                <span className="p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@makktabplus.online"
                    className={styles.input}
                    disabled={loading}
                  />
                </span>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>كلمة المرور <span className={styles.required}>*</span></label>
                <Password
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  toggleMask
                  feedback={true}
                  promptLabel="أدخل كلمة المرور"
                  weakLabel="ضعيفة"
                  mediumLabel="متوسطة"
                  strongLabel="قوية"
                  placeholder="كلمة المرور (8 أحرف على الأقل)"
                  className={styles.passwordContainer}
                  inputClassName={styles.passwordInput}
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                label="إضافة مدير"
                icon="pi pi-user-plus"
                loading={loading}
                className={styles.submitButton}
              />
            </form>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AddAdminPage
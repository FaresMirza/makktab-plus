import { Button } from 'primereact/button'
import styles from './SuccessStep.module.css'

/**
 * Success Step Component
 * Final step - shows registration success message
 */
const SuccessStep = ({ email, onGoToLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.successIcon}>
        <i className="pi pi-check" />
      </div>

      <h3 className={styles.title}>تم إرسال الطلب بنجاح</h3>

      <p className={styles.text}>
        تم إرسال طلب إنشاء حساب المكتب الهندسي بنجاح. سيتم مراجعة الطلب من قبل الإدارة
        وسيتم إرسال بريد إلكتروني إلى <strong>{email}</strong> عند قبول الطلب وتفعيل
        الحساب.
      </p>

      <div className={styles.infoBox}>
        <div className={styles.infoContent}>
          <i className="pi pi-info-circle" />
          <div style={{ flex: 1 }}>
            <p className={styles.infoTitle}>ملاحظة مهمة</p>
            <p className={styles.infoDescription}>
              عادةً ما تستغرق عملية المراجعة من 24 إلى 48 ساعة. يرجى التحقق من بريدك
              الإلكتروني بانتظام.
            </p>
          </div>
        </div>
      </div>

      <Button
        label="العودة لتسجيل الدخول"
        icon="pi pi-sign-in"
        onClick={onGoToLogin}
        className={styles.button}
      />
    </div>
  )
}

export default SuccessStep

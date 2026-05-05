import { Button } from 'primereact/button'
import styles from './ActivateSuccessMessage.module.css'

/**
 * Activate Success Message Component
 * Final step - shows successful activation message
 */
const ActivateSuccessMessage = ({ onGoToLogin }) => {
  return (
    <div className={styles.container}>
      <div className={styles.successIcon}>
        <i className={`pi pi-check-circle ${styles.iconSvg}`} />
      </div>

      <h3 className={styles.title}>تم تفعيل الحساب بنجاح!</h3>

      <p className={styles.text}>
        مرحباً بك في منصة مكتب بلس. تم تفعيل حسابك بنجاح ويمكنك الآن تسجيل الدخول
        والبدء في استخدام المنصة.
      </p>

      <div className={styles.infoBox}>
        <div className={styles.infoContent}>
          <i className={`pi pi-info-circle ${styles.infoIcon}`} />
          <div style={{ flex: 1 }}>
            <p className={styles.infoTitle}>ملاحظة</p>
            <p className={styles.infoDescription}>
              يمكنك الآن تسجيل الدخول باستخدام اسم المستخدم أو البريد الإلكتروني
              وكلمة المرور التي قمت بإنشائها.
            </p>
          </div>
        </div>
      </div>

      <Button
        label="الذهاب لصفحة تسجيل الدخول"
        icon="pi pi-sign-in"
        onClick={onGoToLogin}
        className={styles.button}
      />
    </div>
  )
}

export default ActivateSuccessMessage

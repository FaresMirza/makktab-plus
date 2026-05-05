import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import FormInput from './FormInput'
import AuthFormHeader from './AuthFormHeader'
import styles from './UsernameStepForm.module.css'

function UsernameStepForm({ 
  username, 
  setUsername, 
  onSubmit, 
  loading, 
  onBack,
  title = "إستعادة كلمة المرور",
  subtitle = "الرجاء إدخال اسم المستخدم للحساب المراد تغيير كلمة مروره"
}) {
  return (
    <>
      <AuthFormHeader title={title} subtitle={subtitle} />

      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          id="username"
          label="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="اسم المستخدم"
        />

        <Button
          type="submit"
          label="المتابعة"
          icon="pi pi-arrow-left"
          loading={loading}
          className="auth-primary-btn"
        />
        
        <Button
          type="button"
          label="رجوع"
          outlined
          onClick={onBack}
          className="auth-secondary-btn"
        />
      </form>
    </>
  )
}

UsernameStepForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onBack: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default UsernameStepForm

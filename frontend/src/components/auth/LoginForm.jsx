import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import FormInput from './FormInput'
import PasswordInput from './PasswordInput'
import AuthFormHeader from './AuthFormHeader'
import styles from './LoginForm.module.css'

function LoginForm({ 
  username, 
  setUsername, 
  password, 
  setPassword, 
  onSubmit, 
  loading, 
  onRegister,
  onForgotPassword,
  onBack
}) {
  return (
    <>
      <AuthFormHeader 
        title="تسجيل دخول" 
        subtitle={<>لا تملك حساباً؟ <span className={styles.link} onClick={onRegister}>إنشاء حساب</span></>} 
      />

      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          id="username"
          label="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="اسم المستخدم"
        />

        <PasswordInput
          id="password"
          label="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          showForgotPassword
          onForgotPassword={onForgotPassword}
        />

        <Button
          type="submit"
          label="تسجيل الدخول"
          loading={loading}
          className={styles.loginButton}
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onRegister: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}

export default LoginForm

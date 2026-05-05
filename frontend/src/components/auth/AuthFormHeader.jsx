import PropTypes from 'prop-types'

function AuthFormHeader({ title, subtitle }) {
  return (
    <div className="auth-header">
      {title && <h2 className="auth-title">{title}</h2>}
      {subtitle && <p className="auth-subtitle">{subtitle}</p>}
    </div>
  )
}

AuthFormHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default AuthFormHeader

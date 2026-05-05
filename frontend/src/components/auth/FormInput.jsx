import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import styles from './FormInput.module.css'

function FormInput({ id, label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <InputText
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        className={styles.input}
        placeholder={placeholder}
      />
    </div>
  )
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
}

export default FormInput

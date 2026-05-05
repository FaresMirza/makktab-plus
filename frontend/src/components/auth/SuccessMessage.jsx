import PropTypes from 'prop-types'
import { Button } from 'primereact/button'
import styles from './SuccessMessage.module.css'

function SuccessMessage({ 
  title = "تمت العملية بنجاح",
  message = "تمت العملية بنجاح",
  buttonLabel = "متابعة",
  buttonIcon = "pi pi-check",
  onButtonClick,
  iconColor = 'var(--success-color)'
}) {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successIcon}>
        <i 
          className="pi pi-check" 
          style={{ color: iconColor }} 
        />
      </div>
      
      <h3 className={styles.successTitle}>
        {title}
      </h3>
      
      <p className={styles.successText}>
        {message}
      </p>

      <Button
        label={buttonLabel}
        icon={buttonIcon}
        onClick={onButtonClick}
        className={styles.finalButton}
      />
    </div>
  )
}

SuccessMessage.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonIcon: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  iconColor: PropTypes.string,
}

export default SuccessMessage

import styles from './FormStepHeader.module.css'

/**
 * Form Step Header Component
 * Displays title and subtitle for each form step
 */
const FormStepHeader = ({ title, subtitle }) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}

export default FormStepHeader

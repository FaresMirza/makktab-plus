import styles from './ActionLabel.module.css'

/**
 * Action Label Component
 * Displays action with color coding
 */
const ActionLabel = ({ action, colorMap }) => {
  const color = colorMap[action] || '#000'

  return (
    <span className={styles.label} style={{ color }}>
      {action}
    </span>
  )
}

export default ActionLabel

import { Card } from 'primereact/card'
import PropTypes from 'prop-types'
import styles from './KpiCard.module.css'

/**
 * KPI Card Component
 * Displays key performance indicator with icon, value and label
 */
const KpiCard = ({ icon, value, label, color = 'var(--primary-dark)' }) => {
  return (
    <Card className={styles.card} style={{ borderTop: `4px solid ${color}` }}>
      <div className={styles.content}>
        <i className={`pi ${icon} ${styles.icon}`} style={{ color }}></i>
        <div>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      </div>
    </Card>
  )
}

KpiCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default KpiCard

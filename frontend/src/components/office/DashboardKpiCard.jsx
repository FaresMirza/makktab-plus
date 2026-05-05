import PropTypes from 'prop-types'
import styles from './DashboardKpiCard.module.css'

/**
 * Dashboard KPI Card Component for Office Dashboard
 * Displays statistics with icon, value, unit and title
 */
const DashboardKpiCard = ({ title, value, unit, icon, iconColor, variant = 'light' }) => {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.valueContainer}>
            <span className={styles.value}>{value}</span>
            <span className={styles.unit}>{unit}</span>
          </div>
        </div>
        <div className={styles.iconWrapper}>
          <i className={icon} style={{ color: iconColor }} />
        </div>
      </div>
    </div>
  )
}

DashboardKpiCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  variant: PropTypes.oneOf(['light', 'dark']),
}

export default DashboardKpiCard

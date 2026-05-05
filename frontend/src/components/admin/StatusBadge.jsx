import PropTypes from 'prop-types'
import styles from './StatusBadge.module.css'

/**
 * Status Badge Component
 * Displays styled status badge with predefined colors
 */
const StatusBadge = ({ status, statusMap }) => {
  const statusInfo = statusMap[status] || { 
    label: status, 
    bg: 'var(--accent-blue)', 
    color: 'var(--text-white)' 
  }

  return (
    <span 
      className={styles.badge}
      style={{
        background: statusInfo.bg,
        color: statusInfo.color,
      }}
    >
      {statusInfo.label}
    </span>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  statusMap: PropTypes.objectOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      bg: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default StatusBadge

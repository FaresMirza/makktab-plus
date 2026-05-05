import { Button } from 'primereact/button'
import styles from './OfficeActionsColumn.module.css'

/**
 * Office Actions Column Component
 * Displays action buttons for office (view, approve, reject)
 */
const OfficeActionsColumn = ({ office, onView, onApprove, onReject }) => {
  return (
    <div className={styles.actionsContainer}>
      <Button
        icon="pi pi-eye"
        rounded
        outlined
        severity="info"
        onClick={() => onView(office)}
        tooltip="عرض التفاصيل"
        tooltipOptions={{ position: 'top' }}
      />
      <Button
        icon="pi pi-check"
        rounded
        severity="success"
        onClick={() => onApprove(office)}
        tooltip="موافقة"
        tooltipOptions={{ position: 'top' }}
      />
      <Button
        icon="pi pi-times"
        rounded
        severity="danger"
        onClick={() => onReject(office)}
        tooltip="رفض"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  )
}

export default OfficeActionsColumn

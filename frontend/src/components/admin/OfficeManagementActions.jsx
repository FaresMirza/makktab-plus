import { Button } from 'primereact/button'
import { confirmDialog } from 'primereact/confirmdialog'
import styles from './OfficeManagementActions.module.css'

/**
 * Office Management Actions Column
 * Edit + Suspend/Activate buttons for the offices management table
 * Props:
 *   office          - the office row data
 *   onEdit          - (office) => void
 *   onStatusChange  - (office, newStatus) => void
 */
const OfficeManagementActions = ({ office, onEdit, onStatusChange }) => {
  const isActive = office.status === 'Active'

  const handleSuspend = () => {
    confirmDialog({
      message: 'هل أنت متأكد؟ سيتم حظر المالك وجميع الموظفين من تسجيل الدخول.',
      header: 'تأكيد الإيقاف',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'نعم، أوقف المكتب',
      rejectLabel: 'إلغاء',
      acceptClassName: 'p-button-danger',
      accept: () => onStatusChange(office, 'Suspended'),
    })
  }

  const handleActivate = () => {
    confirmDialog({
      message: 'هل أنت متأكد من إعادة تفعيل هذا المكتب؟',
      header: 'تأكيد التفعيل',
      icon: 'pi pi-question-circle',
      acceptLabel: 'نعم، أعد التفعيل',
      rejectLabel: 'إلغاء',
      acceptClassName: 'p-button-success',
      accept: () => onStatusChange(office, 'Active'),
    })
  }

  return (
    <div className={styles.actionsContainer}>
      <Button
        icon="pi pi-pencil"
        rounded
        text
        severity="info"
        tooltip="تعديل"
        tooltipOptions={{ position: 'top' }}
        onClick={() => onEdit(office)}
      />
      <Button
        icon={isActive ? 'pi pi-ban' : 'pi pi-check-circle'}
        rounded
        text
        severity={isActive ? 'danger' : 'success'}
        tooltip={isActive ? 'إيقاف المكتب' : 'تفعيل المكتب'}
        tooltipOptions={{ position: 'top' }}
        onClick={isActive ? handleSuspend : handleActivate}
      />
    </div>
  )
}

export default OfficeManagementActions

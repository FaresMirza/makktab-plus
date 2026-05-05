import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { formatArabicDate } from '../../utils/dateUtils'
import styles from './OfficeDetailsDialog.module.css'

/**
 * Office Details Dialog Component
 * Displays office details with approve/reject actions
 */
const OfficeDetailsDialog = ({ 
  visible, 
  office, 
  onHide, 
  onApprove, 
  onReject 
}) => {
  if (!office) return null

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="تفاصيل الطلب"
      className={styles.dialog}
    >
      <div className={styles.container}>
        <DetailRow label="اسم المكتب" value={office.officeName} />
        <DetailRow label="اسم المالك" value={office.fullName} />
        <DetailRow label="اسم المستخدم" value={office.username} />
        <DetailRow label="البريد الإلكتروني" value={office.email} />
        <DetailRow label="رقم الجوال" value={office.phone} />
        <DetailRow label="المدينة" value="غير محدد" />
        <DetailRow 
          label="تاريخ التسجيل" 
          value={office.createdAt ? formatArabicDate(office.createdAt) : 'غير متوفر'} 
        />

        <div className={styles.buttonGroup}>
          <Button
            label="رفض"
            icon="pi pi-times"
            severity="danger"
            onClick={() => {
              onHide()
              onReject(office)
            }}
          />
          <Button
            label="موافقة"
            icon="pi pi-check"
            severity="success"
            onClick={() => {
              onHide()
              onApprove(office)
            }}
          />
        </div>
      </div>
    </Dialog>
  )
}

// Helper component for detail rows
const DetailRow = ({ label, value }) => (
  <div className={styles.detailRow}>
    <strong>{label}:</strong>
    <span>{value}</span>
  </div>
)

export default OfficeDetailsDialog

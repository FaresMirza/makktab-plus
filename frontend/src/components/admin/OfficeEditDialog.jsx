import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import styles from './OfficeEditDialog.module.css'

/**
 * Office Edit Dialog
 * Dialog for editing office information by admin
 * Props:
 *   visible    - boolean controlling dialog visibility
 *   office     - current office object being edited
 *   onChange   - (field, value) => void  called on each field change
 *   onHide     - () => void  closes the dialog
 *   onSave     - () => void  confirms save
 */
const OfficeEditDialog = ({ visible, office, onChange, onHide, onSave }) => {
  if (!office) return null

  const footer = (
    <div>
      <Button
        label="إلغاء"
        icon="pi pi-times"
        className="p-button-text"
        onClick={onHide}
      />
      <Button
        label="حفظ"
        icon="pi pi-check"
        className={styles.saveButton}
        onClick={onSave}
      />
    </div>
  )

  return (
    <Dialog
      visible={visible}
      className={styles.dialog}
      header="تعديل مكتب"
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className={styles.formGrid}>
        <div>
          <label htmlFor="edit-name" className={styles.label}>
            اسم المكتب *
          </label>
          <InputText
            id="edit-name"
            value={office.name}
            onChange={(e) => onChange('name', e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="edit-ownerName" className={styles.label}>
            اسم المالك *
          </label>
          <InputText
            id="edit-ownerName"
            value={office.ownerName}
            onChange={(e) => onChange('ownerName', e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <label htmlFor="edit-ownerUsername" className={styles.label}>
            اسم المستخدم للمالك *
          </label>
          <InputText
            id="edit-ownerUsername"
            value={office.ownerUsername}
            onChange={(e) => onChange('ownerUsername', e.target.value)}
            className={`${styles.input} ${styles.inputDisabled}`}
            disabled
          />
        </div>

        <div>
          <label htmlFor="edit-ownerEmail" className={styles.label}>
            البريد الإلكتروني *
          </label>
          <InputText
            id="edit-ownerEmail"
            type="email"
            value={office.ownerEmail}
            onChange={(e) => onChange('ownerEmail', e.target.value)}
            className={styles.input}
          />
        </div>
      </div>
    </Dialog>
  )
}

export default OfficeEditDialog

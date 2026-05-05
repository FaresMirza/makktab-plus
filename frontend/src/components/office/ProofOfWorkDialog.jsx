import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputTextarea } from 'primereact/inputtextarea'
import { FileUpload } from 'primereact/fileupload'
import styles from './ProofOfWorkDialog.module.css'

function ProofOfWorkDialog({ visible, onHide, onSubmit, toastRef }) {
  const [completionNotes, setCompletionNotes] = useState('')
  const [attachments, setAttachments] = useState([])
  const fileUploadRef = useRef(null)

  // Reset form when dialog opens
  useEffect(() => {
    if (visible) {
      setCompletionNotes('')
      setAttachments([])
    }
  }, [visible])

  const handleFileUpload = (event) => {
    const files = event.files.map((file) => `/uploads/proof-of-work/${file.name}`)
    setAttachments((prev) => [...prev, ...files])
    fileUploadRef.current?.clear()
    toastRef.current?.show({
      severity: 'success',
      summary: 'تم الرفع',
      detail: `تم رفع ${files.length} ملف`,
      life: 2000,
    })
  }

  const removeFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
    toastRef.current?.show({
      severity: 'info',
      summary: 'تم الحذف',
      detail: 'تم حذف الملف',
      life: 2000,
    })
  }

  const handleSubmit = () => {
    if (!completionNotes.trim()) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'يرجى إضافة ملاحظات الإنجاز',
        life: 2500,
      })
      return
    }

    if (attachments.length === 0) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'يرجى إرفاق ملف واحد على الأقل كإثبات للعمل',
        life: 2500,
      })
      return
    }

    onSubmit(completionNotes, [...attachments])
  }

  const footer = (
    <div>
      <Button label="إلغاء" icon="pi pi-times" className="p-button-text" onClick={onHide} />
      <Button
        label="تسليم المهمة"
        icon="pi pi-check"
        style={{ background: '#22c55e', border: 'none' }}
        onClick={handleSubmit}
      />
    </div>
  )

  return (
    <Dialog
      visible={visible}
      style={{ width: '550px' }}
      header="إثبات إنجاز المهمة"
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className={styles.formGrid}>
        <div>
          <label htmlFor="completionNotes" className={styles.label}>
            ملاحظات الإنجاز *
          </label>
          <InputTextarea
            id="completionNotes"
            value={completionNotes}
            onChange={(e) => setCompletionNotes(e.target.value)}
            rows={5}
            style={{ width: '100%' }}
            placeholder="اكتب تفاصيل ما تم إنجازه..."
          />
        </div>

        <div>
          <label htmlFor="proofAttachments" className={styles.label}>
            إرفاق صور أو ملفات الإثبات *
          </label>
          <FileUpload
            ref={fileUploadRef}
            mode="basic"
            multiple
            accept="image/*,application/pdf,.doc,.docx"
            maxFileSize={10000000}
            chooseLabel="اختر الملفات"
            auto
            customUpload
            uploadHandler={handleFileUpload}
          />
          {attachments.length > 0 && (
            <div className={styles.attachmentsList}>
              <strong>الملفات المرفقة:</strong>
              <div className={styles.attachmentsItems}>
                {attachments.map((file, idx) => (
                  <div key={idx} className={styles.attachmentItem}>
                    <span className={styles.attachmentName}>
                      <i className="pi pi-file" style={{ marginLeft: '6px', color: 'var(--primary-lighter)' }} />
                      {file.split('/').pop()}
                    </span>
                    <Button
                      icon="pi pi-times"
                      rounded
                      text
                      severity="danger"
                      size="small"
                      tooltip="حذف الملف"
                      tooltipOptions={{ position: 'top' }}
                      onClick={() => removeFile(idx)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className={styles.hint}>
            <i className="pi pi-info-circle" style={{ marginLeft: '4px' }} />
            يجب إرفاق ملف واحد على الأقل كإثبات للعمل المنجز
          </div>
        </div>
      </div>
    </Dialog>
  )
}

ProofOfWorkDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  toastRef: PropTypes.object.isRequired,
}

export default ProofOfWorkDialog

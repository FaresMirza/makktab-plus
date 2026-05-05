import { useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import FilePreviewDialog from './FilePreviewDialog'
import { getFileIcon, isPreviewableFile, downloadFile, getFileTypeLabel, getFileExtension } from '../../utils/fileUtils'
import styles from './ViewProofDialog.module.css'

function ViewProofDialog({ visible, task, onHide }) {
  const [previewFile, setPreviewFile] = useState(null)
  const [previewVisible, setPreviewVisible] = useState(false)

  const openPreview = (filePath, fileName) => {
    setPreviewFile({ url: filePath, name: fileName, type: getFileExtension(fileName) })
    setPreviewVisible(true)
  }

  const closePreview = () => {
    setPreviewVisible(false)
    setPreviewFile(null)
  }

  return (
    <>
      <Dialog
        visible={visible}
        style={{ width: '650px' }}
        header="إثبات العمل المنجز"
        modal
        onHide={onHide}
      >
        {task && (
          <div className={styles.content}>
            <div className={styles.field}>
              <div className={styles.fieldLabel}>اسم المهمة</div>
              <div className={styles.taskName}>{task.name}</div>
            </div>

            {task.projectName && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>المشروع</div>
                <div className={styles.fieldValue}>{task.projectName}</div>
              </div>
            )}

            <div className={styles.field}>
              <div className={styles.fieldLabel}>وصف الإنجاز</div>
              <div className={styles.notesBox}>{task.completionNotes}</div>
            </div>

            {task.attachments?.length > 0 && (
              <div className={styles.field}>
                <div className={styles.fieldLabel}>
                  الملفات المرفقة ({task.attachments.length})
                </div>
                <div className={styles.filesList}>
                  {task.attachments.map((file, index) => {
                    const fileName = file.split('/').pop()
                    const canPreview = isPreviewableFile(fileName)

                    return (
                      <div
                        key={index}
                        className={styles.fileItem}
                        onClick={() => canPreview && openPreview(file, fileName)}
                        style={{ cursor: canPreview ? 'pointer' : 'default' }}
                      >
                        <div className={styles.fileInfo}>
                          <i
                            className={getFileIcon(fileName)}
                            style={{ fontSize: '24px', color: 'var(--primary-lighter)' }}
                          />
                          <div className={styles.fileDetails}>
                            <div className={styles.fileName}>{fileName}</div>
                            <div className={styles.fileType}>{getFileTypeLabel(fileName)}</div>
                          </div>
                        </div>
                        <div className={styles.fileActions}>
                          {canPreview && (
                            <Button
                              icon="pi pi-eye"
                              rounded
                              text
                              severity="info"
                              tooltip="عرض الملف"
                              tooltipOptions={{ position: 'top' }}
                              onClick={(e) => {
                                e.stopPropagation()
                                openPreview(file, fileName)
                              }}
                            />
                          )}
                          <Button
                            icon="pi pi-download"
                            rounded
                            text
                            severity="secondary"
                            tooltip="تحميل الملف"
                            tooltipOptions={{ position: 'top' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              downloadFile(file, fileName)
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>

      <FilePreviewDialog
        visible={previewVisible}
        file={previewFile}
        onHide={closePreview}
      />
    </>
  )
}

ViewProofDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  task: PropTypes.shape({
    name: PropTypes.string,
    projectName: PropTypes.string,
    completionNotes: PropTypes.string,
    attachments: PropTypes.arrayOf(PropTypes.string),
  }),
  onHide: PropTypes.func.isRequired,
}

export default ViewProofDialog

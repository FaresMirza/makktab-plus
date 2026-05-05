import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { downloadFile, getFullFileUrl, getFileExtension } from '../../utils/fileUtils'
import styles from './FilePreviewDialog.module.css'

const IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
const TEXT_TYPES = ['txt', 'md', 'json', 'xml', 'csv']
const WORD_TYPES = ['doc', 'docx']

function FilePreviewDialog({ visible, file, onHide }) {
  const previewAreaRef = useRef(null)
  const [textContent, setTextContent] = useState('')
  const [textLoading, setTextLoading] = useState(false)
  const [textError, setTextError] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const fileType = file ? (file.type || getFileExtension(file.name)).toLowerCase() : ''
  const isImage = file ? IMAGE_TYPES.includes(fileType) : false
  const isPdf = file ? fileType === 'pdf' : false
  const isText = file ? TEXT_TYPES.includes(fileType) : false
  const isWord = file ? WORD_TYPES.includes(fileType) : false
  const isUnsupported = file ? !isImage && !isPdf && !isText && !isWord : false
  const fullUrl = file ? getFullFileUrl(file.url) : ''
  const officeViewerUrl = isWord
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fullUrl)}`
    : ''

  useEffect(() => {
    if (!visible || !file || !isText) {
      setTextContent('')
      setTextError(null)
      return
    }

    let cancelled = false
    const fetchTextContent = async () => {
      setTextLoading(true)
      setTextError(null)
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(fullUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const text = await response.text()
        if (!cancelled) setTextContent(text)
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching text file:', error)
          setTextError('فشل تحميل محتوى الملف')
        }
      } finally {
        if (!cancelled) setTextLoading(false)
      }
    }

    fetchTextContent()
    return () => { cancelled = true }
  }, [visible, file, isText, fullUrl])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  if (!file) return null

  const handleDownload = async () => {
    try {
      await downloadFile(file.url, file.name)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const handleFullscreen = () => {
    const el = previewAreaRef.current
    if (!el) return
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen()
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
      else if (document.msExitFullscreen) document.msExitFullscreen()
    } else {
      if (el.requestFullscreen) el.requestFullscreen()
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen()
      else if (el.msRequestFullscreen) el.msRequestFullscreen()
    }
  }

  const headerIcons = (
    <Button
      icon={isFullscreen ? 'pi pi-window-minimize' : 'pi pi-window-maximize'}
      className={`p-button-rounded p-button-sm ${styles.headerFullscreenButton}`}
      tooltip={isFullscreen ? 'الخروج من ملء الشاشة' : 'ملء الشاشة'}
      tooltipOptions={{ position: 'bottom' }}
      onClick={handleFullscreen}
      aria-label="Toggle fullscreen"
    />
  )

  return (
    <Dialog
      visible={visible}
      style={{ width: '80vw', maxWidth: '900px' }}
      header={file.name || 'عرض الملف'}
      icons={headerIcons}
      modal
      onHide={onHide}
    >
      <div className={styles.container}>
        <div ref={previewAreaRef} className={styles.previewArea}>
          {isImage && (
            <div className={styles.imagePreview}>
              <img src={fullUrl} alt={file.name} className={styles.previewImage} />
            </div>
          )}

          {isPdf && (
            <iframe src={fullUrl} className={styles.pdfPreview} title={file.name} />
          )}

          {isWord && (
            <iframe
              src={officeViewerUrl}
              className={styles.pdfPreview}
              title={file.name}
            />
          )}

          {isText && (
            <>
              {textLoading && (
                <div className={styles.textLoading}>
                  <i className="pi pi-spin pi-spinner" style={{ marginLeft: '8px' }} />
                  جارٍ تحميل المحتوى...
                </div>
              )}
              {textError && (
                <div className={styles.textError}>
                  <i className="pi pi-exclamation-circle" style={{ marginLeft: '8px' }} />
                  {textError}
                </div>
              )}
              {!textLoading && !textError && (
                <pre
                  className={styles.textPreview}
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflow: 'auto',
                    height: '100%',
                    direction: 'rtl',
                    textAlign: 'right',
                    color: '#1f2937',
                    background: '#f9fafb',
                    padding: '16px',
                  }}
                >
                  {textContent}
                </pre>
              )}
            </>
          )}

          {isUnsupported && (
            <div className={styles.unsupported}>
              <i className="pi pi-file" />
              <div className={styles.unsupportedTitle}>لا يمكن معاينة هذا النوع من الملفات</div>
              <div className={styles.unsupportedName}>{file.name}</div>
            </div>
          )}
        </div>

        <div className={styles.downloadBar}>
          <Button
            label="تحميل الملف"
            icon="pi pi-download"
            style={{ background: 'var(--primary-dark)', border: 'none' }}
            onClick={handleDownload}
          />
        </div>
      </div>
    </Dialog>
  )
}

FilePreviewDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  file: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onHide: PropTypes.func.isRequired,
}

export default FilePreviewDialog

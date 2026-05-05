import axios from 'axios'

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
const TEXT_EXTENSIONS = ['txt', 'md', 'json', 'xml', 'csv']
const WORD_EXTENSIONS = ['doc', 'docx']
const PREVIEWABLE_EXTENSIONS = [...IMAGE_EXTENSIONS, 'pdf', ...TEXT_EXTENSIONS, ...WORD_EXTENSIONS]

const API_BASE_URL = "https://api.makktabplus.online"

const getFullFileUrl = (filePath) => {
  if (!filePath) return ''
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) return filePath
  return `${API_BASE_URL}${filePath}`
}

export const getFileExtension = (fileName) => {
  return fileName?.split('.').pop()?.toLowerCase() || ''
}

export const getFileIcon = (fileName) => {
  const ext = getFileExtension(fileName)
  const iconMap = {
    pdf: 'pi pi-file-pdf',
    doc: 'pi pi-file-word',
    docx: 'pi pi-file-word',
    xls: 'pi pi-file-excel',
    xlsx: 'pi pi-file-excel',
    png: 'pi pi-image',
    jpg: 'pi pi-image',
    jpeg: 'pi pi-image',
    gif: 'pi pi-image',
    webp: 'pi pi-image',
    svg: 'pi pi-image',
    zip: 'pi pi-box',
    rar: 'pi pi-box',
    '7z': 'pi pi-box',
    txt: 'pi pi-file',
  }
  return iconMap[ext] || 'pi pi-file'
}

export const isPreviewableFile = (fileName) => {
  const ext = getFileExtension(fileName)
  return PREVIEWABLE_EXTENSIONS.includes(ext)
}

export const isImageFile = (fileName) => {
  const ext = getFileExtension(fileName)
  return IMAGE_EXTENSIONS.includes(ext)
}

export const downloadFile = async (filePath, fileName) => {
  try {
    const fullUrl = getFullFileUrl(filePath)
    const token = localStorage.getItem("token")

    const response = await axios.get(fullUrl, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      responseType: 'blob',
    })

    const contentType = response.headers?.['content-type'] || response.data?.type || 'application/octet-stream'
    const blob = response.data instanceof Blob
      ? response.data
      : new Blob([response.data], { type: contentType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading file:', error)
    throw error
  }
}

export const getFileTypeLabel = (fileName) => {
  const ext = getFileExtension(fileName)
  if (IMAGE_EXTENSIONS.includes(ext)) return 'صورة'
  return ext.toUpperCase()
}

export { getFullFileUrl }

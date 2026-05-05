import { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { FileUpload } from 'primereact/fileupload'
import { Toast } from 'primereact/toast'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import * as API from '../../services/api'
import { uploadProjectFile, getProjectFiles, deleteProjectFile, createTask, updateTask } from '../../services/api'
import FilePreviewDialog from '../../components/office/FilePreviewDialog'
import ViewProofDialog from '../../components/office/ViewProofDialog'
import ProofOfWorkDialog from '../../components/office/ProofOfWorkDialog'
import { getFileIcon, isPreviewableFile, downloadFile, getFileExtension } from '../../utils/fileUtils'
import styles from './ProjectDetailsPage.module.css'

// ─── Normalizer helpers ────────────────────────────────────────────────────────

const normalizeStatus = (raw) => {
  if (!raw) return 'In Progress'
  const s = String(raw).toLowerCase().replace(/[\s_-]/g, '')
  if (s === 'completed' || s === 'مكتمل') return 'Completed'
  return 'In Progress'
}

const normalizePriority = (raw) => {
  if (!raw) return 'Medium'
  const key = String(raw).toLowerCase()
  if (key === 'high') return 'High'
  if (key === 'low') return 'Low'
  return 'Medium'
}

// Strips the time portion from ISO datetime strings (e.g. "2024-01-15T00:00:00.000Z" → "2024-01-15")
const normalizeDate = (raw) => (raw ? String(raw).split('T')[0] : '')

const normalizeProjectFile = (raw) => ({
  id: raw.id,
  publicId: raw.publicId || raw.public_id,
  name: raw.fileName || raw.name,
  size: raw.fileSize || raw.size,
  path: raw.fileUrl || raw.path,
  uploadedBy: typeof raw.uploadedBy === 'object' ? raw.uploadedBy.fullName : raw.uploadedBy,
  uploadedAt: normalizeDate(raw.createdAt || raw.uploadedAt),
})

const normalizeTask = (raw) => ({
  id: raw.id,
  name: raw.name || raw.title || '',
  status: normalizeStatus(raw.status),
  priority: normalizePriority(raw.priority),
  dueDate: normalizeDate(raw.due_date || raw.dueDate),
  // Prefer the assignedTo relation object; fall back to flat ID/name fields
  assignedToId: String(
    raw.assigned_to?.id ?? raw.assignedTo?.id ?? raw.assigned_to_id ?? raw.assignedToId ?? ''
  ),
  assignedTo:
    raw.assigned_to?.fullName ??
    raw.assignedTo?.fullName ??
    raw.assigned_to_name ??
    raw.assignedToName ??
    (typeof raw.assignedTo === 'string' ? raw.assignedTo : '') ??
    '',
  completionNotes: raw.completion_notes || raw.completionNotes || null,
  attachments: Array.isArray(raw.attachments) ? raw.attachments : [],
})

const normalizeProjectDetails = (raw) => ({
  id: raw.id,
  publicId: raw.publicId || raw.public_id,
  name: raw.name || raw.title || '',
  description: raw.description || '',
  budget: raw.budget ?? 0,
  status: normalizeStatus(raw.status),
  startDate: normalizeDate(raw.start_date || raw.startDate),
  // endDate is the canonical field; dueDate is kept as fallback for older payloads
  endDate: normalizeDate(raw.end_date || raw.endDate || raw.due_date || raw.dueDate),
  client:
    raw.client?.name ||
    raw.client_name ||
    raw.clientName ||
    (typeof raw.client === 'string' ? raw.client : '') ||
    '',
  managerId: String(
    raw.projectManager?.id ??
    raw.project_manager?.id ??
    raw.manager?.id ??
    raw.managerId ??
    raw.manager_id ??
    ''
  ),
  managerName:
    raw.projectManager?.fullName ??
    raw.project_manager?.fullName ??
    raw.manager?.name ??
    raw.managerName ??
    '',
  tasks: Array.isArray(raw.tasks) ? raw.tasks.map(normalizeTask) : [],
  files: Array.isArray(raw.files) ? raw.files : [],
})

// ─── Priority / status options ─────────────────────────────────────────────────

const PRIORITY_OPTIONS = [
  { label: 'عالي', value: 'High' },
  { label: 'متوسط', value: 'Medium' },
  { label: 'منخفض', value: 'Low' },
]

const PRIORITY_FILTER_OPTIONS = [
  { label: 'جميع الأولويات', value: null },
  { label: 'عالية', value: 'High' },
  { label: 'متوسطة', value: 'Medium' },
  { label: 'منخفضة', value: 'Low' },
]

// Falls back to the name embedded in each task object before trying the users list
const resolveAssigneeName = (task, users) => {
  if (task.assignedTo) return task.assignedTo
  const found = users.find((u) => String(u.id ?? u.publicId ?? u.public_id) === String(task.assignedToId))
  if (!found) return 'غير محدد'
  const name = found.fullName || found.full_name || found.name || found.username || 'مستخدم'
  return found.role === 'office_owner' ? `${name} (صاحب المكتب)` : name
}

// ─── Component ─────────────────────────────────────────────────────────────────

function ProjectDetailsPage() {
  const { id } = useParams()   // this is the publicId coming from the URL
  const navigate = useNavigate()
  const toastRef = useRef(null)
  const fileUploadRef = useRef(null)
  const projectFileUploadRef = useRef(null)
  const { currentUser } = useAuth()

  const [projectData, setProjectData] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setFetchError(null)
      try {
        // id from useParams is the publicId string — do NOT parseInt it
        let allUsers = []
        let rawProject

        try {
          const results = await Promise.all([
            API.getProjectById(id),
            API.getOfficeEmployees(),
          ])
          rawProject = results[0]
          allUsers = Array.isArray(results[1]) ? results[1] : (results[1]?.data ?? [])
        } catch (innerError) {
          if (innerError.config?.url?.includes('/users')) {
            rawProject = await API.getProjectById(id)
            allUsers = []
          } else {
            throw innerError
          }
        }

        const normalized = normalizeProjectDetails(rawProject)
        setProjectData(normalized)
        setTasks(normalized.tasks)
        setUsers(allUsers)

        // Fetch files separately from the API
        const files = await getProjectFiles(id)
        const normalizedFiles = Array.isArray(files) ? files.map(normalizeProjectFile) : (files?.data ?? []).map(normalizeProjectFile)
        setProjectFiles(normalizedFiles)
      } catch (error) {
        if (error.response?.status === 404) {
          // Leave projectData as null — the not-found screen renders below
        } else {
          setFetchError('فشل في تحميل بيانات المشروع. يرجى المحاولة مجدداً.')
          toastRef.current?.show({
            severity: 'error',
            summary: 'خطأ',
            detail: 'فشل في تحميل بيانات المشروع',
            life: 3000,
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const [tasks, setTasks] = useState([])
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editTaskDialogVisible, setEditTaskDialogVisible] = useState(false)
  const [proofDialogVisible, setProofDialogVisible] = useState(false)
  const [viewProofDialogVisible, setViewProofDialogVisible] = useState(false)
  const [filePreviewDialogVisible, setFilePreviewDialogVisible] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedProofTask, setSelectedProofTask] = useState(null)
  const [proofTaskId, setProofTaskId] = useState(null)
  const [currentTask, setCurrentTask] = useState({
    id: null,
    name: '',
    assignedToId: null,
    dueDate: null,
    priority: 'Medium',
    status: 'In Progress',
    attachments: [],
  })

  const [projectFiles, setProjectFiles] = useState([])
  const [deleteFileDialogVisible, setDeleteFileDialogVisible] = useState(false)
  const [fileToDelete, setFileToDelete] = useState(null)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [deletingFile, setDeletingFile] = useState(false)

  const [myTasksPriorityFilter, setMyTasksPriorityFilter] = useState(null)
  const [allTasksPriorityFilter, setAllTasksPriorityFilter] = useState(null)
  const [savingTask, setSavingTask] = useState(false)
  const [taskFormErrors, setTaskFormErrors] = useState({})

  // ── Loading state ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.loadingContainer}>
          <ProgressSpinner style={{ width: '56px', height: '56px' }} strokeWidth="4" />
        </div>
      </DashboardLayout>
    )
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <DashboardLayout>
        <div className={styles.errorContainer}>
          <i className="pi pi-exclamation-circle" style={{ fontSize: '2.5rem', color: '#ef4444' }} />
          <h2>{fetchError}</h2>
          <Button
            label="العودة للمشاريع"
            icon="pi pi-arrow-right"
            onClick={() => navigate('/office/projects')}
          />
        </div>
      </DashboardLayout>
    )
  }

  // ── Not-found state ──────────────────────────────────────────────────────────
  if (!projectData) {
    return (
      <DashboardLayout>
        <div className={styles.errorContainer}>
          <i className="pi pi-exclamation-triangle" />
          <h2>المشروع غير موجود</h2>
          <Button
            label="العودة للمشاريع"
            icon="pi pi-arrow-right"
            onClick={() => navigate('/office/projects')}
          />
        </div>
      </DashboardLayout>
    )
  }

  // ── Derived values ───────────────────────────────────────────────────────────

  const userId = String(currentUser?.sub || currentUser?.id || '')
  const isOfficeOwner = currentUser?.role === 'office_owner'
  const isProjectManager = projectData.managerId === userId
  const canManageProject = isOfficeOwner || isProjectManager

  const getAssignedUsersOptions = () => {
    const normalized = users.map((u) => {
      const id = String(u.id ?? u.publicId ?? u.public_id ?? '')
      const fullName = u.fullName || u.full_name || u.name || u.username || 'مستخدم'
      const role = u.role || ''
      return { id, fullName, role }
    }).filter((u) => u.id)

    const currentUserId = String(currentUser?.sub || currentUser?.id || currentUser?.publicId || '')
    const currentUserName = currentUser?.fullName || currentUser?.full_name || currentUser?.name || currentUser?.username || 'أنا'
    const currentUserRole = currentUser?.role || ''

    const hasCurrentUser = normalized.some((u) => u.id === currentUserId)
    const list = hasCurrentUser
      ? normalized
      : [{ id: currentUserId, fullName: currentUserName, role: currentUserRole }, ...normalized]

    return list.map((u) => {
      let label = u.fullName
      if (u.id === currentUserId) {
        label = `${u.fullName} (أنا${u.role === 'office_owner' ? ' - صاحب المكتب' : ''})`
      } else if (u.role === 'office_owner') {
        label = `${u.fullName} (صاحب المكتب)`
      }
      return { label, value: u.id }
    })
  }

  const getVisibleTasks = () => {
    if (canManageProject) return tasks
    return tasks.filter((t) => t.assignedToId === userId)
  }

  const getFilteredMyTasks = () => {
    let filtered = tasks.filter((t) => t.assignedToId === userId)
    if (myTasksPriorityFilter) filtered = filtered.filter((t) => t.priority === myTasksPriorityFilter)
    return filtered
  }

  const getFilteredAllTasks = () => {
    let filtered = tasks
    if (allTasksPriorityFilter) filtered = filtered.filter((t) => t.priority === allTasksPriorityFilter)
    return filtered
  }

  const myTasks = getFilteredMyTasks()
  const allTasks = getFilteredAllTasks()

  // Progress is always computed from the live tasks array
  const completedTasksCount = tasks.filter((t) => t.status === 'Completed').length
  const totalTasksCount = tasks.length
  const projectProgress =
    totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0

  // ── Event handlers ───────────────────────────────────────────────────────────

  const openNewTaskDialog = () => {
    setCurrentTask({
      id: null,
      name: '',
      assignedToId: null,
      dueDate: null,
      priority: 'Medium',
      status: 'In Progress',
      attachments: [],
    })
    setTaskFormErrors({})
    setDialogVisible(true)
  }

  const openEditTaskDialog = (task) => {
    setCurrentTask({ ...task })
    setTaskFormErrors({})
    setEditTaskDialogVisible(true)
  }

  const openProofDialog = (task) => {
    setProofTaskId(task.id)
    setProofDialogVisible(true)
  }

  const handleFileUpload = (event) => {
    const files = event.files.map((file) => file.name)
    setCurrentTask({ ...currentTask, attachments: [...(currentTask.attachments || []), ...files] })
    fileUploadRef.current?.clear()
    toastRef.current?.show({
      severity: 'success',
      summary: 'تم الرفع',
      detail: `تم رفع ${files.length} ملف`,
      life: 2000,
    })
  }

  const handleProjectFileUpload = async (event) => {
    const files = event.files
    if (!files || files.length === 0) return

    setUploadingFile(true)
    let uploadedCount = 0
    let failedCount = 0

    for (const file of files) {
      try {
        await uploadProjectFile(projectData.publicId || projectData.id, file)
        uploadedCount++
      } catch (error) {
        console.error('Error uploading file:', error)
        failedCount++
      }
    }

    // Clear file input
    projectFileUploadRef.current?.clear()

    // Show success message
    if (uploadedCount > 0) {
      toastRef.current?.show({
        severity: 'success',
        summary: 'تم الرفع',
        detail: `تم رفع ${uploadedCount} ملف بنجاح`,
        life: 2000,
      })
    }

    // Show error message if any failed
    if (failedCount > 0) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: `فشل رفع ${failedCount} ملف. يرجى التحقق من حجم الملف والمحاولة مجدداً.`,
        life: 3000,
      })
    }

    // Re-fetch files list
    await loadProjectFiles()
    setUploadingFile(false)
  }

  const confirmDeleteFile = (file) => {
    setFileToDelete(file)
    setDeleteFileDialogVisible(true)
  }

  const handleDeleteProjectFile = async () => {
    setDeletingFile(true)
    try {
      await deleteProjectFile(fileToDelete.publicId || fileToDelete.id)
      setProjectFiles((prev) => prev.filter((f) => (f.publicId || f.id) !== (fileToDelete.publicId || fileToDelete.id)))
      toastRef.current?.show({
        severity: 'success',
        summary: 'تم الحذف',
        detail: 'تم حذف الملف بنجاح',
        life: 2000,
      })
    } catch (error) {
      console.error('Error deleting file:', error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل حذف الملف. يرجى المحاولة مجدداً.',
        life: 3000,
      })
    } finally {
      setDeletingFile(false)
      setDeleteFileDialogVisible(false)
      setFileToDelete(null)
    }
  }

  const loadProjectFiles = async () => {
    try {
      const files = await getProjectFiles(id)
      const normalizedFiles = Array.isArray(files) ? files.map(normalizeProjectFile) : (files?.data ?? []).map(normalizeProjectFile)
      setProjectFiles(normalizedFiles)
    } catch (error) {
      console.error('Error fetching project files:', error)
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return 'غير معروف'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  const openFilePreview = (filePath, fileName) => {
    setSelectedFile({ url: filePath, name: fileName, type: getFileExtension(fileName) })
    setFilePreviewDialogVisible(true)
  }

  const handleFileDownload = async (filePath, fileName) => {
    try {
      await downloadFile(filePath, fileName)
    } catch (error) {
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل تحميل الملف. يرجى المحاولة مجدداً.',
        life: 3000,
      })
    }
  }

  const saveTask = async () => {
    const errors = {}

    if (!currentTask.name || !currentTask.assignedToId || !currentTask.dueDate) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'أكمل جميع الحقول المطلوبة',
        life: 2500,
      })
      return
    }

    const dueDateObj = currentTask.dueDate instanceof Date ? currentTask.dueDate : new Date(currentTask.dueDate)
    const endDateObj = new Date(projectData.endDate)

    if (dueDateObj > endDateObj) {
      errors.dueDate = 'تاريخ التسليم لا يمكن أن يكون بعد تاريخ انتهاء المشروع'
    }

    if (Object.keys(errors).length > 0) {
      setTaskFormErrors(errors)
      return
    }

    setSavingTask(true)
    try {
      const taskPayload = {
        name: currentTask.name,
        assignedToId: String(currentTask.assignedToId),
        dueDate: dueDateObj.toISOString().split('T')[0],
        priority: currentTask.priority,
        status: currentTask.status,
      }

      await createTask(projectData.id, taskPayload)
      toastRef.current?.show({ severity: 'success', summary: 'تمت الإضافة', detail: 'تم إضافة المهمة بنجاح', life: 2000 })
      setDialogVisible(false)
      setTaskFormErrors({})

      const updatedTasks = await API.getTasksByProject(projectData.id)
      setTasks(Array.isArray(updatedTasks) ? updatedTasks.map(normalizeTask) : [])
    } catch (error) {
      console.error('Error creating task:', error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل إنشاء المهمة. يرجى المحاولة مجدداً.',
        life: 3000,
      })
    } finally {
      setSavingTask(false)
    }
  }

  const updateTaskImpl = async () => {
    const errors = {}

    if (!currentTask.name || !currentTask.assignedToId || !currentTask.dueDate) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'أكمل جميع الحقول المطلوبة',
        life: 2500,
      })
      return
    }

    const dueDateObj = currentTask.dueDate instanceof Date ? currentTask.dueDate : new Date(currentTask.dueDate)
    const endDateObj = new Date(projectData.endDate)

    if (dueDateObj > endDateObj) {
      errors.dueDate = 'تاريخ التسليم لا يمكن أن يكون بعد تاريخ انتهاء المشروع'
    }

    if (Object.keys(errors).length > 0) {
      setTaskFormErrors(errors)
      return
    }

    setSavingTask(true)
    try {
      const taskPayload = {
        name: currentTask.name,
        assignedToId: String(currentTask.assignedToId),
        dueDate: dueDateObj.toISOString().split('T')[0],
        priority: currentTask.priority,
        status: currentTask.status,
      }

      await updateTask(projectData.id, currentTask.id, taskPayload)
      toastRef.current?.show({ severity: 'success', summary: 'تم التحديث', detail: 'تم تحديث المهمة بنجاح', life: 2000 })
      setEditTaskDialogVisible(false)
      setTaskFormErrors({})

      const updatedTasks = await API.getTasksByProject(projectData.id)
      setTasks(Array.isArray(updatedTasks) ? updatedTasks.map(normalizeTask) : [])
    } catch (error) {
      console.error('Error updating task:', error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل تحديث المهمة. يرجى المحاولة مجدداً.',
        life: 3000,
      })
    } finally {
      setSavingTask(false)
    }
  }

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId))
    toastRef.current?.show({ severity: 'success', summary: 'تم الحذف', detail: 'تم حذف المهمة بنجاح', life: 2000 })
  }

  const handleProofSubmit = (completionNotes, attachments) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === proofTaskId
          ? { ...task, status: 'Completed', completionNotes, attachments }
          : task
      )
    )
    toastRef.current?.show({ severity: 'success', summary: 'تم الإنجاز', detail: 'تم تسليم المهمة بنجاح', life: 2000 })
    setProofDialogVisible(false)
    setProofTaskId(null)
  }

  // ── Tag helpers ──────────────────────────────────────────────────────────────

  const getStatusSeverity = (status) => {
    const map = { Planning: 'info', 'In Progress': 'warning', Completed: 'success', Cancelled: 'danger' }
    return map[status] || 'info'
  }

  const getTaskStatusSeverity = (status) => {
    const map = { 'In Progress': 'warning', Completed: 'success' }
    return map[status] || 'warning'
  }

  const getPrioritySeverity = (priority) => {
    const map = { High: 'danger', Medium: 'warning', Low: 'info' }
    return map[priority] || 'info'
  }

  // ── Table body templates ─────────────────────────────────────────────────────

  const taskStatusBodyTemplate = (rowData) => {
    const labels = { 'In Progress': 'قيد التنفيذ', Completed: 'مكتملة' }
    return <Tag value={labels[rowData.status]} severity={getTaskStatusSeverity(rowData.status)} />
  }

  const taskPriorityBodyTemplate = (rowData) => {
    const labels = { High: 'عالي', Medium: 'متوسط', Low: 'منخفض' }
    return <Tag value={labels[rowData.priority]} severity={getPrioritySeverity(rowData.priority)} />
  }

  const renderProofButton = (rowData) => {
    if (rowData.status === 'Completed' && rowData.completionNotes) {
      return (
        <Button
          icon="pi pi-eye"
          rounded
          text
          severity="info"
          tooltip="عرض إثبات العمل"
          tooltipOptions={{ position: 'top' }}
          onClick={() => { setSelectedProofTask(rowData); setViewProofDialogVisible(true) }}
        />
      )
    }
    return null
  }

  const taskActionsBodyTemplate = (rowData) => {
    const isAssignedToCurrentUser = rowData.assignedToId === userId
    const taskNotCompleted = rowData.status !== 'Completed'
    return (
      <div className={styles.taskActions}>
        {isAssignedToCurrentUser && taskNotCompleted && (
          <Button
            icon="pi pi-check"
            rounded text severity="success"
            tooltip="إنهاء المهمة"
            tooltipOptions={{ position: 'top' }}
            onClick={() => openProofDialog(rowData)}
          />
        )}
        {renderProofButton(rowData)}
      </div>
    )
  }

  const taskActionsBodyTemplateForManagers = (rowData) => {
    const isAssignedToCurrentUser = rowData.assignedToId === userId
    const taskNotCompleted = rowData.status !== 'Completed'
    return (
      <div className={styles.taskActions}>
        {isAssignedToCurrentUser && taskNotCompleted && (
          <Button icon="pi pi-check" rounded text severity="success" tooltip="إنهاء المهمة" tooltipOptions={{ position: 'top' }} onClick={() => openProofDialog(rowData)} />
        )}
        {taskNotCompleted && (
          <Button icon="pi pi-pencil" rounded text severity="info" tooltip="تعديل" tooltipOptions={{ position: 'top' }} onClick={() => openEditTaskDialog(rowData)} />
        )}
        {taskNotCompleted && (
          <Button icon="pi pi-trash" rounded text severity="danger" tooltip="حذف" tooltipOptions={{ position: 'top' }} onClick={() => deleteTask(rowData.id)} />
        )}
        {renderProofButton(rowData)}
      </div>
    )
  }

  // ── Dialog footers ───────────────────────────────────────────────────────────

  const dialogFooter = (
    <div>
      <Button label="إلغاء" icon="pi pi-times" disabled={savingTask} onClick={() => setDialogVisible(false)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#64748b' }} />
      <Button label={savingTask ? 'جاري الحفظ...' : 'حفظ'} icon={savingTask ? 'pi pi-spin pi-spinner' : 'pi pi-check'} disabled={savingTask} style={{ background: savingTask ? '#cbd5e1' : '#2d3e50', border: 'none', color: '#cbd5e1' }} onClick={saveTask} />
    </div>
  )

  const editTaskDialogFooter = (
    <div>
      <Button label="إلغاء" icon="pi pi-times" disabled={savingTask} onClick={() => setEditTaskDialogVisible(false)} style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#64748b' }} />
      <Button label={savingTask ? 'جاري التحديث...' : 'تحديث'} icon={savingTask ? 'pi pi-spin pi-spinner' : 'pi pi-check'} disabled={savingTask} style={{ background: savingTask ? '#cbd5e1' : '#2d3e50', border: 'none', color: '#cbd5e1' }} onClick={updateTaskImpl} />
    </div>
  )

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <DashboardLayout>
      <Toast ref={toastRef} />

      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Button
            label="المشاريع"
            icon="pi pi-arrow-right"
            className="p-button-text"
            onClick={() => navigate('/office/projects')}
            style={{ color: 'var(--primary-lighter)' }}
          />
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{projectData.name}</span>
        </div>

        <div className={styles.header}>
          <div className={styles.headerRight}>
            <h1 className={styles.title}>{projectData.name}</h1>
            <p className={styles.clientName}>
              <i className="pi pi-user" />
              {projectData.client}
            </p>
          </div>
          <Tag
            value={
              projectData.status === 'Completed'
                ? 'مكتمل'
                : projectData.status === 'In Progress'
                ? 'قيد التنفيذ'
                : 'تخطيط'
            }
            severity={getStatusSeverity(projectData.status)}
            style={{ fontSize: '14px', padding: '6px 12px' }}
          />
        </div>

        <TabView>
          {/* ── Overview tab ────────────────────────────────────────────────── */}
          <TabPanel header="نظرة عامة" rightIcon="pi pi-info-circle mr-2">
            <div className={styles.overviewGrid}>
              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>
                  <i className="pi pi-info-circle" />
                  معلومات المشروع
                </h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>الميزانية</span>
                    <span className={styles.infoValue}>
                      {new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(
                        projectData.budget
                      )}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>تاريخ البدء</span>
                    <span className={styles.infoValue}>{projectData.startDate}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>تاريخ الانتهاء</span>
                    <span className={styles.infoValue}>{projectData.endDate}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>مدير المشروع</span>
                    <span className={styles.infoValue}>
                      {projectData.managerName || 'غير محدد'}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>عدد المهام</span>
                    <span className={styles.infoValue}>{tasks.length}</span>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3 className={styles.cardTitle}>
                  <i className="pi pi-chart-bar" />
                  التقدم
                </h3>
                <div className={styles.progressContent}>
                  <div className={styles.progressHeader}>
                    <span className={styles.progressLabel}>نسبة الإنجاز</span>
                    <span className={styles.progressValue}>{projectProgress}%</span>
                  </div>
                  <ProgressBar value={projectProgress} style={{ height: '12px' }} showValue={false} />
                  <div className={styles.progressNote}>
                    {completedTasksCount} من {totalTasksCount} مهمة مكتملة
                  </div>
                </div>
              </div>

              <div className={styles.infoCardFullWidth}>
                <h3 className={styles.cardTitle}>
                  <i className="pi pi-align-right" />
                  الوصف
                </h3>
                <p className={styles.descriptionText}>
                  {projectData.description || 'لا يوجد وصف للمشروع'}
                </p>
              </div>
            </div>
          </TabPanel>

          {/* ── Tasks tab ───────────────────────────────────────────────────── */}
          <TabPanel header="المهام" rightIcon="pi pi-list mr-2">
            {canManageProject && (
              <div className={styles.addTaskButton}>
                <Button
                  label="إضافة مهمة"
                  icon="pi pi-plus"
                  style={{ background: 'var(--primary-dark)', border: 'none', color: '#cbd5e1' }}
                  onClick={openNewTaskDialog}
                />
              </div>
            )}

            {canManageProject && (
              <div className={styles.taskSection}>
                <div className={styles.taskSectionHeader}>
                  <h3 className={styles.taskSectionTitle}>
                    <i className="pi pi-user" />
                    مهامي المُسندة
                  </h3>
                  <div className={styles.taskFilterGroup}>
                    <label className={styles.taskFilterLabel}>فلتر الأولوية:</label>
                    <Dropdown
                      value={myTasksPriorityFilter}
                      options={PRIORITY_FILTER_OPTIONS}
                      onChange={(e) => setMyTasksPriorityFilter(e.value ?? null)}
                      placeholder="الكل"
                      style={{ width: '150px' }}
                    />
                  </div>
                </div>
                <DataTable value={myTasks} emptyMessage="لا توجد مهام مُسندة إليك" className="my-assigned-tasks-table">
                  <Column field="name" header="اسم المهمة" style={{ minWidth: '200px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column field="dueDate" header="تاريخ التسليم" style={{ minWidth: '130px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column field="priority" header="الأولوية" body={taskPriorityBodyTemplate} style={{ minWidth: '120px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column field="status" header="الحالة" body={taskStatusBodyTemplate} style={{ minWidth: '130px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column header="الإجراءات" body={taskActionsBodyTemplate} style={{ minWidth: '150px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                </DataTable>
              </div>
            )}

            {canManageProject && (
              <div>
                <div className={styles.taskSectionHeader}>
                  <h3 className={styles.taskSectionTitle}>
                    <i className="pi pi-list" />
                    جميع مهام المشروع
                  </h3>
                  <div className={styles.taskFilterGroup}>
                    <label className={styles.taskFilterLabel}>فلتر الأولوية:</label>
                    <Dropdown
                      value={allTasksPriorityFilter}
                      options={PRIORITY_FILTER_OPTIONS}
                      onChange={(e) => setAllTasksPriorityFilter(e.value ?? null)}
                      placeholder="الكل"
                      style={{ width: '150px' }}
                    />
                  </div>
                </div>
                <DataTable value={allTasks} paginator rows={10} emptyMessage="لا توجد مهام" className="all-project-tasks-table">
                  <Column field="name" header="اسم المهمة" style={{ minWidth: '200px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column
                    header="المسؤول"
                    body={(rowData) => resolveAssigneeName(rowData, users)}
                    style={{ minWidth: '180px', textAlign: 'right' }}
                    headerStyle={{ textAlign: 'right' }}
                    bodyStyle={{ textAlign: 'right' }}
                  />
                  <Column field="dueDate" header="تاريخ التسليم" style={{ minWidth: '130px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column field="priority" header="الأولوية" body={taskPriorityBodyTemplate} style={{ minWidth: '120px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column field="status" header="الحالة" body={taskStatusBodyTemplate} style={{ minWidth: '130px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                  <Column header="الإجراءات" body={taskActionsBodyTemplateForManagers} style={{ minWidth: '180px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                </DataTable>
              </div>
            )}

            {!canManageProject && (
              <DataTable value={getVisibleTasks()} paginator rows={10} emptyMessage="لا توجد مهام مُسندة إليك" className="employee-assigned-tasks-table">
                <Column field="name" header="اسم المهمة" style={{ minWidth: '200px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                <Column field="dueDate" header="تاريخ التسليم" style={{ minWidth: '130px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                <Column field="priority" header="الأولوية" body={taskPriorityBodyTemplate} style={{ minWidth: '120px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                <Column field="status" header="الحالة" body={taskStatusBodyTemplate} style={{ minWidth: '130px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
                <Column header="الإجراءات" body={taskActionsBodyTemplate} style={{ minWidth: '150px', textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
              </DataTable>
            )}
          </TabPanel>

          {/* ── Files tab ───────────────────────────────────────────────────── */}
          <TabPanel header="الملفات" rightIcon="pi pi-file mr-2">
            <div className={styles.filesSection}>
              {canManageProject && (
                <div className={styles.fileUploadArea}>
                  <div className={styles.fileUploadHeader}>
                    <h3 className={styles.fileUploadTitle}>
                      <i className="pi pi-upload" />
                      رفع ملفات المشروع
                    </h3>
                    <p className={styles.fileUploadHint}>يمكنك رفع ملفات بحد أقصى 10 ميجابايت لكل ملف</p>
                  </div>
                  <FileUpload
                    ref={projectFileUploadRef}
                    mode="basic"
                    multiple
                    customUpload
                    auto
                    uploadHandler={handleProjectFileUpload}
                    maxFileSize={10000000}
                    chooseLabel={uploadingFile ? 'جارٍ الرفع...' : 'اختر ملفات'}
                    disabled={uploadingFile}
                    className={styles.fileUploadButton}
                  />
                </div>
              )}

              {projectFiles.length > 0 ? (
                <div className={styles.filesGrid}>
                  <div className={styles.filesGridHeader}>
                    <h3 className={styles.filesGridTitle}>
                      <i className="pi pi-folder-open" />
                      ملفات المشروع ({projectFiles.length})
                    </h3>
                  </div>
                  <div className={styles.filesList}>
                    {projectFiles.map((file) => (
                      <div key={file.id} className={styles.fileCard}>
                        <div className={styles.fileCardInfo}>
                          <i className={`${getFileIcon(file.name)} ${styles.fileCardIcon}`} />
                          <div className={styles.fileCardDetails}>
                            <span className={styles.fileCardName}>{file.name}</span>
                            <div className={styles.fileCardMeta}>
                              <span>{formatFileSize(file.size)}</span>
                              <span>•</span>
                              <span>{file.uploadedBy}</span>
                              <span>•</span>
                              <span>{file.uploadedAt}</span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.fileCardActions}>
                          {isPreviewableFile(file.name) && (
                            <Button
                              icon="pi pi-eye"
                              className="p-button-rounded p-button-text p-button-info p-button-sm"
                              tooltip="عرض الملف"
                              tooltipOptions={{ position: 'top' }}
                              onClick={() => openFilePreview(file.path, file.name)}
                            />
                          )}
                          <Button
                            icon="pi pi-download"
                            className="p-button-rounded p-button-text p-button-secondary p-button-sm"
                            tooltip="تحميل الملف"
                            tooltipOptions={{ position: 'top' }}
                            onClick={() => handleFileDownload(file.path, file.name)}
                          />
                          {canManageProject && (
                            <Button
                              icon="pi pi-trash"
                              className="p-button-rounded p-button-text p-button-danger p-button-sm"
                              tooltip="حذف الملف"
                              tooltipOptions={{ position: 'top' }}
                              onClick={() => confirmDeleteFile(file)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                !canManageProject && (
                  <div className={styles.filesPlaceholder}>
                    <i className="pi pi-folder-open" />
                    <h3>لا توجد ملفات</h3>
                    <p>لم يتم رفع أي ملفات لهذا المشروع بعد</p>
                  </div>
                )
              )}
              {canManageProject && projectFiles.length === 0 && (
                <div className={styles.filesEmptyHint}>
                  <i className="pi pi-info-circle" />
                  <span>لم يتم رفع أي ملفات بعد. استخدم زر &quot;اختر ملفات&quot; أعلاه لإضافة ملفات المشروع.</span>
                </div>
              )}
            </div>
          </TabPanel>
        </TabView>

        {/* ── Add Task Dialog ──────────────────────────────────────────────── */}
        <Dialog visible={dialogVisible} style={{ width: '500px' }} header="إضافة مهمة جديدة" modal footer={dialogFooter} onHide={() => setDialogVisible(false)}>
          <div className={styles.formGrid}>
            <div>
              <label htmlFor="taskName" className={styles.label}>اسم المهمة *</label>
              <InputText id="taskName" value={currentTask.name} onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })} style={{ width: '100%' }} />
            </div>
            <div>
              <label htmlFor="assignedToId" className={styles.label}>تعيين إلى *</label>
              <Dropdown id="assignedToId" value={currentTask.assignedToId} options={getAssignedUsersOptions()} onChange={(e) => setCurrentTask({ ...currentTask, assignedToId: e.value })} placeholder="اختر الموظف" style={{ width: '100%' }} />
            </div>
            <div>
              <label htmlFor="dueDate" className={styles.label}>تاريخ التسليم *</label>
              <Calendar
                id="dueDate"
                value={currentTask.dueDate}
                onChange={(e) => {
                  setCurrentTask({ ...currentTask, dueDate: e.value })
                  setTaskFormErrors({})
                }}
                dateFormat="yy-mm-dd"
                showIcon
                style={{ width: '100%' }}
                minDate={new Date(projectData.startDate)}
                maxDate={new Date(projectData.endDate)}
              />
              {taskFormErrors.dueDate && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="pi pi-exclamation-circle" style={{ fontSize: '12px' }} />
                  {taskFormErrors.dueDate}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="priority" className={styles.label}>الأولوية</label>
              <Dropdown id="priority" value={currentTask.priority} options={PRIORITY_OPTIONS} onChange={(e) => setCurrentTask({ ...currentTask, priority: e.value })} style={{ width: '100%' }} />
            </div>
            <div>
              <label htmlFor="attachments" className={styles.label}>المرفقات (اختياري)</label>
              <FileUpload ref={fileUploadRef} mode="basic" multiple accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx" maxFileSize={10000000} chooseLabel="اختر الملفات" onUpload={handleFileUpload} auto customUpload uploadHandler={handleFileUpload} />
              {currentTask.attachments && currentTask.attachments.length > 0 && (
                <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
                  <strong>الملفات المرفقة:</strong>
                  <ul style={{ margin: '4px 0', paddingRight: '20px' }}>
                    {currentTask.attachments.map((file, idx) => <li key={idx}>{file}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Dialog>

        {/* ── Edit Task Dialog ─────────────────────────────────────────────── */}
        <Dialog visible={editTaskDialogVisible} style={{ width: '500px' }} header="تعديل المهمة" modal footer={editTaskDialogFooter} onHide={() => setEditTaskDialogVisible(false)}>
          <div className={styles.formGrid}>
            <div>
              <label htmlFor="editTaskName" className={styles.label}>اسم المهمة *</label>
              <InputText id="editTaskName" value={currentTask.name} onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })} style={{ width: '100%' }} />
            </div>
            <div>
              <label htmlFor="editAssignedToId" className={styles.label}>تعيين إلى *</label>
              <Dropdown id="editAssignedToId" value={currentTask.assignedToId} options={getAssignedUsersOptions()} onChange={(e) => setCurrentTask({ ...currentTask, assignedToId: e.value })} placeholder="اختر الموظف" style={{ width: '100%' }} />
            </div>
            <div>
              <label htmlFor="editDueDate" className={styles.label}>تاريخ التسليم *</label>
              <Calendar
                id="editDueDate"
                value={currentTask.dueDate}
                onChange={(e) => {
                  setCurrentTask({ ...currentTask, dueDate: e.value })
                  setTaskFormErrors({})
                }}
                dateFormat="yy-mm-dd"
                showIcon
                style={{ width: '100%' }}
                minDate={new Date(projectData.startDate)}
                maxDate={new Date(projectData.endDate)}
              />
              {taskFormErrors.dueDate && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="pi pi-exclamation-circle" style={{ fontSize: '12px' }} />
                  {taskFormErrors.dueDate}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="editPriority" className={styles.label}>الأولوية</label>
              <Dropdown id="editPriority" value={currentTask.priority} options={PRIORITY_OPTIONS} onChange={(e) => setCurrentTask({ ...currentTask, priority: e.value })} style={{ width: '100%' }} />
            </div>
          </div>
        </Dialog>

        <ProofOfWorkDialog
          visible={proofDialogVisible}
          onHide={() => { setProofDialogVisible(false); setProofTaskId(null) }}
          onSubmit={handleProofSubmit}
          toastRef={toastRef}
        />

        <ViewProofDialog
          visible={viewProofDialogVisible}
          task={selectedProofTask}
          onHide={() => { setViewProofDialogVisible(false); setSelectedProofTask(null) }}
        />

        <FilePreviewDialog
          visible={filePreviewDialogVisible}
          file={selectedFile}
          onHide={() => { setFilePreviewDialogVisible(false); setSelectedFile(null) }}
        />

        {/* ── Delete File Confirmation ─────────────────────────────────────── */}
        <Dialog
          visible={deleteFileDialogVisible}
          style={{ width: '400px' }}
          header="تأكيد الحذف"
          modal
          footer={
            <div>
              <Button label="إلغاء" icon="pi pi-times" className="p-button-text" onClick={() => setDeleteFileDialogVisible(false)} />
              <Button label="حذف" icon="pi pi-trash" severity="danger" onClick={handleDeleteProjectFile} />
            </div>
          }
          onHide={() => setDeleteFileDialogVisible(false)}
        >
          <div className={styles.deleteConfirmContent}>
            <i className="pi pi-exclamation-triangle" />
            <p>هل أنت متأكد من حذف الملف <strong>{fileToDelete?.name}</strong>؟</p>
          </div>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

export default ProjectDetailsPage

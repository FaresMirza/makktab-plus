import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { Badge } from 'primereact/badge'
import { ProgressBar } from 'primereact/progressbar'
import { ProgressSpinner } from 'primereact/progressspinner'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dialog } from 'primereact/dialog'
import { ConfirmDialog } from 'primereact/confirmdialog'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import { Toast } from 'primereact/toast'
import { FileUpload } from 'primereact/fileupload'
import DashboardLayout from '../../layouts/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { getAllProjects, createProject, deleteProject, uploadProjectFile } from '../../services/api'
import styles from './ProjectsPage.module.css'

const normalizeStatus = (raw) => {
  if (!raw) return 'In Progress'
  const s = String(raw).toLowerCase().replace(/[\s_-]/g, '')
  if (s === 'completed' || s === 'مكتمل') return 'Completed'
  return 'In Progress'
}

const normalizeDate = (raw) => (raw ? String(raw).split('T')[0] : '')

const normalizeProject = (raw) => {
  const tasks = Array.isArray(raw.tasks)
    ? raw.tasks.map((t) => ({
        assignedToId: String(
          t.assigned_to_id ?? t.assignedToId ?? t.assigned_to?.id ?? t.employee_id ?? t.employeeId ?? ''
        ),
        status: t.status ?? '',
      }))
    : []

  const totalTasks = raw.tasks_count ?? raw.tasksCount ?? raw.total_tasks ?? tasks.length ?? 0

  const completedTasks =
    raw.completed_tasks_count ??
    raw.completedTasksCount ??
    raw.completed_tasks ??
    tasks.filter((t) => {
      const s = String(t.status).toLowerCase()
      return s === 'completed' || s === 'مكتمل'
    }).length

  const progress =
    raw.progress ??
    raw.completion_percentage ??
    (totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0)

  return {
    id: raw.id,
    publicId: raw.publicId || raw.public_id || raw.id,
    name: raw.name || raw.title || '',
    client:
      raw.client?.name ||
      raw.client_name ||
      raw.clientName ||
      (typeof raw.client === 'string' ? raw.client : '') ||
      '',
    budget: raw.budget ?? 0,
    status: normalizeStatus(raw.status),
    progress,
    startDate: normalizeDate(raw.start_date || raw.startDate || ''),
    dueDate: normalizeDate(raw.end_date || raw.endDate || raw.due_date || raw.dueDate || ''),
    tasksCount: totalTasks,
    completedTasks,
    managerId: String(
      raw.projectManager?.id ?? raw.project_manager?.id ?? raw.manager_id ?? raw.managerId ?? raw.manager?.id ?? ''
    ),
    managerName:
      raw.projectManager?.fullName ??
      raw.project_manager?.fullName ??
      raw.manager?.name ??
      raw.managerName ??
      null,
    tasks,
  }
}

const getManagerDisplay = (project) => {
  if (project.managerName) return project.managerName
  const found = MOCK_EMPLOYEES.find((u) => String(u.id) === String(project.managerId))
  if (!found) return 'غير محدد'
  return found.role === 'office_owner' ? `${found.name} (مالك المكتب)` : found.name
}

function ProjectsPage() {
  const { currentUser } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [saving, setSaving] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    clientName: '',
    budget: null,
    startDate: null,
    endDate: null,
    projectManagerUserId: null,
    status: 'in_progress',
  })
  const [formErrors, setFormErrors] = useState({})
  const [projectNameError, setProjectNameError] = useState(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const toastRef = useRef(null)
  const fileUploadRef = useRef(null)
  const navigate = useNavigate()

  const isOfficeOwner = currentUser?.role === 'office_owner'

  const validateForm = (project) => {
    const errors = {}

    if (project.startDate && project.endDate && project.endDate < project.startDate) {
      errors.dateRange = 'تاريخ الانتهاء يجب أن يكون بعد أو يساوي تاريخ البدء'
    }

    return errors
  }

  const isFormValid = () => {
    return (
      newProject.name &&
      newProject.clientName &&
      newProject.budget &&
      newProject.startDate &&
      newProject.endDate &&
      newProject.projectManagerUserId &&
      Object.keys(formErrors).length === 0 &&
      !projectNameError &&
      newProject.endDate >= newProject.startDate
    )
  }

  const loadProjects = async () => {
    setLoading(true)
    setFetchError(null)
    try {
      const data = await getAllProjects()
      const raw = Array.isArray(data) ? data : (data?.data ?? data?.projects ?? [])
      setProjects(raw.map(normalizeProject))
    } catch {
      setFetchError('تعذّر تحميل المشاريع. يرجى المحاولة مجدداً.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filterTabs = [
    { key: 'all', label: 'كل المشاريع' },
    { key: 'completed', label: 'المكتملة' },
    { key: 'in-progress', label: 'قيد التنفيذ' },
    { key: 'not-started', label: 'لم تنفذ' },
  ]

  const getProjectViewInfo = (project) => {
    if (isOfficeOwner) return { visible: true, badge: null, canManage: true }

    const userId = String(currentUser?.sub || currentUser?.id || '')
    const isManager = project.managerId === userId

    if (!project.tasks?.length) {
      return { visible: true, badge: isManager ? 'managed' : null, canManage: isManager }
    }

    const hasTasks = project.tasks.some((t) => t.assignedToId === userId)

    if (isManager) return { visible: true, badge: 'managed', canManage: true }
    if (hasTasks) return { visible: true, badge: 'participating', canManage: false }
    return { visible: false, badge: null, canManage: false }
  }

  const filteredProjects = projects
    .filter((project) => getProjectViewInfo(project).visible)
    .filter((project) => {
      if (activeFilter === 'all') return true
      if (activeFilter === 'completed') return project.status === 'Completed'
      if (activeFilter === 'in-progress') return project.status === 'In Progress' && project.progress > 0
      if (activeFilter === 'not-started') return project.status === 'In Progress' && project.progress === 0
      return true
    })
    .filter(
      (project) =>
        (project.name || '').toLowerCase().includes(searchValue.toLowerCase()) ||
        (project.client || '').toLowerCase().includes(searchValue.toLowerCase())
    )

  const getStatusSeverity = (status) => {
    const map = { 'In Progress': 'warning', Completed: 'success' }
    return map[status] || 'warning'
  }

  const getStatusLabel = (status) => {
    const map = { 'In Progress': 'قيد التنفيذ', Completed: 'مكتمل' }
    return map[status] || status
  }

  const openNewProjectDialog = () => {
    setNewProject({
      name: '',
      description: '',
      clientName: '',
      budget: null,
      startDate: null,
      endDate: null,
      projectManagerUserId: currentUser?.sub || currentUser?.id || null,
      status: 'in_progress',
    })
    setFormErrors({})
    setProjectNameError(null)
    setSelectedFiles([])
    fileUploadRef.current?.clear()
    setDialogVisible(true)
  }

  const handleFilesSelected = (event) => {
    const incoming = Array.from(event.files || [])
    setSelectedFiles((prev) => {
      const existingKeys = new Set(prev.map((f) => `${f.name}-${f.size}`))
      const merged = [...prev]
      for (const f of incoming) {
        const key = `${f.name}-${f.size}`
        if (!existingKeys.has(key)) {
          merged.push(f)
          existingKeys.add(key)
        }
      }
      return merged
    })
    fileUploadRef.current?.clear()
  }

  const removeSelectedFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatBytes = (bytes) => {
    if (!bytes) return '0 B'
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  const saveProject = async () => {
    setSaving(true)
    setProjectNameError(null)
    try {
      const payload = {
        name: newProject.name,
        description: newProject.description,
        clientName: newProject.clientName,
        budget: Number(newProject.budget),
        startDate: newProject.startDate.toISOString().split('T')[0],
        endDate: newProject.endDate.toISOString().split('T')[0],
        projectManagerUserId: String(newProject.projectManagerUserId),
        status: 'IN_PROGRESS',
      }

      const created = await createProject(payload)
      const newPublicId = created?.publicId || created?.public_id || created?.data?.publicId || created?.id

      let uploadedCount = 0
      let failedCount = 0
      if (selectedFiles.length > 0 && newPublicId) {
        const results = await Promise.allSettled(
          selectedFiles.map((file) => uploadProjectFile(newPublicId, file))
        )
        for (const r of results) {
          if (r.status === 'fulfilled') uploadedCount++
          else failedCount++
        }
      }

      let detail = 'تم إنشاء المشروع بنجاح'
      if (uploadedCount > 0 && failedCount === 0) {
        detail = `تم إنشاء المشروع ورفع ${uploadedCount} ملف بنجاح`
      } else if (uploadedCount > 0 && failedCount > 0) {
        detail = `تم إنشاء المشروع، رفع ${uploadedCount} ملف وفشل ${failedCount}`
      } else if (failedCount > 0) {
        detail = `تم إنشاء المشروع، لكن فشل رفع ${failedCount} ملف`
      }

      toastRef.current?.show({
        severity: failedCount > 0 ? 'warn' : 'success',
        summary: 'تمت الإضافة',
        detail,
        life: 2500,
      })
      setDialogVisible(false)
      setSelectedFiles([])
      await loadProjects()
    } catch (error) {
      if (error.response?.status === 409 || error.response?.data?.statusCode === 409) {
        setProjectNameError(true)
        toastRef.current?.show({
          severity: 'error',
          summary: 'اسم المشروع موجود مسبقاً',
          life: 3000,
        })
        setSaving(false)
        return
      }
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل إنشاء المشروع. يرجى المحاولة مجدداً.',
        life: 3000,
      })
      setSaving(false)
    }
  }

  const handleDeleteProject = async () => {
    if (!projectToDelete) return

    setDeleting(true)
    try {
      await deleteProject(projectToDelete.publicId)
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id))
      toastRef.current?.show({
        severity: 'success',
        summary: 'تم الحذف',
        detail: 'تم حذف المشروع بنجاح',
        life: 2000,
      })
      setDeleteDialogVisible(false)
      setProjectToDelete(null)
    } catch (error) {
      console.error('Delete project error:', error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل حذف المشروع. يرجى المحاولة مجدداً.',
        life: 3000,
      })
    } finally {
      setDeleting(false)
    }
  }

  const dialogFooter = (
    <div>
      <Button
        label="إلغاء"
        icon="pi pi-times"
        disabled={saving}
        onClick={() => setDialogVisible(false)}
        style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#64748b' }}
      />
      <Button
        label={saving ? (selectedFiles.length > 0 ? 'جاري الحفظ والرفع...' : 'جارٍ الحفظ...') : 'حفظ'}
        icon={saving ? 'pi pi-spin pi-spinner' : 'pi pi-check'}
        disabled={saving || !isFormValid()}
        style={{
          background: isFormValid() && !saving ? '#2d3e50' : '#cbd5e1',
          border: 'none',
          color: isFormValid() && !saving ? '#cbd5e1' : '#94a3b8',
          cursor: isFormValid() && !saving ? 'pointer' : 'not-allowed',
          opacity: isFormValid() && !saving ? 1 : 0.6,
        }}
        onClick={saveProject}
      />
    </div>
  )

  const renderProjectCard = (project) => {
    const viewInfo = getProjectViewInfo(project)

    return (
      <div key={project.id} className={styles.projectCard}>
        <div className={styles.cardHeader}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h3 className={styles.projectName}>{project.name}</h3>
              {viewInfo.badge === 'managed' && (
                <Badge value="أديره" severity="success" style={{ fontSize: '11px' }} />
              )}
              {viewInfo.badge === 'participating' && (
                <Badge value="لدي مهام" severity="info" style={{ fontSize: '11px' }} />
              )}
            </div>
          </div>
          <Tag value={getStatusLabel(project.status)} severity={getStatusSeverity(project.status)} />
        </div>

        <div className={styles.cardInfo}>
          <div className={styles.infoLine}>
            <i className="pi pi-user" />
            <span>العميل: {project.client}</span>
          </div>
          <div className={styles.infoLine}>
            <i className="pi pi-user-edit" />
            <span>المدير: {getManagerDisplay(project)}</span>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <span>التقدم</span>
            <span>{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} style={{ height: '8px' }} showValue={false} />
        </div>

        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <i className="pi pi-calendar" />
            <span>{project.startDate} إلى {project.dueDate}</span>
          </div>
          <div className={styles.infoItem}>
            <span>
              {new Intl.NumberFormat('ar-SA', { notation: 'compact' }).format(project.budget)} ريال
            </span>
          </div>
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.footerActions}>
            <Button
              label="عرض التفاصيل"
              icon="pi pi-arrow-left"
              iconPos="right"
              size="small"
              style={{ background: '#2d3e50', border: 'none', color: '#cbd5e1' }}
              onClick={() => navigate(`/office/projects/${project.publicId}`)}
            />
            {isOfficeOwner && (
              <Button
                icon="pi pi-trash"
                size="small"
                severity="danger"
                outlined
                tooltip="حذف المشروع"
                tooltipOptions={{ position: 'top' }}
                onClick={(e) => {
                  e.stopPropagation()
                  setProjectToDelete(project)
                  setDeleteDialogVisible(true)
                }}
              />
            )}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div className={styles.tasksCount}>
              {project.completedTasks} / {project.tasksCount}
            </div>
            <div className={styles.tasksLabel}>مهمة مكتملة</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <Toast ref={toastRef} baseZIndex={9999} />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerRight}>
            <h1 className={styles.title}>المشاريع</h1>
            <p className={styles.subtitle}>
              <i className="pi pi-calendar" />
              <span>
                {new Date().toLocaleDateString('ar-SA', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>
          <div className={styles.headerLeft}>
            <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="بحث..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: '220px' }}
              />
            </span>
            {isOfficeOwner && (
              <Button
                label="مشروع جديد"
                icon="pi pi-plus"
                style={{ background: '#2d3e50', border: 'none', color: '#cbd5e1' }}
                onClick={openNewProjectDialog}
              />
            )}
          </div>
        </div>

        <div className={styles.filterTabs}>
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`${styles.filterTab} ${activeFilter === tab.key ? styles.filterTabActive : ''}`}
              onClick={() => setActiveFilter(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <ProgressSpinner style={{ width: '48px', height: '48px' }} strokeWidth="4" />
          </div>
        ) : fetchError ? (
          <div className={styles.emptyState}>
            <i className="pi pi-exclamation-circle" style={{ color: '#ef4444', fontSize: '2rem' }} />
            <p style={{ color: '#ef4444' }}>{fetchError}</p>
            <Button
              label="إعادة المحاولة"
              icon="pi pi-refresh"
              size="small"
              style={{ background: '#2d3e50', border: 'none', color: '#cbd5e1', marginTop: '8px' }}
              onClick={loadProjects}
            />
          </div>
        ) : (
          <>
            <div className={styles.projectsGrid}>
              {filteredProjects.map((project) => renderProjectCard(project))}
            </div>

            {filteredProjects.length === 0 && (
              <div className={styles.emptyState}>
                <i className="pi pi-inbox" />
                <p>
                  {searchValue || activeFilter !== 'all'
                    ? 'لا توجد مشاريع تطابق البحث'
                    : 'لا توجد مشاريع في مكتبك بعد'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Create Project Dialog */}
        <Dialog
          visible={dialogVisible}
          style={{ width: '550px' }}
          header="إنشاء مشروع جديد"
          modal
          footer={dialogFooter}
          onHide={() => !saving && setDialogVisible(false)}
        >
          <div className={styles.formGrid}>
            <div>
              <label htmlFor="projectName" className={styles.label}>
                اسم المشروع *
              </label>
              <InputText
                id="projectName"
                value={newProject.name}
                onChange={(e) => {
                  setNewProject({ ...newProject, name: e.target.value })
                  if (projectNameError) setProjectNameError(false)
                }}
                style={{
                  width: '100%',
                  borderColor: projectNameError ? '#ef4444' : undefined,
                }}
              />
              {projectNameError && (
                <small style={{ color: '#ef4444', display: 'block', marginTop: '4px' }}>
                  اسم المشروع مستخدم مسبقاً
                </small>
              )}
            </div>

            <div>
              <label htmlFor="projectDescription" className={styles.label}>
                وصف المشروع
              </label>
              <InputTextarea
                id="projectDescription"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div>
              <label htmlFor="clientName" className={styles.label}>
                اسم العميل *
              </label>
              <InputText
                id="clientName"
                value={newProject.clientName}
                onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                placeholder="أدخل اسم العميل"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label htmlFor="budget" className={styles.label}>
                الميزانية (ريال سعودي) *
              </label>
              <input
                id="budget"
                type="number"
                min="0"
                step="1"
                value={newProject.budget || ''}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    budget: e.target.value ? parseInt(e.target.value, 10) : null,
                  })
                }
                placeholder="أدخل قيمة رقمية"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div>
              <label htmlFor="startDate" className={styles.label}>
                تاريخ البدء *
              </label>
              <Calendar
                id="startDate"
                value={newProject.startDate}
                onChange={(e) => {
                  const updated = { ...newProject, startDate: e.value }
                  setNewProject(updated)
                  const errors = validateForm(updated)
                  setFormErrors(errors)
                }}
                dateFormat="yy-mm-dd"
                showIcon
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label htmlFor="endDate" className={styles.label}>
                تاريخ الانتهاء *
              </label>
              <Calendar
                id="endDate"
                value={newProject.endDate}
                onChange={(e) => {
                  const updated = { ...newProject, endDate: e.value }
                  setNewProject(updated)
                  const errors = validateForm(updated)
                  setFormErrors(errors)
                }}
                dateFormat="yy-mm-dd"
                showIcon
                style={{ width: '100%' }}
              />
              {formErrors.dateRange && (
                <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <i className="pi pi-exclamation-circle" style={{ fontSize: '12px' }} />
                  {formErrors.dateRange}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="manager" className={styles.label}>
                مدير المشروع *
              </label>
              <Dropdown
                id="manager"
                value={newProject.projectManagerUserId}
                options={[
                  {
                    label: `${currentUser?.fullName || currentUser?.username}${
                      currentUser?.role === 'office_owner' ? ' (مالك المكتب)' : ' (موظف)'
                    }`,
                    value: currentUser?.sub || currentUser?.id || '',
                  },
                ]}
                onChange={(e) => setNewProject({ ...newProject, projectManagerUserId: e.value })}
                placeholder="مدير المشروع"
                disabled
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label className={styles.label}>
                ملفات المشروع (اختياري)
              </label>
              <FileUpload
                ref={fileUploadRef}
                mode="basic"
                multiple
                customUpload
                auto
                uploadHandler={handleFilesSelected}
                chooseLabel="اختر ملفات"
                disabled={saving}
                style={{ width: '100%' }}
              />
              <small style={{ display: 'block', color: '#64748b', marginTop: '6px', fontSize: '12px' }}>
                يمكنك اختيار عدة ملفات لرفعها مع المشروع
              </small>

              {selectedFiles.length > 0 && (
                <div className={styles.uploadedFilesList}>
                  {selectedFiles.map((file, index) => (
                    <div key={`${file.name}-${index}`} className={styles.uploadedFileItem}>
                      <div className={styles.uploadedFileInfo}>
                        <i className="pi pi-file" />
                        <span className={styles.uploadedFileName}>{file.name}</span>
                        <span className={styles.uploadedFileSize}>{formatBytes(file.size)}</span>
                      </div>
                      <Button
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-text p-button-danger p-button-sm"
                        tooltip="إزالة الملف"
                        tooltipOptions={{ position: 'top' }}
                        disabled={saving}
                        onClick={() => removeSelectedFile(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Dialog>

        {/* Delete Project Confirmation Dialog */}
        <ConfirmDialog
          visible={deleteDialogVisible}
          onHide={() => !deleting && setDeleteDialogVisible(false)}
          message="هل أنت متأكد من حذف هذا المشروع؟"
          header="تأكيد الحذف"
          icon="pi pi-exclamation-triangle"
          accept={() => handleDeleteProject()}
          reject={() => setDeleteDialogVisible(false)}
          acceptLabel="حذف"
          rejectLabel="إلغاء"
          acceptButtonProps={{
            disabled: deleting,
            icon: deleting ? 'pi pi-spin pi-spinner' : 'pi pi-trash',
          }}
          rejectButtonProps={{
            disabled: deleting,
          }}
        />
      </div>
    </DashboardLayout>
  )
}

export default ProjectsPage

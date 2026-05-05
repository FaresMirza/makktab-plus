import { useRef, useState, useMemo, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../layouts/DashboardLayout'
import ProofOfWorkDialog from '../../components/office/ProofOfWorkDialog'
import ViewProofDialog from '../../components/office/ViewProofDialog'
import * as API from '../../services/api'
import styles from './MyTasksPage.module.css'

const PRIORITY_OPTIONS = [
  { label: 'منخفضة', value: 'Low' },
  { label: 'متوسطة', value: 'Medium' },
  { label: 'عالية', value: 'High' },
]

function MyTasksPage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const toastRef = useRef(null)
  
  // Data state
  const [allMyTasks, setAllMyTasks] = useState([])
  const [_loading, setLoading] = useState(true)
  
  // Dialog state
  const [proofDialogVisible, setProofDialogVisible] = useState(false)
  const [proofTaskContext, setProofTaskContext] = useState(null)
  const [viewProofDialogVisible, setViewProofDialogVisible] = useState(false)
  const [selectedProofTask, setSelectedProofTask] = useState(null)
  
  // Filter state
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedPriority, setSelectedPriority] = useState(null)
  const [dateRange, setDateRange] = useState(null)
  
  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const tasksData = await API.getTasksByUser(currentUser?.id)
        const tasksWithUniqueId = tasksData.map((task) => ({
          ...task,
          uniqueId: `${task.projectId}-${task.id}`,
        }))
        setAllMyTasks(tasksWithUniqueId)
      } catch (error) {
        console.error('Error fetching tasks:', error)
        toastRef.current?.show({
          severity: 'error',
          summary: 'خطأ',
          detail: 'فشل في تحميل المهام',
          life: 3000,
        })
      } finally {
        setLoading(false)
      }
    }
    
    if (currentUser?.id) {
      fetchTasks()
    }
  }, [currentUser?.id])
  
  // Filter options
  const projectOptions = useMemo(() => {
    const uniqueProjects = Array.from(new Set(allMyTasks.map((t) => t.projectName)))
    return [
      { label: 'جميع المشاريع', value: null },
      ...uniqueProjects.map((p) => ({ label: p, value: p })),
    ]
  }, [allMyTasks])
  
  const priorityFilterOptions = [
    { label: 'جميع الأولويات', value: null },
    ...PRIORITY_OPTIONS,
  ]
  
  // Apply filters
  const tasks = useMemo(() => {
    let filtered = allMyTasks
    
    if (selectedProject && typeof selectedProject === 'string') {
      filtered = filtered.filter((t) => t.projectName === selectedProject)
    }
    
    if (selectedPriority && typeof selectedPriority === 'string') {
      filtered = filtered.filter((t) => t.priority === selectedPriority)
    }
    
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].toISOString().split('T')[0]
      const endDate = dateRange[1].toISOString().split('T')[0]
      filtered = filtered.filter((t) => t.dueDate >= startDate && t.dueDate <= endDate)
    }
    
    return filtered
  }, [allMyTasks, selectedProject, selectedPriority, dateRange])
  
  const clearFilters = () => {
    setSelectedProject(null)
    setSelectedPriority(null)
    setDateRange(null)
  }

  // Proof dialog handlers
  const openProofDialog = (task) => {
    setProofTaskContext({ taskId: task.id, projectId: task.projectId })
    setProofDialogVisible(true)
  }

  const hideProofDialog = () => {
    setProofDialogVisible(false)
    setProofTaskContext(null)
  }

  const handleProofSubmit = async (completionNotes, attachments) => {
    if (!proofTaskContext) return

    try {
      await API.completeTask(
        proofTaskContext.projectId,
        proofTaskContext.taskId,
        completionNotes,
        attachments
      )

      setAllMyTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === proofTaskContext.taskId && task.projectId === proofTaskContext.projectId
            ? { ...task, status: 'Completed', completionNotes, attachments: [...attachments] }
            : task
        )
      )

      toastRef.current?.show({
        severity: 'success',
        summary: 'تم بنجاح',
        detail: 'تم تسليم المهمة وإرسال إثبات العمل',
        life: 3000,
      })

      hideProofDialog()
    } catch (error) {
      console.error('Error completing task:', error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل في تسليم المهمة',
        life: 3000,
      })
    }
  }

  // Column templates
  const statusBodyTemplate = (rowData) => {
    const statusMap = {
      'In Progress': { severity: 'warning', label: 'قيد التنفيذ' },
      Completed: { severity: 'success', label: 'مكتملة' },
    }
    const status = statusMap[rowData.status] || { severity: 'warning', label: rowData.status }
    return <Tag value={status.label} severity={status.severity} />
  }

  const priorityBodyTemplate = (rowData) => {
    const priorityMap = {
      Low: { severity: 'success', label: 'منخفضة' },
      Medium: { severity: 'warning', label: 'متوسطة' },
      High: { severity: 'danger', label: 'عالية' },
    }
    const priority = priorityMap[rowData.priority] || { severity: 'info', label: rowData.priority }
    return <Tag value={priority.label} severity={priority.severity} />
  }

  const actionsBodyTemplate = (rowData) => {
    const isCompleted = rowData.status === 'Completed'
    
    return (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {!isCompleted && (
          <Button
            icon="pi pi-check"
            rounded
            text
            severity="success"
            tooltip="إنهاء المهمة"
            tooltipOptions={{ position: 'top' }}
            onClick={() => openProofDialog(rowData)}
          />
        )}
        {isCompleted && rowData.completionNotes && (
          <Button
            icon="pi pi-eye"
            rounded
            text
            severity="info"
            tooltip="عرض إثبات العمل"
            tooltipOptions={{ position: 'top' }}
            onClick={() => {
              setSelectedProofTask(rowData)
              setViewProofDialogVisible(true)
            }}
          />
        )}
        <Button
          icon="pi pi-arrow-left"
          rounded
          text
          severity="info"
          tooltip="الانتقال للمشروع"
          tooltipOptions={{ position: 'top' }}
          onClick={() => navigate(`/office/projects/${rowData.projectId}`)}
        />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <Toast ref={toastRef} />

      <div className={styles.container}>
        <h1 className={styles.title}>مهامي</h1>

        {/* Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard} style={{ borderTop: '4px solid #f39c12' }}>
            <div className={styles.summaryValue}>
              {tasks.filter((t) => t.status === 'In Progress').length}
            </div>
            <div className={styles.summaryLabel}>قيد التنفيذ</div>
          </div>
          <div className={styles.summaryCard} style={{ borderTop: '4px solid #27ae60' }}>
            <div className={styles.summaryValue}>
              {tasks.filter((t) => t.status === 'Completed').length}
            </div>
            <div className={styles.summaryLabel}>مكتملة</div>
          </div>
          <div className={styles.summaryCard} style={{ borderTop: '4px solid #e74c3c' }}>
            <div className={styles.summaryValue}>
              {tasks.filter((t) => t.priority === 'High' && t.status !== 'Completed').length}
            </div>
            <div className={styles.summaryLabel}>عالية الأولوية</div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className={styles.card}>
          {/* Filters Section */}
          <div className={styles.filtersContainer}>
            <div className={styles.filterRow}>
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>المشروع</label>
                <Dropdown
                  value={selectedProject}
                  options={projectOptions}
                  onChange={(e) => {
                    const val = e.value
                    setSelectedProject(val === null || val === undefined ? null : val)
                  }}
                  placeholder="اختر المشروع"
                  style={{ minWidth: '200px' }}
                />
              </div>
              
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>الأولوية</label>
                <Dropdown
                  value={selectedPriority}
                  options={priorityFilterOptions}
                  onChange={(e) => {
                    const val = e.value
                    setSelectedPriority(val === null || val === undefined ? null : val)
                  }}
                  placeholder="اختر الأولوية"
                  style={{ minWidth: '180px' }}
                />
              </div>
              
              <div className={styles.filterItem}>
                <label className={styles.filterLabel}>فترة التسليم</label>
                <Calendar
                  value={dateRange}
                  onChange={(e) => setDateRange(e.value)}
                  selectionMode="range"
                  dateFormat="yy-mm-dd"
                  placeholder="من - إلى"
                  showIcon
                  style={{ minWidth: '250px' }}
                />
              </div>
              
              <div className={styles.filterActions}>
                <Button
                  label="إعادة تعيين"
                  icon="pi pi-filter-slash"
                  className="p-button-outlined"
                  onClick={clearFilters}
                />
              </div>
            </div>
            
            <div className={styles.searchContainer}>
              <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="بحث في المهام..."
                  style={{ width: '100%', maxWidth: '400px' }}
                />
              </span>
            </div>
          </div>

          <DataTable
            value={tasks}
            paginator
            rows={10}
            dataKey="uniqueId"
            globalFilter={globalFilter}
            emptyMessage="لا توجد مهام مُسندة إليك"
            className="my-tasks-table"
          >
            <Column 
              field="name" 
              header="عنوان المهمة" 
              style={{ minWidth: '200px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              field="projectName" 
              header="المشروع" 
              style={{ minWidth: '180px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              field="status" 
              header="الحالة" 
              body={statusBodyTemplate} 
              style={{ minWidth: '140px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              field="priority" 
              header="الأولوية" 
              body={priorityBodyTemplate} 
              style={{ minWidth: '120px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              field="dueDate" 
              header="تاريخ الاستحقاق" 
              style={{ minWidth: '150px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              header="الإجراءات" 
              body={actionsBodyTemplate} 
              style={{ minWidth: '150px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
          </DataTable>
        </div>

        <ProofOfWorkDialog
          visible={proofDialogVisible}
          onHide={hideProofDialog}
          onSubmit={handleProofSubmit}
          toastRef={toastRef}
        />

        <ViewProofDialog
          visible={viewProofDialogVisible}
          task={selectedProofTask}
          onHide={() => {
            setViewProofDialogVisible(false)
            setSelectedProofTask(null)
          }}
        />
      </div>
    </DashboardLayout>
  )
}

export default MyTasksPage

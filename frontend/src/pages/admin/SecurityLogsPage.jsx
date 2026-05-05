import { useState, useMemo, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import AdminLayout from '../../layouts/AdminLayout'
import ActionLabel from '../../components/admin/ActionLabel'
import LogsFilterBar from '../../components/admin/LogsFilterBar'
import { ACTION_COLORS } from '../../constants/adminConstants'
import { getAdminAuditLogs } from '../../services/api'
import { formatArabicDate } from '../../utils/dateUtils'
import styles from './SecurityLogsPage.module.css'

const ACTION_TRANSLATIONS = {
  'OFFICE_REQUEST_APPROVED': 'قبول طلب مكتب',
  'OFFICE_REQUEST_REJECTED': 'رفض طلب مكتب',
  'OFFICE_ACTIVATED': 'تفعيل مكتب',
  'OFFICE_DEACTIVATED': 'إيقاف مكتب',
}

const LOG_ACTION_OPTIONS = [
  { label: 'قبول طلب مكتب', value: 'OFFICE_REQUEST_APPROVED' },
  { label: 'رفض طلب مكتب', value: 'OFFICE_REQUEST_REJECTED' },
  { label: 'تفعيل مكتب', value: 'OFFICE_ACTIVATED' },
  { label: 'إيقاف مكتب', value: 'OFFICE_DEACTIVATED' },
]

const SORT_OPTIONS = [
  { label: 'الأحدث أولاً', value: 'desc' },
  { label: 'الأقدم أولاً', value: 'asc' },
]

/**
 * Security Logs Page
 * Displays all login/logout and administrative action logs with filtering
 */
function SecurityLogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [globalFilter, setGlobalFilter] = useState('')
  const [dateFilter, setDateFilter] = useState(null)
  const [actionFilter, setActionFilter] = useState(null)
  const [sortOrder, setSortOrder] = useState('desc')

  const handleClearFilters = () => {
    setGlobalFilter('')
    setDateFilter(null)
    setActionFilter(null)
    setSortOrder('desc')
  }

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true)
        const res = await getAdminAuditLogs()
        setLogs(Array.isArray(res) ? res : (res?.data || []))
      } catch (error) {
        console.error("Error fetching audit logs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [])

  const filteredLogs = useMemo(() => {
    let result = [...logs]

    if (actionFilter) {
      result = result.filter(log => log.action === actionFilter)
    }

    if (dateFilter && dateFilter[0]) {
      const start = new Date(dateFilter[0]).setHours(0, 0, 0, 0)
      const end = dateFilter[1] 
        ? new Date(dateFilter[1]).setHours(23, 59, 59, 999) 
        : new Date(dateFilter[0]).setHours(23, 59, 59, 999)

      result = result.filter(log => {
        const logTime = new Date(log.createdAt || log.timestamp).getTime()
        return logTime >= start && logTime <= end
      })
    }

    result.sort((a, b) => {
      const timeA = new Date(a.createdAt || a.timestamp).getTime()
      const timeB = new Date(b.createdAt || b.timestamp).getTime()
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB
    })

    return result
  }, [logs, actionFilter, dateFilter, sortOrder])

  // Template functions
  const actionBodyTemplate = (rowData) => {
    const translated = ACTION_TRANSLATIONS[rowData.action] || rowData.action
    const color = ACTION_COLORS?.[rowData.action] || '#666'
    return <span style={{ color, fontWeight: 'bold' }}>{translated}</span>
  }

  const usernameBodyTemplate = (rowData) => rowData.admin?.username || 'غير متوفر'
  
  const ipBodyTemplate = (rowData) => rowData.ip || rowData.ipAddress || 'غير متوفر'

  const dateBodyTemplate = (rowData) => {
    const d = rowData.createdAt || rowData.timestamp
    if (!d) return 'غير متوفر'
    return formatArabicDate(d)
  }

  const officeBodyTemplate = (rowData) => {
    if (rowData.targetOffice?.name) {
      return rowData.targetOffice.name
    }
    if (rowData.action === 'OFFICE_REQUEST_REJECTED') {
      return 'طلب مكتب (مرفوض)'
    }
    return 'غير متوفر'
  }

  return (
    <AdminLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>سجلات الأمان</h1>
          </div>
          <Tag
            value={`${filteredLogs.length} سجل`}
            severity="info"
            style={{ fontSize: '16px', padding: '8px 16px' }}
          />
        </div>

        <div className={styles.card}>
          <LogsFilterBar
            globalFilter={globalFilter}
            onGlobalChange={setGlobalFilter}
            dateFilter={dateFilter}
            onDateChange={setDateFilter}
            actionFilter={actionFilter}
            onActionChange={setActionFilter}
            actionOptions={LOG_ACTION_OPTIONS}
            sortOrder={sortOrder}
            onSortChange={setSortOrder}
            sortOptions={SORT_OPTIONS}
            onClearFilters={handleClearFilters}
          />

          <DataTable
            value={filteredLogs}
            paginator
            loading={loading}
            rows={7}
            dataKey="id"
            emptyMessage="لا توجد سجلات"
            currentPageReportTemplate="صفحة {currentPage} من {totalPages}"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            style={{ direction: 'rtl' }}
            globalFilter={globalFilter}
            globalFilterFields={['ip', 'admin.username', 'targetOffice.name', 'action']}
          >
            <Column field="createdAt" header="التاريخ والوقت" body={dateBodyTemplate} style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="admin.username" header="اسم المستخدم" body={usernameBodyTemplate} style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="action" header="الإجراء" body={actionBodyTemplate} style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="targetOffice.name" header="المكتب" body={officeBodyTemplate} style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="ip" header="IP Address" body={ipBodyTemplate} style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
          </DataTable>
        </div>
      </div>
    </AdminLayout>
  )
}

export default SecurityLogsPage

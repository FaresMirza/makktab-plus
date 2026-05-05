import { useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import RTLColumn from '../../components/common/RTLColumn'
import AdminLayout from '../../layouts/AdminLayout'
import KpiCard from '../../components/admin/KpiCard'
import StatusBadge from '../../components/admin/StatusBadge'
import ActionLabel from '../../components/admin/ActionLabel'
import { KPI_COLORS, LOG_STATUS_MAP, ACTION_COLORS } from '../../constants/adminConstants'
import { getAdminStats } from '../../services/api'
import { formatArabicDateTime } from '../../utils/dateUtils'
import styles from './AdminDashboardPage.module.css'

/**
 * Admin Dashboard Page
 * Main dashboard for Super Admin with KPIs and recent activity logs
 */
function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalOffices: 0,
    activeSubscriptions: 0,
    pendingApprovals: 0,
    totalAdmins: 0,
    totalUsers: 0
  })
  const [recentLogs, setRecentLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        // Fetch stats which now includes counts and recentLogs
        const statsRes = await getAdminStats().catch(() => ({}))

        // Extract stats from the API response
        const dashboardStats = {
          totalOffices: statsRes.totalOfficesCount || 0,
          activeSubscriptions: statsRes.activeOfficesCount || 0,
          totalAdmins: statsRes.totalAdminsCount || 0,
          totalUsers: statsRes.totalUsersCount || 0,
          pendingApprovals: statsRes.pendingApprovalsCount || 0
        }

        // Extract recent logs from stats response
        const logs = Array.isArray(statsRes.recentLogs) ? statsRes.recentLogs : []

        setStats(dashboardStats)
        setRecentLogs(logs)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Template function for admin email column
  const adminEmailBodyTemplate = (rowData) => {
    return rowData.admin?.email || 'N/A'
  }

  // Template function for office name column
  const officeBodyTemplate = (rowData) => {
    return rowData.office?.name || 'N/A'
  }

  // Template function for date/time column
  const dateTimeBodyTemplate = (rowData) => {
    return formatArabicDateTime(rowData.createdAt)
  }

  // Template function for status column
  const logStatusBodyTemplate = (rowData) => (
    <StatusBadge status={rowData.status} statusMap={LOG_STATUS_MAP} />
  )

  // Template function for action column
  const actionBodyTemplate = (rowData) => (
    <ActionLabel action={rowData.action} colorMap={ACTION_COLORS} />
  )

  return (
    <AdminLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>لوحة التحكم - Super Admin</h1>

        {/* KPI Cards */}
        <div className={styles.kpiGrid}>
          <KpiCard
            icon="pi-building"
            value={stats.totalOffices}
            label="إجمالي المكاتب"
            color={KPI_COLORS.PRIMARY}
            loading={loading}
          />

          <KpiCard
            icon="pi-check-circle"
            value={stats.activeSubscriptions}
            label="اشتراكات نشطة"
            color={KPI_COLORS.SUCCESS}
            loading={loading}
          />

          <KpiCard
            icon="pi-clock"
            value={stats.pendingApprovals}
            label="قيد المراجعة"
            color={KPI_COLORS.WARNING}
            loading={loading}
          />
        </div>

        {/* Recent Logs Table */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>آخر السجلات</h3>
          <DataTable 
            value={recentLogs} 
            dataKey="id" 
            loading={loading}
            emptyMessage="لا توجد سجلات"
            style={{ direction: 'rtl' }}
          >
            <RTLColumn 
              field="createdAt" 
              header="التاريخ والوقت"
              body={dateTimeBodyTemplate}
            />
            <RTLColumn 
              field="admin.email" 
              header="البريد الإلكتروني"
              body={adminEmailBodyTemplate}
            />
            <RTLColumn 
              field="action" 
              header="الإجراء" 
              body={actionBodyTemplate}
            />
            <RTLColumn 
              field="office.name" 
              header="المكتب"
              body={officeBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboardPage

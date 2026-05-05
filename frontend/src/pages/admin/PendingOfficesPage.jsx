import { useRef, useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import AdminLayout from '../../layouts/AdminLayout'
import OfficeActionsColumn from '../../components/admin/OfficeActionsColumn'
import OfficeDetailsDialog from '../../components/admin/OfficeDetailsDialog'
import SearchToolbar from '../../components/common/SearchToolbar'
import { formatArabicDate } from '../../utils/dateUtils'
import { getAdminOfficeRequests, approveOfficeRequest, rejectOfficeRequest } from '../../services/api'
import styles from './PendingOfficesPage.module.css'

/**
 * Pending Offices Page
 * Displays pending office registrations requiring admin approval
 */
function PendingOfficesPage() {
  const [offices, setOffices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOffice, setSelectedOffice] = useState(null)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const toastRef = useRef(null)

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const res = await getAdminOfficeRequests()
      setOffices(Array.isArray(res) ? res : (res?.data || []))
    } catch (error) {
      console.error("Error fetching office requests:", error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل في جلب طلبات المكاتب المعلقة',
        life: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleApprove = (office) => {
    confirmDialog({
      message: `هل أنت متأكد من الموافقة على هذا المكتب وتفعيله؟`,
      header: 'تأكيد الموافقة',
      icon: 'pi pi-check-circle',
      acceptLabel: 'نعم، وافق',
      rejectLabel: 'إلغاء',
      acceptClassName: 'p-button-success',
      accept: async () => {
        try {
          await approveOfficeRequest(office.id)
          toastRef.current?.show({
            severity: 'success',
            summary: 'تمت الموافقة',
            detail: `تم قبول طلب "${office.officeName}" بنجاح`,
            life: 4000,
          })
          fetchRequests()
        } catch (error) {
           toastRef.current?.show({
            severity: 'error',
            summary: 'حدث خطأ',
            detail: error?.response?.data?.message || 'تعذر الموافقة على المكتب',
            life: 3000,
          })         
        }
      },
    })
  }

  const handleReject = (office) => {
    confirmDialog({
      message: `هل أنت متأكد من رفض هذا الطلب؟ سيتم إغلاقه/حذفه.`,
      header: 'تأكيد الرفض',
      icon: 'pi pi-times-circle',
      acceptLabel: 'نعم، ارفض',
      rejectLabel: 'إلغاء',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await rejectOfficeRequest(office.id)
          toastRef.current?.show({
            severity: 'warn',
            summary: 'تم الرفض',
            detail: `تم رفض طلب "${office.officeName}"`,
            life: 3000,
          })
          fetchRequests()
        } catch (error) {
          toastRef.current?.show({
            severity: 'error',
            summary: 'حدث خطأ',
            detail: error?.response?.data?.message || 'تعذر رفض المكتب',
            life: 3000,
          })
        }
      },
    })
  }

  const handleViewDetails = (office) => {
    setSelectedOffice(office)
    setDetailsVisible(true)
  }

  // Template function for actions column
  const actionBodyTemplate = (rowData) => (
    <OfficeActionsColumn
      office={rowData}
      onView={handleViewDetails}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  )

  // Template function for date column
  const dateBodyTemplate = (rowData) => {
    if (!rowData.createdAt) return 'غير متوفر'
    return formatArabicDate(rowData.createdAt)
  }

  // Template function for city column
  const cityBodyTemplate = () => 'غير محدد'

  // Header template for actions column (centered)
  const actionsHeaderTemplate = () => (
    <div style={{ textAlign: 'center', width: '100%' }}>الإجراءات</div>
  )

  // Toolbar search component
  const rightToolbarTemplate = () => (
    <SearchToolbar
      value={globalFilter}
      onChange={setGlobalFilter}
      placeholder="بحث في الطلبات..."
    />
  )

  return (
    <AdminLayout>
      <Toast ref={toastRef} />
      <ConfirmDialog />

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>طلبات المكاتب المعلقة</h1>
            <p className={styles.subtitle}>المكاتب التي سجلت وتنتظر الموافقة</p>
          </div>
          <Tag
            value={`${offices.length} طلب معلق`}
            severity="warning"
            style={{ fontSize: '16px', padding: '8px 16px' }}
          />
        </div>

        <div className={styles.tableCard}>
          <Toolbar right={rightToolbarTemplate} style={{ marginBottom: '20px', border: 'none', background: 'transparent', padding: 0 }} />
          
          <DataTable
            value={offices}
            loading={loading}
            paginator
            rows={7}
            dataKey="id"
            globalFilter={globalFilter}
            emptyMessage="لا توجد طلبات معلقة"
            currentPageReportTemplate="صفحة {currentPage} من {totalPages}"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            style={{ direction: 'rtl' }}
          >
          <Column 
            field="officeName" 
            header="اسم المكتب" 
            sortable 
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column 
            field="fullName" 
            header="اسم المالك" 
            sortable 
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column 
            field="username" 
            header="اسم المستخدم" 
            sortable 
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column 
            field="email" 
            header="البريد الإلكتروني" 
            sortable 
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column 
            field="phone" 
            header="الجوال" 
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column 
            field="city" 
            header="المدينة"
            body={cityBodyTemplate}
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column
            field="createdAt"
            header="تاريخ التسجيل"
            body={dateBodyTemplate}
            sortable
            style={{ textAlign: 'right' }}
            headerStyle={{ textAlign: 'right' }}
            bodyStyle={{ textAlign: 'right' }}
          />
          <Column
            header={actionsHeaderTemplate}
            body={actionBodyTemplate}
            exportable={false}
            style={{ textAlign: 'center' }}
            headerStyle={{ justifyContent: 'center' }}
            bodyStyle={{ textAlign: 'center' }}
          />
        </DataTable>
        </div>

        {/* Office Details Dialog */}
        <OfficeDetailsDialog
          visible={detailsVisible}
          office={selectedOffice}
          onHide={() => setDetailsVisible(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>
    </AdminLayout>
  )
}

export default PendingOfficesPage

import { useRef, useState, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import AdminLayout from '../../layouts/AdminLayout'
import OfficeEditDialog from '../../components/admin/OfficeEditDialog'
import SearchToolbar from '../../components/common/SearchToolbar'
import { formatArabicDate } from '../../utils/dateUtils'
import { getAdminOffices, activateAdminOffice, deactivateAdminOffice } from '../../services/api'
import styles from './OfficesManagementPage.module.css'

/**
 * Offices Management Page
 * Allows admin to view, edit, suspend, and reactivate registered offices
 */
function OfficesManagementPage() {
  const [offices, setOffices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingOffice, setEditingOffice] = useState(null)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const toastRef = useRef(null)

  const fetchOffices = async () => {
    try {
      setLoading(true)
      const res = await getAdminOffices()
      setOffices(Array.isArray(res) ? res : (res?.data || []))
    } catch (error) {
      console.error("Error fetching offices:", error)
      toastRef.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'فشل في جلب بيانات المكاتب',
        life: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOffices()
  }, [])

  const handleEdit = (office) => {
    setEditingOffice({
      ...office,
      ownerName: office.owner?.fullName || '',
      ownerUsername: office.owner?.username || '',
      ownerEmail: office.owner?.email || '',
    })
    setDialogVisible(true)
  }

  const handleFieldChange = (field, value) => {
    setEditingOffice((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (!editingOffice.name || !editingOffice.ownerName || !editingOffice.ownerEmail) {
      toastRef.current?.show({
        severity: 'warn',
        summary: 'بيانات ناقصة',
        detail: 'أكمل جميع الحقول المطلوبة (الاسم، المالك، البريد)',
        life: 2500,
      })
      return
    }
    setOffices((prev) => prev.map((o) => (o.id === editingOffice.id ? editingOffice : o)))
    toastRef.current?.show({ 
      severity: 'success', 
      summary: 'تم التحديث', 
      detail: 'تم تعديل المكتب بنجاح', 
      life: 2000 
    })
    setDialogVisible(false)
  }

  const handleStatusChange = (office, newStatus) => {
    setOffices((prev) => prev.map((o) => (o.id === office.id ? { ...o, status: newStatus } : o)))
    const isSuspend = newStatus === 'Suspended'
    toastRef.current?.show({
      severity: isSuspend ? 'warn' : 'success',
      summary: isSuspend ? 'تم الإيقاف' : 'تم التفعيل',
      detail: `${isSuspend ? 'تم إيقاف' : 'تم تفعيل'}: ${office.name}`,
      life: 2000,
    })
  }

  // Template functions
  const statusBodyTemplate = (rowData) => {
    const isActive = rowData.status && rowData.status.toUpperCase() === 'ACTIVE'
    return (
      <Tag
        value={isActive ? 'نشط' : 'موقوف'}
        severity={isActive ? 'success' : 'danger'}
        style={{ fontSize: '13px', padding: '4px 8px', borderRadius: '6px' }}
      />
    )
  }

  const dateBodyTemplate = (rowData) => {
    if (!rowData.createdAt) return 'غير متوفر'
    return formatArabicDate(rowData.createdAt)
  }

  const usersCountBodyTemplate = (rowData) => {
    return rowData._count?.users || 0
  }

  const handleDeactivate = (office) => {
    confirmDialog({
      message: `هل أنت متأكد من رغبتك في تعطيل هذا المكتب؟ (${office.name})`,
      header: 'تأكيد التعطيل',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'نعم، قم بالتعطيل',
      rejectLabel: 'إلغاء',
      accept: async () => {
        try {
          setLoading(true)
          await deactivateAdminOffice(office.publicId)
          toastRef.current?.show({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم تعطيل المكتب بنجاح',
            life: 3000,
          })
          await fetchOffices() // Refresh table
        } catch (error) {
          toastRef.current?.show({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || 'حدث خطأ أثناء تعطيل المكتب',
            life: 3000,
          })
          setLoading(false)
        }
      },
    })
  }

  const handleActivate = (office) => {
    confirmDialog({
      message: `هل أنت متأكد من رغبتك في تفعيل هذا المكتب؟ (${office.name})`,
      header: 'تأكيد التفعيل',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-success',
      acceptLabel: 'نعم، قم بالتفعيل',
      rejectLabel: 'إلغاء',
      accept: async () => {
        try {
          setLoading(true)
          await activateAdminOffice(office.publicId)
          toastRef.current?.show({
            severity: 'success',
            summary: 'نجاح',
            detail: 'تم تفعيل المكتب بنجاح',
            life: 3000,
          })
          await fetchOffices() // Refresh table
        } catch (error) {
          toastRef.current?.show({
            severity: 'error',
            summary: 'خطأ',
            detail: error.response?.data?.message || 'حدث خطأ أثناء تفعيل المكتب',
            life: 3000,
          })
          setLoading(false)
        }
      },
    })
  }

  // To support showing the custom buttons without using OfficeManagementActions
  const actionsBodyTemplate = (rowData) => {
    const isActive = rowData.status && rowData.status.toUpperCase() === 'ACTIVE'
    
    return (
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button 
          className="p-button p-component p-button-icon-only p-button-rounded p-button-text p-button-info"
          onClick={() => handleEdit(rowData)}
          title="تعديل المكتب"
        >
          <span className="pi pi-pencil p-button-icon"></span>
        </button>
        
        {isActive ? (
          <button 
            className="p-button p-component p-button-icon-only p-button-rounded p-button-text p-button-danger"
            onClick={() => handleDeactivate(rowData)}
            title="تعطيل المكتب"
          >
            <span className="pi pi-ban p-button-icon"></span>
          </button>
        ) : (
          <button 
            className="p-button p-component p-button-icon-only p-button-rounded p-button-text p-button-success"
            onClick={() => handleActivate(rowData)}
            title="تفعيل المكتب"
          >
            <span className="pi pi-check p-button-icon"></span>
          </button>
        )}
      </div>
    )
  }

  const actionsHeaderTemplate = () => (
    <div style={{ textAlign: 'center', width: '100%' }}>الإجراءات</div>
  )

  const rightToolbarTemplate = () => (
    <SearchToolbar
      value={globalFilter}
      onChange={setGlobalFilter}
      placeholder="بحث في المكاتب..."
    />
  )

  return (
    <AdminLayout>
      <Toast ref={toastRef} />
      <ConfirmDialog />

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>إدارة المكاتب</h1>
           
          </div>
          <Tag
            value={`${offices.length} مكتب`}
            severity="info"
            style={{ fontSize: '16px', padding: '8px 16px' }}
          />
        </div>

        <div className={styles.tableCard}>
          <Toolbar
            right={rightToolbarTemplate}
            style={{ marginBottom: '20px', border: 'none', background: 'transparent', padding: 0 }}
          />

          <DataTable
            value={offices}
            loading={loading}
            paginator
            rows={7}
            dataKey="id"
            globalFilter={globalFilter}
            emptyMessage="لا توجد مكاتب"
            currentPageReportTemplate="صفحة {currentPage} من {totalPages}"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            style={{ direction: 'rtl' }}
          >
            <Column field="name" header="اسم المكتب" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="owner.fullName" header="المالك" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="owner.username" header="اسم المستخدم" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="owner.email" header="البريد الإلكتروني" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="status" header="الحالة" body={statusBodyTemplate} sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="_count.users" header="المستخدمين" body={usersCountBodyTemplate} sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="createdAt" header="تاريخ الإنشاء" body={dateBodyTemplate} sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column
              header={actionsHeaderTemplate}
              body={actionsBodyTemplate}
              exportable={false}
              style={{ textAlign: 'center' }}
              headerStyle={{ justifyContent: 'center' }}
              bodyStyle={{ textAlign: 'center' }}
            />
          </DataTable>
        </div>

        <OfficeEditDialog
          visible={dialogVisible}
          office={editingOffice}
          onChange={handleFieldChange}
          onHide={() => setDialogVisible(false)}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  )
}

export default OfficesManagementPage

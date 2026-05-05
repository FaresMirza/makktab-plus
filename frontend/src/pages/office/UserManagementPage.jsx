import { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Tag } from 'primereact/tag'
import { Toolbar } from 'primereact/toolbar'
import { Toast } from 'primereact/toast'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { useAuth } from '../../context/AuthContext'
import DashboardLayout from '../../layouts/DashboardLayout'

const INITIAL_USERS = [
  { id: 1, name: 'أحمد محمد', email: 'ahmed@example.com', role: 'manager', status: 'Active', officeId: 1 },
  { id: 2, name: 'فاطمة علي', email: 'fatima@example.com', role: 'employee', status: 'Active', officeId: 1 },
  { id: 3, name: 'محمد خالد', email: 'mohamed@example.com', role: 'employee', status: 'Active', officeId: 1 },
  { id: 4, name: 'سارة أحمد', email: 'sara@example.com', role: 'employee', status: 'Inactive', officeId: 1 },
  { id: 5, name: 'علي حسن', email: 'ali@example.com', role: 'manager', status: 'Active', officeId: 2 },
]

const ROLE_OPTIONS = [
  { label: 'إداري', value: 'manager' },
  { label: 'موظف', value: 'employee' },
]

function UserManagementPage() {
  const { currentUser } = useAuth()
  const [users, setUsers] = useState(INITIAL_USERS.filter(u => u.officeId === currentUser?.officeId))
  const [globalFilter, setGlobalFilter] = useState('')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [currentUserData, setCurrentUserData] = useState({
    id: null,
    name: '',
    email: '',
    role: '',
    status: 'Active',
    officeId: currentUser?.officeId,
  })
  const toastRef = useRef(null)

  const openNewDialog = () => {
    setCurrentUserData({ id: null, name: '', email: '', role: '', status: 'Active', officeId: currentUser?.officeId })
    setEditMode(false)
    setDialogVisible(true)
  }

  const openEditDialog = (user) => {
    setCurrentUserData({ ...user })
    setEditMode(true)
    setDialogVisible(true)
  }

  const hideDialog = () => {
    setDialogVisible(false)
  }

  const saveUser = () => {
    if (!currentUserData.name || !currentUserData.email || !currentUserData.role) {
      toastRef.current?.show({ severity: 'warn', summary: 'بيانات ناقصة', detail: 'أكمل جميع الحقول', life: 2500 })
      return
    }

    if (editMode) {
      setUsers((prev) => prev.map((u) => (u.id === currentUserData.id ? currentUserData : u)))
      toastRef.current?.show({ severity: 'success', summary: 'تم التحديث', detail: 'تم تعديل الموظف بنجاح', life: 2000 })
    } else {
      const newUser = { ...currentUserData, id: Math.max(...users.map((u) => u.id), 0) + 1 }
      setUsers((prev) => [...prev, newUser])
      toastRef.current?.show({ severity: 'success', summary: 'تمت الإضافة', detail: 'تم إضافة الموظف بنجاح', life: 2000 })
    }

    hideDialog()
  }

  const confirmDelete = (user) => {
    confirmDialog({
      message: `هل أنت متأكد من حذف ${user.name}؟`,
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setUsers((prev) => prev.filter((u) => u.id !== user.id))
        toastRef.current?.show({ severity: 'info', summary: 'تم الحذف', detail: 'تم حذف الموظف', life: 2000 })
      },
      acceptLabel: 'حذف',
      rejectLabel: 'إلغاء',
      acceptClassName: 'p-button-danger',
    })
  }

  const statusBodyTemplate = (rowData) => {
    const severity = rowData.status === 'Active' ? 'success' : 'danger'
    const label = rowData.status === 'Active' ? 'نشط' : 'غير نشط'
    return <Tag value={label} severity={severity} />
  }

  const roleBodyTemplate = (rowData) => {
    const roleLabel = rowData.role === 'manager' ? 'إداري' : 'موظف'
    const severity = rowData.role === 'manager' ? 'info' : 'secondary'
    return <Tag value={roleLabel} severity={severity} />
  }

  const actionsBodyTemplate = (rowData) => (
    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        style={{ color: '#7fa8b8' }}
        onClick={() => openEditDialog(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-text p-button-danger"
        onClick={() => confirmDelete(rowData)}
      />
    </div>
  )

  const toolbarLeftContent = (
    <Button label="إضافة موظف" icon="pi pi-plus" style={{ background: '#7fa8b8', border: 'none' }} onClick={openNewDialog} />
  )

  const toolbarRightContent = (
    <span className="p-input-icon-left">
      <i className="pi pi-search" />
      <InputText placeholder="بحث..." value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
    </span>
  )

  const dialogFooter = (
    <div>
      <Button label="إلغاء" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="حفظ" icon="pi pi-check" style={{ background: '#7fa8b8', border: 'none' }} onClick={saveUser} />
    </div>
  )

  return (
    <DashboardLayout>
      <style>{`
        .employee-table .p-datatable-thead > tr > th {
          text-align: center !important;
          vertical-align: middle !important;
        }
        .employee-table .p-datatable-tbody > tr > td {
          text-align: center !important;
          vertical-align: middle !important;
        }
      `}</style>
      
      <Toast ref={toastRef} />
      <ConfirmDialog />

      <div style={styles.container}>
        <h1 style={styles.title}>إدارة الموظفين</h1>

        <div style={styles.card}>
          <Toolbar left={toolbarLeftContent} right={toolbarRightContent} style={styles.toolbar} />

          <DataTable
            value={users}
            paginator
            rows={10}
            globalFilter={globalFilter}
            emptyMessage="لا يوجد موظفون"
            style={{ marginTop: '16px' }}
            className="employee-table"
          >
            <Column 
              field="name" 
              header="الاسم" 
              style={{ minWidth: '200px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              field="email" 
              header="البريد الإلكتروني" 
              style={{ minWidth: '200px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              header="الدور" 
              body={roleBodyTemplate} 
              style={{ minWidth: '150px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              header="الحالة" 
              body={statusBodyTemplate} 
              style={{ minWidth: '120px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
            <Column 
              header="الإجراءات" 
              body={actionsBodyTemplate} 
              style={{ minWidth: '120px', textAlign: 'center' }} 
              headerStyle={{ textAlign: 'center' }} 
              bodyStyle={{ textAlign: 'center' }} 
            />
          </DataTable>
        </div>

        <Dialog
          visible={dialogVisible}
          style={{ width: '450px' }}
          header={editMode ? 'تعديل موظف' : 'إضافة موظف جديد'}
          modal
          footer={dialogFooter}
          onHide={hideDialog}
        >
          <div style={styles.formGrid}>
            <div>
              <label htmlFor="name" style={styles.label}>
                الاسم
              </label>
              <InputText
                id="name"
                value={currentUserData.name}
                onChange={(e) => setCurrentUserData({ ...currentUserData, name: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label htmlFor="email" style={styles.label}>
                البريد الإلكتروني
              </label>
              <InputText
                id="email"
                value={currentUserData.email}
                onChange={(e) => setCurrentUserData({ ...currentUserData, email: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label htmlFor="role" style={styles.label}>
                الدور
              </label>
              <Dropdown
                id="role"
                value={currentUserData.role}
                options={ROLE_OPTIONS}
                onChange={(e) => setCurrentUserData({ ...currentUserData, role: e.value })}
                placeholder="اختر الدور"
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label htmlFor="status" style={styles.label}>
                الحالة
              </label>
              <Dropdown
                id="status"
                value={currentUserData.status}
                options={[
                  { label: 'نشط', value: 'Active' },
                  { label: 'غير نشط', value: 'Inactive' },
                ]}
                onChange={(e) => setCurrentUserData({ ...currentUserData, status: e.value })}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 600,
    color: '#2d4d5c',
  },
  card: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
  toolbar: {
    background: 'transparent',
    border: 'none',
    padding: 0,
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '12px 0',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 500,
    color: '#2d4d5c',
  },
}

export default UserManagementPage

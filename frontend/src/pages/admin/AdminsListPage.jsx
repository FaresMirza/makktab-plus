import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getAdmins, updateAdminStatus, deleteAdmin } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import AdminLayout from '../../layouts/AdminLayout';
import styles from './AdminsListPage.module.css';

const AdminsListPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = React.useRef(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const data = await getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'تعذر جلب بيانات المدراء. يرجى المحاولة مرة أخرى.',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (rowData) => {
    try {
      const newStatus = rowData.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await updateAdminStatus(rowData.publicId, newStatus);
      toast.current?.show({
        severity: 'success',
        summary: 'تم التحديث',
        detail: 'تم تحديث حالة المدير بنجاح',
        life: 3000
      });
      fetchAdmins();
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ أثناء محاولة تحديث حالة المدير',
        life: 3000
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAdmin(id);
      toast.current?.show({
        severity: 'success',
        summary: 'تم الحذف',
        detail: 'تم حذف المدير بنجاح',
        life: 3000
      });
      fetchAdmins();
    } catch (error) {
      console.error('Error deleting admin:', error);
      toast.current?.show({
        severity: 'error',
        summary: 'خطأ',
        detail: 'حدث خطأ أثناء محاولة حذف المدير',
        life: 3000
      });
    }
  };

  const confirmDelete = (rowData) => {
    confirmDialog({
      message: 'هل أنت متأكد من حذف هذا المدير؟',
      header: 'تأكيد الحذف',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      acceptLabel: 'نعم، احذف',
      rejectLabel: 'إلغاء',
      accept: () => handleDelete(rowData.publicId)
    });
  };

  const statusBodyTemplate = (rowData) => {
    const isActive = rowData.status === 'ACTIVE';
    return (
      <span className={`status-badge ${isActive ? 'status-active' : 'status-inactive'}`}>
        {isActive ? 'نشط' : 'غير نشط'}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    const isActive = rowData.status === 'ACTIVE';
    return (
      <div className="flex gap-2" style={{ display: 'flex', gap: '0.5rem' }}>
        <Button
          icon={isActive ? "pi pi-times-circle" : "pi pi-check-circle"}
          className={`p-button-rounded p-button-text ${isActive ? 'p-button-warning' : 'p-button-success'}`}
          tooltip={isActive ? "تعطيل المدير" : "تفعيل المدير"}
          tooltipOptions={{ position: 'top' }}
          onClick={() => handleToggleStatus(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
          tooltip="حذف المدير"
          tooltipOptions={{ position: 'top' }}
          onClick={() => confirmDelete(rowData)}
        />
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className={styles.pageContainer}>
        <Toast ref={toast} position="top-left" />
        <ConfirmDialog />
        <PageHeader title="إدارة المدراء" icon="pi pi-users" />

        <div className={styles.tableCard}>
          <DataTable
            value={admins}
            loading={loading}
            paginator
            rows={10}
            dataKey="id"
            emptyMessage="لا يوجد مدراء لعرضهم."
            currentPageReportTemplate="صفحة {currentPage} من {totalPages}"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            style={{ direction: 'rtl' }}
            responsiveLayout="scroll"
            className="p-datatable-sm"
          >
            <Column field="username" header="اسم المستخدم" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="fullName" header="الاسم الكامل" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="email" header="البريد الإلكتروني" sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column field="status" header="الحالة" body={statusBodyTemplate} sortable style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
            <Column header="الإجراءات" body={actionBodyTemplate} style={{ textAlign: 'right' }} headerStyle={{ textAlign: 'right' }} bodyStyle={{ textAlign: 'right' }} />
          </DataTable>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminsListPage;

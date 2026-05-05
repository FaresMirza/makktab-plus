import { useState, useMemo } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import DashboardLayout from '../../layouts/DashboardLayout'
import PageHeader from '../../components/common/PageHeader'
import { formatArabicDate } from '../../utils/dateUtils'
import styles from './AnnouncementsPage.module.css'

const ACTION_TYPES = {
  'PROJECT_CREATED': 'إنشاء مشروع',
  'PROJECT_UPDATED': 'تعديل مشروع',
  'PROJECT_DELETED': 'حذف مشروع',
  'TASK_CREATED': 'إنشاء مهمة',
  'TASK_UPDATED': 'تعديل مهمة',
  'TASK_COMPLETED': 'إكمال مهمة',
  'TASK_DELETED': 'حذف مهمة',
  'USER_ADDED': 'إضافة موظف',
  'USER_UPDATED': 'تعديل بيانات الموظف',
  'USER_REMOVED': 'إزالة موظف',
  'ANNOUNCEMENT_POSTED': 'نشر إعلان',
  'OFFICE_SETTINGS_UPDATED': 'تحديث الإعدادات',
}

const ACTION_COLORS = {
  'PROJECT_CREATED': '#10b981',
  'PROJECT_UPDATED': '#3b82f6',
  'PROJECT_DELETED': '#ef4444',
  'TASK_CREATED': '#10b981',
  'TASK_UPDATED': '#3b82f6',
  'TASK_COMPLETED': '#8b5cf6',
  'TASK_DELETED': '#ef4444',
  'USER_ADDED': '#10b981',
  'USER_UPDATED': '#3b82f6',
  'USER_REMOVED': '#ef4444',
  'ANNOUNCEMENT_POSTED': '#f59e0b',
  'OFFICE_SETTINGS_UPDATED': '#6366f1',
}

const ACTION_OPTIONS = [
  { label: 'جميع الإجراءات', value: null },
  { label: 'إنشاء مشروع', value: 'PROJECT_CREATED' },
  { label: 'تعديل مشروع', value: 'PROJECT_UPDATED' },
  { label: 'حذف مشروع', value: 'PROJECT_DELETED' },
  { label: 'إنشاء مهمة', value: 'TASK_CREATED' },
  { label: 'تعديل مهمة', value: 'TASK_UPDATED' },
  { label: 'إكمال مهمة', value: 'TASK_COMPLETED' },
  { label: 'حذف مهمة', value: 'TASK_DELETED' },
  { label: 'إضافة موظف', value: 'USER_ADDED' },
  { label: 'تعديل بيانات الموظف', value: 'USER_UPDATED' },
  { label: 'إزالة موظف', value: 'USER_REMOVED' },
  { label: 'نشر إعلان', value: 'ANNOUNCEMENT_POSTED' },
  { label: 'تحديث الإعدادات', value: 'OFFICE_SETTINGS_UPDATED' },
]

const SORT_OPTIONS = [
  { label: 'الأحدث أولاً', value: 'desc' },
  { label: 'الأقدم أولاً', value: 'asc' },
]

// Mock data - Office activities and announcements
const MOCK_ANNOUNCEMENTS = [
  {
    id: 1,
    action: 'PROJECT_CREATED',
    actionType: 'PROJECT_CREATED',
    title: 'تم إنشاء مشروع جديد',
    description: 'مشروع "فيلا في شمال الرياض" تم إنشاؤه بواسطة صاحب المكتب',
    user: 'محمد علي',
    details: 'فيلا في شمال الرياض',
    timestamp: new Date('2026-05-03T14:30:00'),
    createdAt: new Date('2026-05-03T14:30:00'),
  },
  {
    id: 2,
    action: 'TASK_COMPLETED',
    actionType: 'TASK_COMPLETED',
    title: 'تم إكمال مهمة',
    description: 'المهمة "صب الأساسات" تم إكمالها من قبل أحمد محمد',
    user: 'أحمد محمد',
    details: 'صب الأساسات - فيلا في شمال الرياض',
    timestamp: new Date('2026-05-03T11:15:00'),
    createdAt: new Date('2026-05-03T11:15:00'),
  },
  {
    id: 3,
    action: 'USER_ADDED',
    actionType: 'USER_ADDED',
    title: 'تم إضافة موظف جديد',
    description: 'تم إضافة "فاطمة أحمد" كموظفة جديدة في المكتب',
    user: 'فاطمة أحمد',
    details: 'مهندسة معمارية',
    timestamp: new Date('2026-05-02T16:45:00'),
    createdAt: new Date('2026-05-02T16:45:00'),
  },
  {
    id: 4,
    action: 'PROJECT_UPDATED',
    actionType: 'PROJECT_UPDATED',
    title: 'تم تعديل مشروع',
    description: 'تم تحديث تفاصيل مشروع "العمارة السكنية" بواسطة صاحب المكتب',
    user: 'محمد علي',
    details: 'العمارة السكنية - تحديث الميزانية والموعد النهائي',
    timestamp: new Date('2026-05-02T10:20:00'),
    createdAt: new Date('2026-05-02T10:20:00'),
  },
  {
    id: 5,
    action: 'TASK_CREATED',
    actionType: 'TASK_CREATED',
    title: 'تم إنشاء مهمة جديدة',
    description: 'تم إنشاء مهمة "دراسة الموقع" وإسنادها إلى محمد خالد',
    user: 'محمد خالد',
    details: 'دراسة الموقع - مشروع التطوير العقاري',
    timestamp: new Date('2026-05-01T13:30:00'),
    createdAt: new Date('2026-05-01T13:30:00'),
  },
  {
    id: 6,
    action: 'ANNOUNCEMENT_POSTED',
    actionType: 'ANNOUNCEMENT_POSTED',
    title: 'تم نشر إعلان',
    description: 'تم نشر إعلان جديد: "تذكير بضرورة تقديم التقارير الأسبوعية"',
    user: 'نظام المكتب',
    details: 'تذكير بتقديم التقارير الأسبوعية قبل نهاية كل أسبوع',
    timestamp: new Date('2026-05-01T08:00:00'),
    createdAt: new Date('2026-05-01T08:00:00'),
  },
  {
    id: 7,
    action: 'TASK_UPDATED',
    actionType: 'TASK_UPDATED',
    title: 'تم تحديث مهمة',
    description: 'تم تحديث المهمة "التشطيبات الداخلية" من قبل صاحب المكتب',
    user: 'محمد علي',
    details: 'التشطيبات الداخلية - تم تغيير الموعد النهائي',
    timestamp: new Date('2026-04-30T15:45:00'),
    createdAt: new Date('2026-04-30T15:45:00'),
  },
  {
    id: 8,
    action: 'USER_UPDATED',
    actionType: 'USER_UPDATED',
    title: 'تم تحديث بيانات موظف',
    description: 'تم تحديث بيانات الموظف "سارة أحمد"',
    user: 'سارة أحمد',
    details: 'تحديث معلومات التواصل والتخصص',
    timestamp: new Date('2026-04-30T09:30:00'),
    createdAt: new Date('2026-04-30T09:30:00'),
  },
  {
    id: 9,
    action: 'PROJECT_CREATED',
    actionType: 'PROJECT_CREATED',
    title: 'تم إنشاء مشروع جديد',
    description: 'مشروع "المركز التجاري الجديد" تم إنشاؤه بواسطة صاحب المكتب',
    user: 'محمد علي',
    details: 'المركز التجاري الجديد - مشروع تطوير عقاري',
    timestamp: new Date('2026-04-29T11:00:00'),
    createdAt: new Date('2026-04-29T11:00:00'),
  },
  {
    id: 10,
    action: 'OFFICE_SETTINGS_UPDATED',
    actionType: 'OFFICE_SETTINGS_UPDATED',
    title: 'تم تحديث الإعدادات',
    description: 'تم تحديث إعدادات المكتب من قبل صاحب المكتب',
    user: 'محمد علي',
    details: 'تحديث سياسات وإعدادات المكتب العامة',
    timestamp: new Date('2026-04-28T14:20:00'),
    createdAt: new Date('2026-04-28T14:20:00'),
  },
]

function AnnouncementsPage() {
  const [announcements] = useState(MOCK_ANNOUNCEMENTS)
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

  const filteredAnnouncements = useMemo(() => {
    let result = [...announcements]

    if (actionFilter) {
      result = result.filter(item => item.actionType === actionFilter)
    }

    if (dateFilter && dateFilter[0]) {
      const start = new Date(dateFilter[0]).setHours(0, 0, 0, 0)
      const end = dateFilter[1]
        ? new Date(dateFilter[1]).setHours(23, 59, 59, 999)
        : new Date(dateFilter[0]).setHours(23, 59, 59, 999)

      result = result.filter(item => {
        const itemTime = new Date(item.createdAt || item.timestamp).getTime()
        return itemTime >= start && itemTime <= end
      })
    }

    result.sort((a, b) => {
      const timeA = new Date(a.createdAt || a.timestamp).getTime()
      const timeB = new Date(b.createdAt || b.timestamp).getTime()
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB
    })

    return result
  }, [announcements, actionFilter, dateFilter, sortOrder])

  // Template functions
  const actionBodyTemplate = (rowData) => {
    const translated = ACTION_TYPES[rowData.actionType] || rowData.actionType
    const color = ACTION_COLORS[rowData.actionType] || '#666'
    return (
      <Tag
        value={translated}
        style={{
          backgroundColor: color,
          color: '#fff',
          fontWeight: '500',
        }}
      />
    )
  }

  const dateBodyTemplate = (rowData) => {
    const d = rowData.createdAt || rowData.timestamp
    if (!d) return 'غير متوفر'
    return formatArabicDate(d)
  }

  const descriptionBodyTemplate = (rowData) => {
    return (
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>{rowData.title}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-light)' }}>{rowData.description}</div>
      </div>
    )
  }

  const detailsBodyTemplate = (rowData) => rowData.details || 'غير متوفر'

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <PageHeader title="الاشعارات" subtitle="تاريخ جميع الإجراءات والتغييرات في المكتب" />
          <Tag
            value={`${filteredAnnouncements.length} إشعار`}
            severity="info"
            style={{ fontSize: '16px', padding: '8px 16px' }}
          />
        </div>

        <div className={styles.card}>
          {/* Filter Bar */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap', direction: 'rtl', justifyContent: 'flex-start' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)' }}>
                البحث
              </label>
              <InputText
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="ابحث عن إشعار..."
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)' }}>
                نوع الإجراء
              </label>
              <Dropdown
                value={actionFilter}
                onChange={(e) => setActionFilter(e.value)}
                options={ACTION_OPTIONS}
                optionLabel="label"
                optionValue="value"
                placeholder="اختر نوع الإجراء"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)' }}>
                نطاق التاريخ
              </label>
              <Calendar
                value={dateFilter}
                onChange={(e) => setDateFilter(e.value)}
                selectionMode="range"
                dateFormat="dd/mm/yy"
                placeholder="اختر نطاق التاريخ"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ flex: '1', minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: 'var(--text-dark)' }}>
                الترتيب
              </label>
              <Dropdown
                value={sortOrder}
                onChange={(e) => setSortOrder(e.value)}
                options={SORT_OPTIONS}
                optionLabel="label"
                optionValue="value"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <Button
                label="مسح الفلاتر"
                icon="pi pi-times"
                className="p-button-outlined"
                onClick={handleClearFilters}
                size="small"
              />
            </div>
          </div>

          {/* Data Table */}
          <DataTable
            value={filteredAnnouncements}
            paginator
            rows={10}
            dataKey="id"
            emptyMessage="لا توجد إشعارات"
            currentPageReportTemplate="صفحة {currentPage} من {totalPages}"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
            style={{ direction: 'rtl' }}
            globalFilter={globalFilter}
            globalFilterFields={['title', 'description', 'details', 'user']}
            responsiveLayout="scroll"
          >
            <Column
              field="createdAt"
              header="التاريخ والوقت"
              body={dateBodyTemplate}
              style={{ textAlign: 'right', minWidth: '150px' }}
              headerStyle={{ textAlign: 'right' }}
              bodyStyle={{ textAlign: 'right' }}
            />
            <Column
              field="actionType"
              header="نوع الإجراء"
              body={actionBodyTemplate}
              style={{ textAlign: 'right', minWidth: '150px' }}
              headerStyle={{ textAlign: 'right' }}
              bodyStyle={{ textAlign: 'right' }}
            />
            <Column
              field="description"
              header="التفاصيل"
              body={descriptionBodyTemplate}
              style={{ textAlign: 'right', minWidth: '300px' }}
              headerStyle={{ textAlign: 'right' }}
              bodyStyle={{ textAlign: 'right' }}
            />
            <Column
              field="details"
              header="العنصر المتأثر"
              body={detailsBodyTemplate}
              style={{ textAlign: 'right', minWidth: '200px' }}
              headerStyle={{ textAlign: 'right' }}
              bodyStyle={{ textAlign: 'right' }}
            />
            <Column
              field="user"
              header="بواسطة"
              style={{ textAlign: 'right', minWidth: '150px' }}
              headerStyle={{ textAlign: 'right' }}
              bodyStyle={{ textAlign: 'right' }}
            />
          </DataTable>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AnnouncementsPage

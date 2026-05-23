import { forwardRef } from 'react'
import type { Project, Task, TaskStatus } from '@/api/types'

interface Props {
  project: Project
  tasks: Task[]
}

const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'قيد الانتظار',
  IN_PROGRESS: 'قيد التنفيذ',
  DONE: 'مكتملة',
  CANCELLED: 'ملغاة',
}

const PROJECT_STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: 'قيد التنفيذ',
  COMPLETED: 'مكتمل',
  CANCELLED: 'ملغى',
}

function formatDateAR(d?: string) {
  if (!d) return '—'
  const date = new Date(d)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const ProjectReport = forwardRef<HTMLDivElement, Props>(({ project, tasks }, ref) => {
  const total = tasks.length
  const completed = tasks.filter((t) => t.status === 'DONE').length
  const inProgress = tasks.filter((t) => t.status === 'IN_PROGRESS').length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const today = new Date().toLocaleDateString('ar', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      ref={ref}
      dir="rtl"
      lang="ar"
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '18mm 16mm',
        background: '#ffffff',
        color: '#0f172a',
        fontFamily: 'Tajawal, "Noto Naskh Arabic", "Segoe UI", system-ui, sans-serif',
        fontSize: '11pt',
        lineHeight: 1.55,
        boxSizing: 'border-box',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          paddingBottom: '12px',
          marginBottom: '20px',
          borderBottom: '2px solid #0f172a',
        }}
      >
        <div>
          <div style={{ fontSize: '22pt', fontWeight: 700, letterSpacing: '-0.5px' }}>
            Maktab Plus
          </div>
          <div style={{ fontSize: '10pt', color: '#64748b', marginTop: '4px' }}>
            تقرير تقدّم المشروع
          </div>
        </div>
        <div style={{ textAlign: 'left', fontSize: '10pt', color: '#475569' }}>
          <div>{today}</div>
        </div>
      </header>

      <section style={{ marginBottom: '20px' }}>
        <div
          style={{
            fontSize: '10pt',
            color: '#64748b',
            marginBottom: '4px',
          }}
        >
          اسم المشروع
        </div>
        <div style={{ fontSize: '16pt', fontWeight: 600 }}>{project.name}</div>
        {project.description && (
          <div style={{ fontSize: '10pt', color: '#475569', marginTop: '6px' }}>
            {project.description}
          </div>
        )}
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          marginBottom: '24px',
        }}
      >
        <InfoBox label="العميل" value={project.clientName || '—'} />
        <InfoBox label="تاريخ البدء" value={formatDateAR(project.startDate)} />
        <InfoBox label="تاريخ الانتهاء" value={formatDateAR(project.endDate)} />
      </section>

      <section style={{ marginBottom: '24px' }}>
        <SectionTitle>الإحصائيات</SectionTitle>
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '14px',
            background: '#f8fafc',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '11pt',
              marginBottom: '8px',
            }}
          >
            <span>نسبة الإنجاز الكلية</span>
            <span style={{ fontWeight: 700, fontSize: '12pt' }}>{percent}%</span>
          </div>
          <div
            style={{
              width: '100%',
              height: '10px',
              background: '#e2e8f0',
              borderRadius: '999px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${percent}%`,
                background: '#0f172a',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              marginTop: '12px',
              fontSize: '10pt',
              color: '#475569',
            }}
          >
            <StatCell label="إجمالي المهام" value={String(total)} />
            <StatCell label="المهام المكتملة" value={String(completed)} />
            <StatCell label="قيد التنفيذ" value={String(inProgress)} />
          </div>
        </div>
      </section>

      <section>
        <SectionTitle>قائمة المهام</SectionTitle>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '10.5pt',
          }}
        >
          <thead>
            <tr style={{ background: '#f1f5f9' }}>
              <Th width="10%">#</Th>
              <Th width="45%">المهمة</Th>
              <Th width="25%">الموظف</Th>
              <Th width="20%">الحالة</Th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    border: '1px solid #e2e8f0',
                    padding: '14px',
                    textAlign: 'center',
                    color: '#64748b',
                  }}
                >
                  لا توجد مهام
                </td>
              </tr>
            ) : (
              tasks.map((t, idx) => (
                <tr key={t.publicId}>
                  <Td>{idx + 1}</Td>
                  <Td>{t.title}</Td>
                  <Td>{t.assignedTo?.fullName || '—'}</Td>
                  <Td>
                    <StatusPill status={t.status} />
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <footer
        style={{
          marginTop: '32px',
          paddingTop: '10px',
          borderTop: '1px solid #e2e8f0',
          fontSize: '9pt',
          color: '#94a3b8',
          textAlign: 'center',
        }}
      >
        Maktab Plus · {project.name} · {today} · حالة المشروع:{' '}
        {PROJECT_STATUS_LABEL[project.status] || project.status}
      </footer>
    </div>
  )
})
ProjectReport.displayName = 'ProjectReport'

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        padding: '10px 12px',
        background: '#f8fafc',
      }}
    >
      <div style={{ fontSize: '9pt', color: '#64748b', marginBottom: '3px' }}>{label}</div>
      <div style={{ fontSize: '11pt', fontWeight: 600 }}>{value}</div>
    </div>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '13pt',
        fontWeight: 700,
        marginBottom: '10px',
        paddingBottom: '6px',
        borderBottom: '1px solid #cbd5e1',
      }}
    >
      {children}
    </div>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ color: '#94a3b8', fontSize: '9pt' }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: '11pt', color: '#0f172a' }}>{value}</div>
    </div>
  )
}

function Th({ children, width }: { children: React.ReactNode; width?: string }) {
  return (
    <th
      style={{
        border: '1px solid #cbd5e1',
        padding: '8px 10px',
        textAlign: 'right',
        fontWeight: 700,
        fontSize: '10pt',
        width,
      }}
    >
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      style={{
        border: '1px solid #e2e8f0',
        padding: '7px 10px',
        textAlign: 'right',
        verticalAlign: 'middle',
      }}
    >
      {children}
    </td>
  )
}

function StatusPill({ status }: { status: TaskStatus }) {
  const palette: Record<TaskStatus, { bg: string; fg: string }> = {
    DONE: { bg: '#dcfce7', fg: '#166534' },
    IN_PROGRESS: { bg: '#dbeafe', fg: '#1e3a8a' },
    TODO: { bg: '#fef3c7', fg: '#854d0e' },
    CANCELLED: { bg: '#fee2e2', fg: '#991b1b' },
  }
  const { bg, fg } = palette[status]
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        background: bg,
        color: fg,
        borderRadius: '999px',
        fontSize: '9.5pt',
        fontWeight: 600,
      }}
    >
      {TASK_STATUS_LABEL[status]}
    </span>
  )
}

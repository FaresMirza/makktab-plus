import { Navigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOfficeAuditLogs } from '@/api/audit'
import { useAuth } from '@/auth/AuthContext'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDateTime } from '@/lib/utils'

export function OfficeAuditPage() {
  const { user } = useAuth()
  const canViewAudit = !!user?.roles?.some((role) => role === 'owner' || role === 'manager')
  const { data, isLoading } = useQuery({
    queryKey: ['office', 'audit'],
    queryFn: getOfficeAuditLogs,
    enabled: canViewAudit,
  })

  if (!canViewAudit) return <Navigate to="/office" replace />
  if (isLoading) return <CenteredSpinner />

  return (
    <div>
      <PageHeader title="سجل نشاط المكتب" description="أحدث محاولات الدخول والنشاطات الأمنية المرتبطة بمستخدمي مكتبك" />

      <Table>
        <THead>
          <TR>
            <TH>الحدث</TH>
            <TH>المستخدم</TH>
            <TH>عنوان IP</TH>
            <TH>السبب</TH>
            <TH>التاريخ</TH>
          </TR>
        </THead>
        <TBody>
          {(data ?? []).length === 0 ? (
            <EmptyRow colSpan={5} />
          ) : (
            data!.map((log) => (
              <TR key={log.id}>
                <TD className="font-medium">{log.event}</TD>
                <TD>{log.user?.fullName || log.user?.username || '—'}</TD>
                <TD className="text-muted text-xs">{log.ip || '—'}</TD>
                <TD className="text-muted text-xs">{log.reason || '—'}</TD>
                <TD className="text-muted text-xs">{formatDateTime(log.createdAt)}</TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}

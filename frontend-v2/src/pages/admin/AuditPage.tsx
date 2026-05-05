import { useQuery } from '@tanstack/react-query'
import { getAdminAuditLogs } from '@/api/admins'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDateTime } from '@/lib/utils'

export function AdminAuditPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'audit'],
    queryFn: getAdminAuditLogs,
  })

  if (isLoading) return <CenteredSpinner />

  return (
    <div>
      <PageHeader title="سجل التدقيق" description="جميع الأنشطة الإدارية الأخيرة" />

      <Table>
        <THead>
          <TR>
            <TH>الحدث</TH>
            <TH>المسؤول</TH>
            <TH>المكتب المستهدف</TH>
            <TH>عنوان IP</TH>
            <TH>التاريخ</TH>
          </TR>
        </THead>
        <TBody>
          {(data ?? []).length === 0 ? (
            <EmptyRow colSpan={5} />
          ) : (
            data!.map((log) => (
              <TR key={log.id}>
                <TD className="font-medium">{log.action}</TD>
                <TD>{log.admin?.username || '—'}</TD>
                <TD>{log.targetOffice?.name || '—'}</TD>
                <TD className="text-muted text-xs">{log.ip || log.ipAddress || '—'}</TD>
                <TD className="text-muted text-xs">{formatDateTime(log.createdAt)}</TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}

import { useQuery } from '@tanstack/react-query'
import { Building2, ShieldCheck, Users, ClipboardCheck } from 'lucide-react'
import { getAdminStats } from '@/api/admins'
import { Card, CardContent } from '@/components/ui/Card'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDateTime } from '@/lib/utils'

interface KpiProps {
  label: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
}

function Kpi({ label, value, icon: Icon }: KpiProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-elevated flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-accent leading-none">{value}</div>
          <div className="text-sm text-muted mt-1">{label}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AdminDashboardPage() {
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'stats'], queryFn: getAdminStats })

  if (isLoading) return <CenteredSpinner label="جارٍ التحميل…" />

  return (
    <div>
      <PageHeader title="لوحة التحكم" description="نظرة عامة على المنصة" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Kpi label="مكاتب نشطة" value={data?.activeOfficesCount ?? 0} icon={Building2} />
        <Kpi label="إجمالي المكاتب" value={data?.totalOfficesCount ?? 0} icon={Building2} />
        <Kpi label="المسؤولون" value={data?.totalAdminsCount ?? 0} icon={ShieldCheck} />
        <Kpi label="إجمالي المستخدمين" value={data?.totalUsersCount ?? 0} icon={Users} />
      </div>

      <div className="mb-3 flex items-center gap-2">
        <ClipboardCheck className="h-4 w-4 text-muted" />
        <h2 className="text-sm font-medium text-muted uppercase tracking-wide">آخر الأنشطة</h2>
      </div>
      <Table>
        <THead>
          <TR>
            <TH>الحدث</TH>
            <TH>المسؤول</TH>
            <TH>المكتب المستهدف</TH>
            <TH>التاريخ</TH>
          </TR>
        </THead>
        <TBody>
          {(data?.recentLogs ?? []).length === 0 ? (
            <EmptyRow colSpan={4} />
          ) : (
            data!.recentLogs.map((log) => (
              <TR key={log.id}>
                <TD className="font-medium">{log.action}</TD>
                <TD>{log.admin?.username || '—'}</TD>
                <TD>{log.targetOffice?.name || '—'}</TD>
                <TD className="text-muted text-xs">{formatDateTime(log.createdAt)}</TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}

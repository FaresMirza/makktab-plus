import { useQuery } from '@tanstack/react-query'
import { Briefcase, ListChecks, CheckCircle2, Clock, FileText } from 'lucide-react'
import { getOfficeAuditLogs } from '@/api/audit'
import { listProjects } from '@/api/projects'
import { listTasks, listOverdueTasks } from '@/api/tasks'
import { Card, CardContent } from '@/components/ui/Card'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { useAuth } from '@/auth/AuthContext'
import { formatDate, formatDateTime } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface KpiProps {
  label: string
  value: number | string
  icon: React.ComponentType<{ className?: string }>
  hint?: string
}

function Kpi({ label, value, icon: Icon, hint }: KpiProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl bg-elevated flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div>
          <div className="text-2xl font-semibold text-accent leading-none">{value}</div>
          <div className="text-sm text-muted mt-1">{label}</div>
          {hint && <div className="text-xs text-muted/70 mt-0.5">{hint}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

export function OfficeDashboardPage() {
  const { user } = useAuth()
  const canViewAudit = !!user?.roles?.some((role) => role === 'owner' || role === 'manager')
  const projects = useQuery({ queryKey: ['projects'], queryFn: () => listProjects() })
  const myTasks = useQuery({
    queryKey: ['tasks', 'mine', user?.sub],
    queryFn: () => listTasks({ assignedToUserId: user!.sub }),
    enabled: !!user?.sub,
  })
  const overdue = useQuery({ queryKey: ['tasks', 'overdue'], queryFn: () => listOverdueTasks() })
  const officeAudit = useQuery({
    queryKey: ['office', 'audit'],
    queryFn: getOfficeAuditLogs,
    enabled: canViewAudit,
  })

  if (projects.isLoading || myTasks.isLoading) return <CenteredSpinner />

  const projectList = projects.data?.data ?? []
  const myTaskList = myTasks.data?.data ?? []
  const totalProjects = projects.data?.meta.total ?? projectList.length
  const inProgressProjects = projectList.filter((p) => p.status === 'IN_PROGRESS').length
  const myTotal = myTasks.data?.meta.total ?? myTaskList.length
  const myDone = myTaskList.filter((t) => t.status === 'DONE').length
  const myInProgress = myTaskList.filter((t) => t.status === 'IN_PROGRESS').length
  const overdueCount = overdue.data?.meta.total ?? overdue.data?.data.length ?? 0

  return (
    <div>
      <PageHeader title={`أهلاً، ${user?.fullName || user?.username}`} description="ملخص نشاطك في المكتب" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Kpi label="إجمالي المشاريع" value={totalProjects} icon={Briefcase} hint={`${inProgressProjects} قيد التنفيذ`} />
        <Kpi label="مهامي" value={myTotal} icon={ListChecks} />
        <Kpi label="مهام مكتملة" value={myDone} icon={CheckCircle2} />
        <Kpi label="مهام متأخرة" value={overdueCount} icon={Clock} hint={overdueCount > 0 ? 'تحتاج اهتمامك' : 'كلّ شيء على ما يرام'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div>
          <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-3">آخر المشاريع</h3>
          <Table>
            <THead>
              <TR>
                <TH>المشروع</TH>
                <TH>الحالة</TH>
                <TH>تاريخ الانتهاء</TH>
              </TR>
            </THead>
            <TBody>
              {projectList.slice(0, 5).length === 0 ? (
                <EmptyRow colSpan={3} />
              ) : (
                projectList.slice(0, 5).map((p) => (
                  <TR key={p.publicId}>
                    <TD className="font-medium">
                      <Link to={`/office/projects/${p.publicId}`} className="hover:underline">
                        {p.name}
                      </Link>
                    </TD>
                    <TD>
                      <Badge tone={p.status === 'IN_PROGRESS' ? 'info' : p.status === 'COMPLETED' ? 'success' : 'warning'}>
                        {p.status}
                      </Badge>
                    </TD>
                    <TD className="text-xs text-muted">{formatDate(p.endDate)}</TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted uppercase tracking-wide mb-3">مهامي قيد التنفيذ</h3>
          <Table>
            <THead>
              <TR>
                <TH>المهمة</TH>
                <TH>المشروع</TH>
                <TH>الاستحقاق</TH>
              </TR>
            </THead>
            <TBody>
              {myInProgress === 0 ? (
                <EmptyRow colSpan={3} label="لا مهام قيد التنفيذ" />
              ) : (
                myTaskList
                  .filter((t) => t.status === 'IN_PROGRESS')
                  .slice(0, 5)
                  .map((t) => (
                    <TR key={t.publicId}>
                      <TD className="font-medium">{t.title}</TD>
                      <TD className="text-xs text-muted">{t.project?.name || '—'}</TD>
                      <TD className="text-xs text-muted">{formatDate(t.dueDate)}</TD>
                    </TR>
                  ))
              )}
            </TBody>
          </Table>
        </div>
      </div>

      {canViewAudit && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted" />
              <h3 className="text-sm font-medium text-muted uppercase tracking-wide">سجل نشاط المكتب</h3>
            </div>
            <Link to="/office/audit" className="text-sm text-accent hover:underline">
              عرض الكل
            </Link>
          </div>
          <Table>
            <THead>
              <TR>
                <TH>الحدث</TH>
                <TH>المستخدم</TH>
                <TH>عنوان IP</TH>
                <TH>التاريخ</TH>
              </TR>
            </THead>
            <TBody>
              {(officeAudit.data ?? []).slice(0, 5).length === 0 ? (
                <EmptyRow colSpan={4} label="لا توجد سجلات بعد" />
              ) : (
                officeAudit.data!.slice(0, 5).map((log) => (
                  <TR key={log.id}>
                    <TD className="font-medium">{log.event}</TD>
                    <TD>{log.user?.fullName || log.user?.username || '—'}</TD>
                    <TD className="text-xs text-muted">{log.ip || '—'}</TD>
                    <TD className="text-xs text-muted">{formatDateTime(log.createdAt)}</TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </div>
      )}
    </div>
  )
}

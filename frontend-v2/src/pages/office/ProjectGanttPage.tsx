import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRight, ChartNoAxesGantt, Clock3, Users2 } from 'lucide-react'
import { getProject } from '@/api/projects'
import { listTasks } from '@/api/tasks'
import type { Task, TaskStatus } from '@/api/types'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { formatDate, formatDateTime } from '@/lib/utils'

const DAY_MS = 24 * 60 * 60 * 1000

const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'قيد الانتظار',
  IN_PROGRESS: 'قيد التنفيذ',
  DONE: 'مكتملة',
  CANCELLED: 'ملغاة',
}

const STATUS_TONE: Record<TaskStatus, 'warning' | 'info' | 'success' | 'danger'> = {
  TODO: 'warning',
  IN_PROGRESS: 'info',
  DONE: 'success',
  CANCELLED: 'danger',
}

function startOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function endOfDay(date: Date) {
  const copy = new Date(date)
  copy.setHours(23, 59, 59, 999)
  return copy
}

function addDays(date: Date, days: number) {
  return new Date(date.getTime() + days * DAY_MS)
}

function diffDaysInclusive(start: Date, end: Date) {
  return Math.max(1, Math.floor((startOfDay(end).getTime() - startOfDay(start).getTime()) / DAY_MS) + 1)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getTaskWindow(task: Task, projectStart: Date, projectEnd: Date) {
  const start = task.startAt ? new Date(task.startAt) : task.createdAt ? new Date(task.createdAt) : projectStart
  const end = task.endAt
    ? new Date(task.endAt)
    : task.dueDate
      ? new Date(task.dueDate)
      : start

  const safeStart = Number.isNaN(start.getTime()) ? projectStart : start
  const safeEnd = Number.isNaN(end.getTime()) ? safeStart : end
  const normalizedStart = safeStart < projectStart ? projectStart : safeStart
  const normalizedEnd = safeEnd > projectEnd ? projectEnd : safeEnd

  return normalizedEnd < normalizedStart
    ? { start: normalizedStart, end: normalizedStart }
    : { start: normalizedStart, end: normalizedEnd }
}

function getProgress(task: Task) {
  if (task.status === 'DONE') return 100
  if (task.status === 'IN_PROGRESS') return 65
  if (task.status === 'CANCELLED') return 0
  return 15
}

export function OfficeProjectGanttPage() {
  const { publicId } = useParams<{ publicId: string }>()

  const project = useQuery({
    queryKey: ['projects', publicId],
    queryFn: () => getProject(publicId!),
    enabled: !!publicId,
  })

  const tasks = useQuery({
    queryKey: ['tasks', 'project', publicId],
    queryFn: () => listTasks({ projectId: publicId }),
    enabled: !!publicId,
  })

  if (project.isLoading || tasks.isLoading) return <CenteredSpinner />
  if (!project.data) return <div className="text-muted">المشروع غير موجود</div>

  const p = project.data
  const taskList = tasks.data?.data ?? []
  const baseStart = p.startDate ? startOfDay(new Date(p.startDate)) : startOfDay(new Date())
  const baseEnd = p.endDate ? endOfDay(new Date(p.endDate)) : endOfDay(addDays(baseStart, 6))
  const totalDays = diffDaysInclusive(baseStart, baseEnd)
  const chartWidth = Math.max(totalDays * 48, 720)
  const timelineDays = Array.from({ length: totalDays }, (_, index) => addDays(baseStart, index))
  const completedTasks = taskList.filter((task) => task.status === 'DONE').length
  const progress = taskList.length ? Math.round((completedTasks / taskList.length) * 100) : 0
  const members = new Set(taskList.map((task) => task.assignedTo?.fullName).filter(Boolean)).size
  const distribution = Object.entries(
    taskList.reduce<Record<string, number>>((acc, task) => {
      const key = task.assignedTo?.fullName || 'غير محدد'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {}),
  ).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-6">
      <Link to={`/office/projects/${p.publicId}`} className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
        <ArrowRight className="h-4 w-4" />
        العودة لصفحة المشروع
      </Link>

      <PageHeader
        title={`الجانت شارت - ${p.name}`}
        description="عرض زمني واضح للمهام، توزيعها، ونسبة الإنجاز الفعلية داخل فترة المشروع."
        actions={
          <Badge tone="info" className="text-sm">
            <ChartNoAxesGantt className="h-4 w-4" />
            {formatDate(p.startDate)} - {formatDate(p.endDate)}
          </Badge>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted">
              <Clock3 className="h-4 w-4" />
              الفترة الزمنية
            </div>
            <div className="text-lg font-semibold text-accent">{totalDays} يوم</div>
            <div className="mt-2 text-sm text-muted">
              من {formatDate(p.startDate)} إلى {formatDate(p.endDate)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="mb-2 text-sm text-muted">الإنجاز العام</div>
            <div className="text-lg font-semibold text-accent">{progress}%</div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-brand-soft">
              <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-strong" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-sm text-muted">{completedTasks} من {taskList.length} مهام مكتملة</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted">
              <Users2 className="h-4 w-4" />
              التوزيع
            </div>
            <div className="text-lg font-semibold text-accent">{members} أعضاء</div>
            <div className="mt-2 text-sm text-muted">
              {distribution.slice(0, 2).map(([name, count]) => `${name}: ${count}`).join(' - ') || 'لا توجد مهام'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[280px_minmax(720px,1fr)] border-b border-border bg-brand-soft">
                <div className="px-5 py-4 text-sm font-medium text-accent">المهمة</div>
                <div dir="ltr" className="px-4 py-3" style={{ minWidth: chartWidth }}>
                  <div className="grid h-14 items-end gap-0" style={{ gridTemplateColumns: `repeat(${totalDays}, minmax(48px, 1fr))` }}>
                    {timelineDays.map((day) => (
                      <div key={day.toISOString()} className="px-1 text-center text-[11px] text-muted">
                        <div className="mb-1">{day.getDate()}</div>
                        <div>{day.toLocaleDateString('ar', { month: 'short' })}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {taskList.length === 0 ? (
                <div className="px-5 py-16 text-center text-muted">لا توجد مهام مجدولة بعد</div>
              ) : (
                taskList.map((task) => {
                  const window = getTaskWindow(task, baseStart, baseEnd)
                  const startOffset = diffDaysInclusive(baseStart, startOfDay(window.start)) - 1
                  const span = diffDaysInclusive(startOfDay(window.start), endOfDay(window.end))
                  const left = clamp((startOffset / totalDays) * 100, 0, 100)
                  const width = clamp((span / totalDays) * 100, 3.5, 100)

                  return (
                    <div key={task.publicId} className="grid grid-cols-[280px_minmax(720px,1fr)] border-b border-border last:border-b-0">
                      <div className="space-y-2 px-5 py-4">
                        <div className="font-medium text-accent">{task.title}</div>
                        <div className="text-sm text-muted">{task.assignedTo?.fullName || 'غير محدد'}</div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={STATUS_TONE[task.status]}>{STATUS_LABEL[task.status]}</Badge>
                          <span className="text-xs text-muted">{getProgress(task)}%</span>
                        </div>
                        <div className="text-xs text-muted">
                          {formatDateTime(task.startAt)} - {formatDateTime(task.endAt)}
                        </div>
                      </div>

                      <div dir="ltr" className="px-4 py-4" style={{ minWidth: chartWidth }}>
                        <div className="timeline-grid relative h-16 rounded-2xl border border-border bg-surface/70">
                          <div
                            className="absolute inset-y-3 rounded-2xl bg-gradient-to-r from-brand to-brand-strong shadow-soft"
                            style={{ left: `${left}%`, width: `${width}%` }}
                          >
                            <div className="h-full rounded-2xl bg-black/10 px-3 py-2 text-xs text-brand-contrast">
                              <div className="truncate">{task.assignedTo?.fullName || task.title}</div>
                              <div className="mt-1 h-1.5 rounded-full bg-black/10">
                                <div
                                  className="h-full rounded-full bg-emerald-200/80"
                                  style={{ width: `${getProgress(task)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

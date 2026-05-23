import { useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useReactToPrint } from 'react-to-print'
import {
  ArrowRight,
  Plus,
  Trash2,
  Upload,
  Download,
  CheckCircle2,
  Loader2,
  FileText,
  Printer,
} from 'lucide-react'
import { toast } from 'sonner'
import { getProject, updateProject } from '@/api/projects'
import {
  cancelTask,
  createTask,
  listTasks,
  updateTask,
  type CreateTaskPayload,
  type UpdateTaskPayload,
} from '@/api/tasks'
import { listUsers } from '@/api/users'
import { deleteProjectFile, listProjectFiles, uploadProjectFile } from '@/api/files'
import { useAuth } from '@/auth/AuthContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { TaskDetailDialog } from '@/components/office/TaskDetailDialog'
import { ProjectReport } from '@/components/office/ProjectReport'
import type { Task, TaskStatus } from '@/api/types'
import { formatDate, formatDateTime, getApiErrorMessage } from '@/lib/utils'

const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'قيد الانتظار',
  IN_PROGRESS: 'قيد التنفيذ',
  DONE: 'مكتملة',
  CANCELLED: 'ملغاة',
}

interface NewTaskForm {
  title: string
  description: string
  assignedToUserId: string
  dueDate: string
}

const emptyTask: NewTaskForm = {
  title: '',
  description: '',
  assignedToUserId: '',
  dueDate: '',
}

export function OfficeProjectDetailPage() {
  const { publicId } = useParams<{ publicId: string }>()
  const { user } = useAuth()
  const isOfficeAdmin = user?.role === 'office_owner' || user?.role === 'super_admin'
  const qc = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)

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
  const files = useQuery({
    queryKey: ['files', publicId],
    queryFn: () => listProjectFiles(publicId!),
    enabled: !!publicId,
  })
  const users = useQuery({ queryKey: ['users'], queryFn: () => listUsers() })

  const [taskOpen, setTaskOpen] = useState(false)
  const [taskForm, setTaskForm] = useState<NewTaskForm>(emptyTask)
  const [openTask, setOpenTask] = useState<Task | null>(null)
  const [reportOpen, setReportOpen] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)
  const printReport = useReactToPrint({
    contentRef: reportRef,
    documentTitle: `Project Report - ${project.data?.name ?? ''}`,
  })

  const createT = useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      toast.success('تم إنشاء المهمة')
      qc.invalidateQueries({ queryKey: ['tasks', 'project', publicId] })
      setTaskOpen(false)
      setTaskForm(emptyTask)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const updateT = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tasks', 'project', publicId] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const cancelT = useMutation({
    mutationFn: (id: string) => cancelTask(id),
    onSuccess: () => {
      toast.success('تم إلغاء المهمة')
      qc.invalidateQueries({ queryKey: ['tasks', 'project', publicId] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const upload = useMutation({
    mutationFn: (file: File) => uploadProjectFile(publicId!, file),
    onSuccess: () => {
      toast.success('تم رفع الملف')
      qc.invalidateQueries({ queryKey: ['files', publicId] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const removeFile = useMutation({
    mutationFn: (filePublicId: string) => deleteProjectFile(filePublicId),
    onSuccess: () => {
      toast.success('تم حذف الملف')
      qc.invalidateQueries({ queryKey: ['files', publicId] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const completeProject = useMutation({
    mutationFn: () => updateProject(publicId!, { status: 'COMPLETED' }),
    onSuccess: () => {
      toast.success('تم إنهاء المشروع')
      qc.invalidateQueries({ queryKey: ['projects', publicId] })
      qc.invalidateQueries({ queryKey: ['projects'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (project.isLoading) return <CenteredSpinner />
  if (!project.data) return <div className="text-muted">المشروع غير موجود</div>

  const p = project.data
  const taskList = tasks.data?.data ?? []
  const fileList = files.data ?? []
  const userList = users.data?.data ?? []
  // Office owner / manager / admin OR the assigned project manager.
  const canManage =
    isOfficeAdmin || p.projectManager?.publicId === user?.sub

  return (
    <div>
      <Link to="/office/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent mb-4">
        <ArrowRight className="h-4 w-4" />
        العودة للمشاريع
      </Link>

      <PageHeader
        title={p.name}
        description={p.description}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => setReportOpen(true)}>
              <FileText className="h-4 w-4" />
              تقرير المشروع (PDF)
            </Button>
            {canManage && p.status !== 'COMPLETED' && (
              <Button onClick={() => completeProject.mutate()} loading={completeProject.isPending}>
                <CheckCircle2 className="h-4 w-4" />
                إنهاء المشروع
              </Button>
            )}
          </div>
        }
      />

      {/* Project facts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <Card><CardContent className="p-4">
          <div className="text-xs text-muted">العميل</div>
          <div className="text-sm font-medium mt-1">{p.clientName || '—'}</div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="text-xs text-muted">الميزانية</div>
          <div className="text-sm font-medium mt-1">{p.budget ?? '—'}</div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="text-xs text-muted">المدير</div>
          <div className="text-sm font-medium mt-1">{p.projectManager?.fullName || '—'}</div>
        </CardContent></Card>
        <Card><CardContent className="p-4">
          <div className="text-xs text-muted">الحالة</div>
          <div className="mt-1">
            <Badge tone={p.status === 'IN_PROGRESS' ? 'info' : p.status === 'COMPLETED' ? 'success' : 'warning'}>
              {p.status}
            </Badge>
          </div>
        </CardContent></Card>
      </div>

      {/* Tasks */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>المهام</CardTitle>
          {canManage && (
            <Button
              size="sm"
              onClick={() => {
                setTaskForm(emptyTask)
                setTaskOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              مهمة جديدة
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>العنوان</TH>
                <TH>المسؤول</TH>
                <TH>الحالة</TH>
                <TH>الاستحقاق</TH>
                {canManage && <TH className="text-left">إجراءات</TH>}
              </TR>
            </THead>
            <TBody>
              {taskList.length === 0 ? (
                <EmptyRow colSpan={canManage ? 5 : 4} label="لا توجد مهام" />
              ) : (
                taskList.map((t) => {
                  return (
                    <TR
                      key={t.publicId}
                      onClick={() => setOpenTask(t)}
                      className="cursor-pointer"
                    >
                      <TD className="font-medium">{t.title}</TD>
                      <TD>{t.assignedTo?.fullName || '—'}</TD>
                      <TD>
                        <Badge
                          tone={
                            t.status === 'DONE'
                              ? 'success'
                              : t.status === 'IN_PROGRESS'
                                ? 'info'
                                : t.status === 'CANCELLED'
                                  ? 'danger'
                                  : 'warning'
                          }
                        >
                          {TASK_STATUS_LABEL[t.status]}
                        </Badge>
                      </TD>
                      <TD className="text-xs text-muted">{formatDate(t.dueDate)}</TD>
                      {canManage && (
                        <TD className="text-left" onClick={(e) => e.stopPropagation()}>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => cancelT.mutate(t.publicId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TD>
                      )}
                    </TR>
                  )
                })
              )}
            </TBody>
          </Table>
        </CardContent>
      </Card>

      {/* Files */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>الملفات</CardTitle>
          {canManage && (
            <div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) upload.mutate(f)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
              />
              <Button size="sm" onClick={() => fileInputRef.current?.click()} loading={upload.isPending}>
                {upload.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                رفع ملف
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>الاسم</TH>
                <TH>الحجم</TH>
                <TH>رفعه</TH>
                <TH>التاريخ</TH>
                <TH className="text-left">إجراءات</TH>
              </TR>
            </THead>
            <TBody>
              {fileList.length === 0 ? (
                <EmptyRow colSpan={5} label="لا توجد ملفات" />
              ) : (
                fileList.map((f) => (
                  <TR key={f.publicId}>
                    <TD className="font-medium">{f.fileName}</TD>
                    <TD className="text-xs text-muted">{Math.round(f.fileSize / 1024)} KB</TD>
                    <TD>{f.uploadedBy?.fullName || '—'}</TD>
                    <TD className="text-xs text-muted">{formatDateTime(f.createdAt)}</TD>
                    <TD className="text-left">
                      <div className="flex items-center gap-2 justify-end">
                        <a
                          href={f.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="h-8 w-8 rounded-md bg-elevated hover:bg-elevated/70 flex items-center justify-center text-accent"
                        >
                          <Download className="h-4 w-4" />
                        </a>
                        {canManage && (
                          <Button size="sm" variant="danger" onClick={() => removeFile.mutate(f.publicId)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TD>
                  </TR>
                ))
              )}
            </TBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={taskOpen} onClose={() => setTaskOpen(false)} title="مهمة جديدة">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!taskForm.title || !taskForm.assignedToUserId) {
              toast.error('العنوان والمسؤول حقول مطلوبة')
              return
            }
            if (!user?.sub) {
              toast.error('لم يتم العثور على المستخدم')
              return
            }
            createT.mutate({
              title: taskForm.title,
              description: taskForm.description || undefined,
              projectId: publicId!,
              createdByUserId: user.sub,
              assignedToUserId: taskForm.assignedToUserId,
              // Status omitted — backend defaults to TODO; the assignee
              // is the one who flips it to IN_PROGRESS / DONE.
              dueDate: taskForm.dueDate ? new Date(taskForm.dueDate).toISOString() : undefined,
            })
          }}
        >
          <div>
            <Label>العنوان</Label>
            <Input value={taskForm.title} onChange={(e) => setTaskForm((f) => ({ ...f, title: e.target.value }))} />
          </div>
          <div>
            <Label>الوصف</Label>
            <Input value={taskForm.description} onChange={(e) => setTaskForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>المسؤول</Label>
              <Select
                value={taskForm.assignedToUserId}
                onChange={(e) => setTaskForm((f) => ({ ...f, assignedToUserId: e.target.value }))}
              >
                <option value="">اختر…</option>
                {userList.map((u) => (
                  <option key={u.publicId} value={u.publicId}>
                    {u.fullName} (@{u.username})
                  </option>
                ))}
              </Select>
            </div>
            <div className="sm:col-span-2">
              <Label>تاريخ الاستحقاق</Label>
              <Input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm((f) => ({ ...f, dueDate: e.target.value }))}
              />
              <div className="text-xs text-muted mt-1">
                لا يمكن اختيار تاريخ في الماضي.
              </div>
            </div>
          </div>
          <div className="flex justify-start gap-2 pt-2">
            <Button type="submit" loading={createT.isPending}>إنشاء</Button>
            <Button type="button" variant="outline" onClick={() => setTaskOpen(false)}>إلغاء</Button>
          </div>
        </form>
      </Dialog>

      <TaskDetailDialog
        task={openTask}
        canManageProject={canManage}
        onClose={() => setOpenTask(null)}
      />

      <Dialog
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="معاينة تقرير المشروع"
        className="max-w-4xl"
      >
        <div className="flex justify-end mb-3">
          <Button onClick={() => printReport()}>
            <Printer className="h-4 w-4" />
            طباعة / حفظ PDF
          </Button>
        </div>
        <div className="max-h-[70vh] overflow-auto rounded-md border border-border bg-white">
          <ProjectReport ref={reportRef} project={p} tasks={taskList} />
        </div>
      </Dialog>
    </div>
  )
}

import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2, Download, Loader2, Paperclip, Trash2, Upload } from 'lucide-react'
import { toast } from 'sonner'
import { updateTask, cancelTask } from '@/api/tasks'
import { listTaskFiles, uploadTaskFile, deleteProjectFile } from '@/api/files'
import type { Task, TaskStatus } from '@/api/types'
import { useAuth } from '@/auth/AuthContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { formatDateTime, getApiErrorMessage } from '@/lib/utils'

const STATUS_LABEL: Record<TaskStatus, string> = {
  TODO: 'قيد الانتظار',
  IN_PROGRESS: 'قيد التنفيذ',
  DONE: 'مكتملة',
  CANCELLED: 'ملغاة',
}

const STATUS_TONE: Record<TaskStatus, 'info' | 'success' | 'warning' | 'danger'> = {
  TODO: 'warning',
  IN_PROGRESS: 'info',
  DONE: 'success',
  CANCELLED: 'danger',
}

interface Props {
  task: Task | null
  /** True if the current user can fully manage this task (owner/manager/PM/admin) */
  canManageProject: boolean
  onClose: () => void
}

export function TaskDetailDialog({ task, canManageProject, onClose }: Props) {
  const { user } = useAuth()
  const qc = useQueryClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const proofInputRef = useRef<HTMLInputElement>(null)
  // When the assignee picks "DONE" we hold off on actually sending the
  // status change until they confirm — and optionally attach a PDF
  // proof-of-completion.
  const [completing, setCompleting] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)

  const isAssignee =
    !!task &&
    (task.assignedTo?.publicId === user?.sub ||
      task.assignedToUserId === user?.sub)

  // Status is owned by the assignee only — even office owners and project
  // managers don't override it. Project managers can still create / delete
  // tasks, just not flip their state.
  const canChangeStatus = isAssignee
  // Files: assignee or manager can upload+delete on their task.
  const canManageFiles = canManageProject || isAssignee

  const files = useQuery({
    queryKey: ['task-files', task?.publicId],
    queryFn: () => listTaskFiles(task!.publicId),
    enabled: !!task?.publicId,
  })

  const updateStatus = useMutation({
    mutationFn: (status: TaskStatus) => updateTask(task!.publicId, { status }),
    onSuccess: () => {
      toast.success('تم تحديث الحالة')
      qc.invalidateQueries({ queryKey: ['tasks'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const completeMutation = useMutation({
    mutationFn: async () => {
      // Upload proof first (best effort) then flip status to DONE.
      if (proofFile) {
        await uploadTaskFile(task!.publicId, proofFile)
      }
      return updateTask(task!.publicId, { status: 'DONE' })
    },
    onSuccess: () => {
      toast.success(
        proofFile
          ? 'تم إنهاء المهمة وإرفاق إثبات الإنجاز'
          : 'تم إنهاء المهمة',
      )
      qc.invalidateQueries({ queryKey: ['tasks'] })
      qc.invalidateQueries({ queryKey: ['task-files', task?.publicId] })
      setCompleting(false)
      setProofFile(null)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const removeTask = useMutation({
    mutationFn: () => cancelTask(task!.publicId),
    onSuccess: () => {
      toast.success('تم حذف المهمة')
      qc.invalidateQueries({ queryKey: ['tasks'] })
      onClose()
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const upload = useMutation({
    mutationFn: (file: File) => uploadTaskFile(task!.publicId, file),
    onSuccess: () => {
      toast.success('تم رفع الملف')
      qc.invalidateQueries({ queryKey: ['task-files', task?.publicId] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const removeFile = useMutation({
    mutationFn: (filePublicId: string) => deleteProjectFile(filePublicId),
    onSuccess: () => {
      toast.success('تم حذف الملف')
      qc.invalidateQueries({ queryKey: ['task-files', task?.publicId] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (!task) return null

  return (
    <Dialog open={!!task} onClose={onClose} title={task.title} className="max-w-2xl">
      <div className="space-y-5">
        {task.description && (
          <p className="text-sm text-muted leading-relaxed">{task.description}</p>
        )}

        {/* Facts row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-xs text-muted">المسؤول</div>
            <div className="text-accent">{task.assignedTo?.fullName || '—'}</div>
          </div>
          <div>
            <div className="text-xs text-muted">بداية ونهاية المهمة</div>
            <div className="text-accent">{formatDateTime(task.startAt)}</div>
            <div className="text-accent">{formatDateTime(task.endAt)}</div>
          </div>
          <div>
            <div className="text-xs text-muted">الحالة الحالية</div>
            <Badge tone={STATUS_TONE[task.status]}>{STATUS_LABEL[task.status]}</Badge>
          </div>
        </div>

        {/* Status change — assignee only, two options */}
        <div>
          <Label htmlFor="task-status">تغيير الحالة</Label>
          <Select
            id="task-status"
            disabled={!canChangeStatus || updateStatus.isPending || completing}
            value={task.status === 'DONE' ? 'DONE' : 'IN_PROGRESS'}
            onChange={(e) => {
              const newStatus = e.target.value as TaskStatus
              if (newStatus === 'DONE' && task.status !== 'DONE') {
                // Open the proof-of-completion section before flipping.
                setCompleting(true)
                setProofFile(null)
              } else {
                updateStatus.mutate(newStatus)
              }
            }}
          >
            <option value="IN_PROGRESS">{STATUS_LABEL.IN_PROGRESS}</option>
            <option value="DONE">{STATUS_LABEL.DONE}</option>
          </Select>
          {!canChangeStatus && (
            <div className="text-xs text-muted mt-1">
              فقط المسؤول عن المهمة يمكنه تغيير الحالة.
            </div>
          )}
        </div>

        {/* Proof-of-completion panel (shown when assignee chooses DONE) */}
        {completing && (
          <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-300 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              تأكيد إنهاء المهمة
            </div>
            <p className="text-xs text-muted leading-relaxed">
              يمكنك إرفاق ملف PDF كإثبات لإنجاز المهمة (اختياري). بعد التأكيد
              ستتحوّل حالة المهمة إلى «مكتملة».
            </p>

            <input
              ref={proofInputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => setProofFile(e.target.files?.[0] || null)}
            />
            {proofFile ? (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-surface border border-border text-sm">
                <span className="truncate">{proofFile.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    setProofFile(null)
                    if (proofInputRef.current) proofInputRef.current.value = ''
                  }}
                  className="text-xs text-muted hover:text-red-400"
                >
                  إزالة
                </button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => proofInputRef.current?.click()}
              >
                <Paperclip className="h-4 w-4" />
                إرفاق ملف PDF
              </Button>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                onClick={() => completeMutation.mutate()}
                loading={completeMutation.isPending}
              >
                <CheckCircle2 className="h-4 w-4" />
                {proofFile ? 'تأكيد الإنهاء مع الإثبات' : 'تأكيد الإنهاء بدون إثبات'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setCompleting(false)
                  setProofFile(null)
                }}
              >
                إلغاء
              </Button>
            </div>
          </div>
        )}

        {/* Files */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="mb-0">الملفات المرفقة</Label>
            {canManageFiles && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) upload.mutate(f)
                    if (fileInputRef.current) fileInputRef.current.value = ''
                  }}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  loading={upload.isPending}
                >
                  {upload.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  رفع ملف
                </Button>
              </>
            )}
          </div>

          {files.isLoading ? (
            <CenteredSpinner />
          ) : (files.data ?? []).length === 0 ? (
            <div className="text-xs text-muted py-3 px-3 rounded-lg bg-elevated/40 border border-border">
              لا توجد ملفات مرفقة بهذه المهمة.
            </div>
          ) : (
            <ul className="space-y-2">
              {files.data!.map((f) => (
                <li
                  key={f.publicId}
                  className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-elevated/40 border border-border"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-accent truncate">{f.fileName}</div>
                    <div className="text-xs text-muted">
                      {Math.round(f.fileSize / 1024)} KB ·{' '}
                      {f.uploadedBy?.fullName || '—'} ·{' '}
                      {formatDateTime(f.createdAt)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={f.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="h-8 w-8 rounded-md bg-surface hover:bg-elevated flex items-center justify-center text-accent border border-border"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    {canManageFiles && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeFile.mutate(f.publicId)}
                        loading={removeFile.isPending && removeFile.variables === f.publicId}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex justify-start gap-2 pt-2 border-t border-border">
          {canManageProject && (
            <Button
              variant="danger"
              onClick={() => removeTask.mutate()}
              loading={removeTask.isPending}
            >
              <Trash2 className="h-4 w-4" />
              حذف المهمة
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            إغلاق
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

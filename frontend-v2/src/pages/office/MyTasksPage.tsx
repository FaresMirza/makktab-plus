import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import { listTasks, updateTask } from '@/api/tasks'
import { useAuth } from '@/auth/AuthContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { TaskDetailDialog } from '@/components/office/TaskDetailDialog'
import type { Task, TaskStatus } from '@/api/types'
import { formatDate, getApiErrorMessage } from '@/lib/utils'

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

export function OfficeTasksPage() {
  const { user } = useAuth()
  const isOfficeAdmin = user?.role === 'office_owner' || user?.role === 'super_admin'
  const qc = useQueryClient()
  const [openTask, setOpenTask] = useState<Task | null>(null)

  const tasks = useQuery({
    queryKey: ['tasks', 'mine', user?.sub],
    queryFn: () => listTasks({ assignedToUserId: user!.sub }),
    enabled: !!user?.sub,
  })

  const complete = useMutation({
    mutationFn: (id: string) => updateTask(id, { status: 'DONE' }),
    onSuccess: () => {
      toast.success('تم إكمال المهمة')
      qc.invalidateQueries({ queryKey: ['tasks', 'mine', user?.sub] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (tasks.isLoading) return <CenteredSpinner />

  const list = tasks.data?.data ?? []

  return (
    <div>
      <PageHeader title="مهامي" description="جميع المهام المسندة إليك" />

      <Table>
        <THead>
          <TR>
            <TH>المهمة</TH>
            <TH>المشروع</TH>
            <TH>الحالة</TH>
            <TH>الاستحقاق</TH>
            <TH className="text-left">إجراء</TH>
          </TR>
        </THead>
        <TBody>
          {list.length === 0 ? (
            <EmptyRow colSpan={5} label="لا مهام مسنّدة لك" />
          ) : (
            list.map((t) => (
              <TR
                key={t.publicId}
                onClick={() => setOpenTask(t)}
                className="cursor-pointer"
              >
                <TD className="font-medium">{t.title}</TD>
                <TD className="text-muted">{t.project?.name || '—'}</TD>
                <TD>
                  <Badge tone={STATUS_TONE[t.status]}>{STATUS_LABEL[t.status]}</Badge>
                </TD>
                <TD className="text-xs text-muted">{formatDate(t.dueDate)}</TD>
                <TD className="text-left" onClick={(e) => e.stopPropagation()}>
                  {t.status !== 'DONE' && t.status !== 'CANCELLED' && (
                    <Button
                      size="sm"
                      onClick={() => complete.mutate(t.publicId)}
                      loading={complete.isPending && complete.variables === t.publicId}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      إنهاء
                    </Button>
                  )}
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>

      <TaskDetailDialog
        task={openTask}
        canManageProject={isOfficeAdmin}
        onClose={() => setOpenTask(null)}
      />
    </div>
  )
}

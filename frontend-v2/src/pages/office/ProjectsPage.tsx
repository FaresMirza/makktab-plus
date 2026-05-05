import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2, FolderKanban } from 'lucide-react'
import { toast } from 'sonner'
import { createProject, deleteProject, listProjects, type CreateProjectPayload } from '@/api/projects'
import { listUsers } from '@/api/users'
import { useAuth } from '@/auth/AuthContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select } from '@/components/ui/Select'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDate, getApiErrorMessage } from '@/lib/utils'

const emptyForm: CreateProjectPayload = {
  name: '',
  description: '',
  projectManagerUserId: '',
  clientName: '',
  budget: undefined,
  startDate: '',
  endDate: '',
  status: 'IN_PROGRESS',
}

export function OfficeProjectsPage() {
  const { user } = useAuth()
  const canManage = user?.role === 'office_owner' || user?.role === 'super_admin'
  const qc = useQueryClient()
  const projects = useQuery({ queryKey: ['projects'], queryFn: () => listProjects() })
  const users = useQuery({ queryKey: ['users'], queryFn: () => listUsers() })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CreateProjectPayload>(emptyForm)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const create = useMutation({
    mutationFn: (payload: CreateProjectPayload) => createProject(payload),
    onSuccess: () => {
      toast.success('تم إنشاء المشروع')
      qc.invalidateQueries({ queryKey: ['projects'] })
      setOpen(false)
      setForm(emptyForm)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      toast.success('تم حذف المشروع')
      qc.invalidateQueries({ queryKey: ['projects'] })
      setConfirmDelete(null)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (projects.isLoading) return <CenteredSpinner />

  const list = projects.data?.data ?? []
  const userList = users.data?.data ?? []

  return (
    <div>
      <PageHeader
        title="المشاريع"
        description={canManage ? 'إدارة مشاريع المكتب' : 'قائمة مشاريع مكتبك'}
        actions={
          canManage && (
            <Button
              onClick={() => {
                setForm({ ...emptyForm, projectManagerUserId: user?.sub || '' })
                setOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              مشروع جديد
            </Button>
          )
        }
      />

      {list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted border border-dashed border-border rounded-2xl">
          <FolderKanban className="h-10 w-10 mb-3" />
          <div className="text-sm">لا توجد مشاريع بعد</div>
        </div>
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>الاسم</TH>
              <TH>العميل</TH>
              <TH>المدير</TH>
              <TH>الحالة</TH>
              <TH>التواريخ</TH>
              {canManage && <TH className="text-left">إجراءات</TH>}
            </TR>
          </THead>
          <TBody>
            {list.map((p) => (
              <TR key={p.publicId}>
                <TD className="font-medium">
                  <Link to={`/office/projects/${p.publicId}`} className="hover:underline">
                    {p.name}
                  </Link>
                </TD>
                <TD>{p.clientName || '—'}</TD>
                <TD>{p.projectManager?.fullName || '—'}</TD>
                <TD>
                  <Badge
                    tone={
                      p.status === 'IN_PROGRESS'
                        ? 'info'
                        : p.status === 'COMPLETED'
                          ? 'success'
                          : 'warning'
                    }
                  >
                    {p.status}
                  </Badge>
                </TD>
                <TD className="text-xs text-muted">
                  {formatDate(p.startDate)} → {formatDate(p.endDate)}
                </TD>
                {canManage && (
                  <TD className="text-left">
                    <Button size="sm" variant="danger" onClick={() => setConfirmDelete(p.publicId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TD>
                )}
              </TR>
            ))}
          </TBody>
        </Table>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} title="مشروع جديد" className="max-w-xl">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!form.name || !form.projectManagerUserId) {
              toast.error('الاسم والمدير حقول مطلوبة')
              return
            }
            create.mutate(form)
          }}
        >
          <div>
            <Label>اسم المشروع</Label>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <Label>الوصف</Label>
            <Input value={form.description ?? ''} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>اسم العميل</Label>
              <Input value={form.clientName ?? ''} onChange={(e) => setForm((f) => ({ ...f, clientName: e.target.value }))} />
            </div>
            <div>
              <Label>الميزانية</Label>
              <Input
                type="number"
                value={form.budget ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value ? Number(e.target.value) : undefined }))}
              />
            </div>
            <div>
              <Label>تاريخ البدء</Label>
              <Input type="date" value={form.startDate ?? ''} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
            </div>
            <div>
              <Label>تاريخ الانتهاء</Label>
              <Input type="date" value={form.endDate ?? ''} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <Label>مدير المشروع</Label>
              <Select
                value={form.projectManagerUserId}
                onChange={(e) => setForm((f) => ({ ...f, projectManagerUserId: e.target.value }))}
              >
                <option value="">اختر…</option>
                {userList.map((u) => (
                  <option key={u.publicId} value={u.publicId}>
                    {u.fullName} (@{u.username})
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-start gap-2 pt-2">
            <Button type="submit" loading={create.isPending}>إنشاء</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
          </div>
        </form>
      </Dialog>

      <Dialog open={!!confirmDelete} onClose={() => setConfirmDelete(null)} title="تأكيد الحذف">
        <p className="text-sm text-muted mb-4">سيتم حذف المشروع وكافة المهام والملفات المرتبطة به.</p>
        <div className="flex justify-start gap-2">
          <Button variant="danger" loading={remove.isPending} onClick={() => confirmDelete && remove.mutate(confirmDelete)}>
            حذف نهائي
          </Button>
          <Button variant="outline" onClick={() => setConfirmDelete(null)}>إلغاء</Button>
        </div>
      </Dialog>
    </div>
  )
}

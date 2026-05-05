import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2, Power, PowerOff } from 'lucide-react'
import { toast } from 'sonner'
import {
  createAdmin,
  deleteAdmin,
  getAdmins,
  updateAdminStatus,
  type CreateAdminPayload,
} from '@/api/admins'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Badge } from '@/components/ui/Badge'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { getApiErrorMessage } from '@/lib/utils'

const empty: CreateAdminPayload = { fullName: '', username: '', email: '', password: '' }

export function AdminAdminsPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'admins'], queryFn: getAdmins })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CreateAdminPayload>(empty)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const create = useMutation({
    mutationFn: (payload: CreateAdminPayload) => createAdmin(payload),
    onSuccess: () => {
      toast.success('تم إنشاء المسؤول')
      qc.invalidateQueries({ queryKey: ['admin', 'admins'] })
      setOpen(false)
      setForm(empty)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const toggleStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'ACTIVE' | 'SUSPENDED' }) =>
      updateAdminStatus(id, status),
    onSuccess: () => {
      toast.success('تم تحديث الحالة')
      qc.invalidateQueries({ queryKey: ['admin', 'admins'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
    onSuccess: () => {
      toast.success('تم الحذف')
      qc.invalidateQueries({ queryKey: ['admin', 'admins'] })
      setConfirmDelete(null)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (isLoading) return <CenteredSpinner />

  return (
    <div>
      <PageHeader
        title="المسؤولون"
        description="إدارة حسابات المسؤولين على المنصة"
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            إضافة مسؤول
          </Button>
        }
      />

      <Table>
        <THead>
          <TR>
            <TH>الاسم</TH>
            <TH>اسم المستخدم</TH>
            <TH>البريد</TH>
            <TH>الحالة</TH>
            <TH className="text-left">إجراءات</TH>
          </TR>
        </THead>
        <TBody>
          {(data ?? []).length === 0 ? (
            <EmptyRow colSpan={5} />
          ) : (
            data!.map((a) => (
              <TR key={a.publicId}>
                <TD className="font-medium">{a.fullName}</TD>
                <TD className="text-muted">@{a.username}</TD>
                <TD className="text-muted text-xs">{a.email}</TD>
                <TD>
                  <Badge tone={a.status === 'ACTIVE' ? 'success' : 'warning'}>
                    {a.status === 'ACTIVE' ? 'نشط' : 'موقوف'}
                  </Badge>
                </TD>
                <TD className="text-left">
                  <div className="flex items-center gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        toggleStatus.mutate({
                          id: a.publicId,
                          status: a.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE',
                        })
                      }
                    >
                      {a.status === 'ACTIVE' ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
                      {a.status === 'ACTIVE' ? 'تعليق' : 'تفعيل'}
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => setConfirmDelete(a.publicId)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>

      {/* Create */}
      <Dialog open={open} onClose={() => setOpen(false)} title="إضافة مسؤول جديد">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (form.password.length < 8) {
              toast.error('كلمة المرور يجب أن تكون 8 أحرف على الأقل')
              return
            }
            create.mutate(form)
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>الاسم الكامل</Label>
              <Input value={form.fullName} onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} />
            </div>
            <div>
              <Label>اسم المستخدم</Label>
              <Input value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} />
            </div>
            <div>
              <Label>البريد الإلكتروني</Label>
              <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Label>كلمة المرور</Label>
              <Input type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
            </div>
          </div>
          <div className="flex justify-start gap-2 pt-2">
            <Button type="submit" loading={create.isPending}>
              إنشاء
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete confirm */}
      <Dialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="تأكيد الحذف"
        description="هذا الإجراء لا يمكن التراجع عنه."
      >
        <Card className="bg-elevated/40 mb-4">
          <CardContent className="p-4 text-sm text-muted">
            سيؤدي هذا إلى حذف المسؤول وجميع سجلات التدقيق المرتبطة به.
          </CardContent>
        </Card>
        <div className="flex justify-start gap-2">
          <Button
            variant="danger"
            onClick={() => confirmDelete && remove.mutate(confirmDelete)}
            loading={remove.isPending}
          >
            حذف نهائي
          </Button>
          <Button variant="outline" onClick={() => setConfirmDelete(null)}>
            إلغاء
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

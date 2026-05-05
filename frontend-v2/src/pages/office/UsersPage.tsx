import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { createUser, deactivateUser, listUsers, type CreateUserPayload } from '@/api/users'
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
import { getApiErrorMessage } from '@/lib/utils'

type RoleChoice = 'employee' | 'manager'

const empty: CreateUserPayload & { roleChoice: RoleChoice } = {
  fullName: '',
  email: '',
  phone: '',
  username: '',
  roleChoice: 'employee',
}

export function OfficeUsersPage() {
  const { user } = useAuth()
  const canManage = user?.role === 'office_owner' || user?.role === 'super_admin'
  const qc = useQueryClient()
  const users = useQuery({ queryKey: ['users'], queryFn: () => listUsers() })
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<CreateUserPayload & { roleChoice: RoleChoice }>(empty)

  const create = useMutation({
    mutationFn: (payload: CreateUserPayload) => createUser(payload),
    onSuccess: () => {
      toast.success('تم إنشاء الموظف. سيتلقى رمز تفعيل عبر البريد.')
      qc.invalidateQueries({ queryKey: ['users'] })
      setOpen(false)
      setForm(empty)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const deactivate = useMutation({
    mutationFn: (id: string) => deactivateUser(id),
    onSuccess: () => {
      toast.success('تم تعليق الحساب')
      qc.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (users.isLoading) return <CenteredSpinner />

  const list = users.data?.data ?? []

  return (
    <div>
      <PageHeader
        title="الموظفون"
        description={canManage ? 'إدارة فريق العمل في المكتب' : 'قائمة فريق العمل في مكتبك'}
        actions={
          canManage && (
            <Button onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              إضافة موظف
            </Button>
          )
        }
      />

      <Table>
        <THead>
          <TR>
            <TH>الاسم</TH>
            <TH>المستخدم</TH>
            <TH>البريد</TH>
            <TH>الهاتف</TH>
            <TH>الحالة</TH>
            {canManage && <TH className="text-left">إجراءات</TH>}
          </TR>
        </THead>
        <TBody>
          {list.length === 0 ? (
            <EmptyRow colSpan={canManage ? 6 : 5} />
          ) : (
            list.map((u) => (
              <TR key={u.publicId}>
                <TD className="font-medium">{u.fullName}</TD>
                <TD className="text-muted">@{u.username}</TD>
                <TD className="text-muted text-xs">{u.email}</TD>
                <TD className="text-muted text-xs">{u.phone || '—'}</TD>
                <TD>
                  <Badge
                    tone={
                      u.status === 'ACTIVE'
                        ? 'success'
                        : u.status === 'PENDING'
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {u.status}
                  </Badge>
                </TD>
                {canManage && (
                  <TD className="text-left">
                    {u.publicId !== user?.sub && (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => deactivate.mutate(u.publicId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TD>
                )}
              </TR>
            ))
          )}
        </TBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} title="إضافة موظف">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            if (!form.fullName || !form.email || !form.username || !form.phone) {
              toast.error('جميع الحقول مطلوبة')
              return
            }
            const { roleChoice, ...payload } = form
            create.mutate({ ...payload, roles: [roleChoice] })
          }}
        >
          <p className="text-xs text-muted bg-elevated/40 border border-border rounded-lg p-3">
            عند إنشاء الموظف بدون كلمة مرور، سيتلقى بريداً لتفعيل حسابه واختيار كلمة المرور بنفسه.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <Label>الجوال</Label>
              <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <Label>الدور</Label>
              <Select
                value={form.roleChoice}
                onChange={(e) => setForm((f) => ({ ...f, roleChoice: e.target.value as RoleChoice }))}
              >
                <option value="employee">موظف — صلاحيات أساسية</option>
                <option value="manager">مدير — نفس صلاحيات مالك المكتب</option>
              </Select>
            </div>
          </div>
          <div className="flex justify-start gap-2 pt-2">
            <Button type="submit" loading={create.isPending}>إنشاء</Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>إلغاء</Button>
          </div>
        </form>
      </Dialog>
    </div>
  )
}

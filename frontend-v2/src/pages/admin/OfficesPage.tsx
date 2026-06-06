import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Power, PowerOff, Search, Trash2 } from 'lucide-react'
import { activateOffice, deactivateOffice, deleteOfficePermanently, getAdminOffices } from '@/api/admins'
import { useAuth } from '@/auth/AuthContext'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Dialog } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDate, getApiErrorMessage } from '@/lib/utils'

export function AdminOfficesPage() {
  const { user } = useAuth()
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'offices'], queryFn: getAdminOffices })
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const activate = useMutation({
    mutationFn: (id: string) => activateOffice(id),
    onSuccess: () => {
      toast.success('تم تفعيل المكتب')
      qc.invalidateQueries({ queryKey: ['admin', 'offices'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const deactivate = useMutation({
    mutationFn: (id: string) => deactivateOffice(id),
    onSuccess: () => {
      toast.success('تم تعليق المكتب')
      qc.invalidateQueries({ queryKey: ['admin', 'offices'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteOfficePermanently(id),
    onSuccess: () => {
      toast.success('تم حذف المكتب نهائياً')
      qc.invalidateQueries({ queryKey: ['admin', 'offices'] })
      setConfirmDelete(null)
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (isLoading) return <CenteredSpinner />

  const canDelete = user?.roles?.includes('super_admin') ?? false
  const offices = (data ?? []).filter((o) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      o.name?.toLowerCase().includes(q) ||
      o.city?.toLowerCase().includes(q) ||
      o.registrationNumber?.toLowerCase().includes(q) ||
      o.owner?.fullName?.toLowerCase().includes(q) ||
      o.owner?.email?.toLowerCase().includes(q)
    )
  })
  const officeToDelete = offices.find((office) => office.publicId === confirmDelete) ?? null

  return (
    <div>
      <PageHeader title="المكاتب" description="إدارة جميع المكاتب المسجلة" />

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <Input
          className="pr-10"
          placeholder="بحث بالاسم أو البريد أو السجل"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <THead>
          <TR>
            <TH>المكتب</TH>
            <TH>المدينة</TH>
            <TH>السجل التجاري</TH>
            <TH>المالك</TH>
            <TH>الموظفون</TH>
            <TH>الحالة</TH>
            <TH>تاريخ الإنشاء</TH>
            <TH className="text-left">إجراءات</TH>
          </TR>
        </THead>
        <TBody>
          {offices.length === 0 ? (
            <EmptyRow colSpan={8} />
          ) : (
            offices.map((office) => (
              <TR key={office.publicId}>
                <TD className="font-medium">{office.name}</TD>
                <TD>{office.city || '—'}</TD>
                <TD className="font-mono text-xs">{office.registrationNumber || '—'}</TD>
                <TD>
                  <div className="text-sm">{office.owner?.fullName || '—'}</div>
                  <div className="text-xs text-muted">{office.owner?.email}</div>
                </TD>
                <TD>{office._count?.users ?? '—'}</TD>
                <TD>
                  <Badge tone={office.status === 'ACTIVE' ? 'success' : 'warning'}>
                    {office.status === 'ACTIVE' ? 'نشط' : 'موقوف'}
                  </Badge>
                </TD>
                <TD className="text-xs text-muted">{formatDate(office.createdAt)}</TD>
                <TD className="text-left">
                  <div className="flex items-center justify-end gap-2">
                    {office.status === 'ACTIVE' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deactivate.mutate(office.publicId)}
                        loading={deactivate.isPending && deactivate.variables === office.publicId}
                      >
                        <PowerOff className="h-4 w-4" />
                        تعليق
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => activate.mutate(office.publicId)}
                        loading={activate.isPending && activate.variables === office.publicId}
                      >
                        <Power className="h-4 w-4" />
                        تفعيل
                      </Button>
                    )}
                    {canDelete ? (
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => setConfirmDelete(office.publicId)}
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف
                      </Button>
                    ) : null}
                  </div>
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>

      <Dialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="حذف المكتب نهائياً"
        description="سيتم حذف المكتب من قاعدة البيانات مع البيانات المرتبطة به."
      >
        <Card className="bg-elevated/40 mb-4">
          <CardContent className="p-4 text-sm text-muted">
            {officeToDelete ? (
              <>
                سيتم حذف مكتب <span className="font-medium text-accent">{officeToDelete.name}</span> مع
                المستخدمين والمشاريع والمهام والسجلات المرتبطة به. لا يمكن التراجع عن هذا الإجراء.
              </>
            ) : (
              'لا يمكن التراجع عن هذا الإجراء.'
            )}
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

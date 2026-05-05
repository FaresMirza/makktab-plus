import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Power, PowerOff, Search } from 'lucide-react'
import { activateOffice, deactivateOffice, getAdminOffices } from '@/api/admins'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDate, getApiErrorMessage } from '@/lib/utils'

export function AdminOfficesPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['admin', 'offices'], queryFn: getAdminOffices })
  const [search, setSearch] = useState('')

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

  if (isLoading) return <CenteredSpinner />

  const offices = (data ?? []).filter((o) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      o.name?.toLowerCase().includes(q) ||
      o.owner?.fullName?.toLowerCase().includes(q) ||
      o.owner?.email?.toLowerCase().includes(q)
    )
  })

  return (
    <div>
      <PageHeader title="المكاتب" description="إدارة جميع المكاتب المسجلة" />

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <Input
          className="pr-10"
          placeholder="بحث بالاسم أو البريد"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <THead>
          <TR>
            <TH>المكتب</TH>
            <TH>المالك</TH>
            <TH>الموظفون</TH>
            <TH>الحالة</TH>
            <TH>تاريخ الإنشاء</TH>
            <TH className="text-left">إجراءات</TH>
          </TR>
        </THead>
        <TBody>
          {offices.length === 0 ? (
            <EmptyRow colSpan={6} />
          ) : (
            offices.map((office) => (
              <TR key={office.publicId}>
                <TD className="font-medium">{office.name}</TD>
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
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}

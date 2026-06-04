import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'
import { decideOfficeRequest, getOfficeRequests } from '@/api/admins'
import { Button } from '@/components/ui/Button'
import { CenteredSpinner } from '@/components/ui/Spinner'
import { PageHeader } from '@/components/ui/PageHeader'
import { Table, THead, TBody, TR, TH, TD, EmptyRow } from '@/components/ui/Table'
import { formatDate, getApiErrorMessage } from '@/lib/utils'

export function AdminPendingOfficesPage() {
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'office-requests'],
    queryFn: getOfficeRequests,
  })

  const decide = useMutation({
    mutationFn: ({ id, approve }: { id: string; approve: boolean }) =>
      decideOfficeRequest(id, approve),
    onSuccess: (_, vars) => {
      toast.success(vars.approve ? 'تمت الموافقة على الطلب' : 'تم رفض الطلب')
      qc.invalidateQueries({ queryKey: ['admin', 'office-requests'] })
      qc.invalidateQueries({ queryKey: ['admin', 'offices'] })
      qc.invalidateQueries({ queryKey: ['admin', 'stats'] })
    },
    onError: (e) => toast.error(getApiErrorMessage(e)),
  })

  if (isLoading) return <CenteredSpinner />

  const list = data ?? []

  return (
    <div>
      <PageHeader title="طلبات تسجيل المكاتب" description="مراجعة الطلبات المعلّقة" />

      <Table>
        <THead>
          <TR>
            <TH>المكتب</TH>
            <TH>المالك</TH>
            <TH>البريد</TH>
            <TH>الجوال</TH>
            <TH>المدينة</TH>
            <TH>السجل التجاري</TH>
            <TH>تاريخ الطلب</TH>
            <TH className="text-left">إجراء</TH>
          </TR>
        </THead>
        <TBody>
          {list.length === 0 ? (
            <EmptyRow colSpan={8} label="لا توجد طلبات معلّقة" />
          ) : (
            list.map((req) => {
              const pending = decide.isPending && decide.variables?.id === req.id
              return (
                <TR key={req.id}>
                  <TD className="font-medium">{req.officeName}</TD>
                  <TD>{req.fullName}</TD>
                  <TD className="text-muted text-xs">{req.email}</TD>
                  <TD className="text-muted text-xs">{req.phone}</TD>
                  <TD>{req.city}</TD>
                  <TD className="font-mono text-xs">{req.registrationNumber}</TD>
                  <TD className="text-xs text-muted">{formatDate(req.createdAt)}</TD>
                  <TD className="text-left">
                    <div className="flex items-center gap-2 justify-end">
                      <Button
                        size="sm"
                        onClick={() => decide.mutate({ id: req.id, approve: true })}
                        loading={pending && decide.variables?.approve === true}
                      >
                        <Check className="h-4 w-4" />
                        موافقة
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => decide.mutate({ id: req.id, approve: false })}
                        loading={pending && decide.variables?.approve === false}
                      >
                        <X className="h-4 w-4" />
                        رفض
                      </Button>
                    </div>
                  </TD>
                </TR>
              )
            })
          )}
        </TBody>
      </Table>
    </div>
  )
}

import { api } from './client'
import type { OfficeAuditLog } from './types'

export const getOfficeAuditLogs = () =>
  api.get<OfficeAuditLog[]>('/audit/office').then((r) => r.data)

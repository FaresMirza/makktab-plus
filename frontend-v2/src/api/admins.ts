import { api, fpHeaders } from './client'
import type {
  AdminAuditLog,
  AdminStats,
  Office,
  OfficeRequest,
  User,
} from './types'

// Offices ──────────────────────────────────────────────────────

export const getAdminOffices = () =>
  api.get<Office[]>('/admins/offices').then((r) => r.data)

export const getAdminOffice = (id: string) =>
  api.get<Office>(`/admins/offices/${id}`).then((r) => r.data)

export const activateOffice = (id: string) =>
  api
    .patch<{ message: string }>(`/admins/offices/${id}/activate`, undefined, {
      headers: fpHeaders(),
    })
    .then((r) => r.data)

export const deactivateOffice = (id: string) =>
  api
    .patch<{ message: string }>(`/admins/offices/${id}/deactivate`, undefined, {
      headers: fpHeaders(),
    })
    .then((r) => r.data)

// Office requests (registration approvals) ─────────────────────

export const getOfficeRequests = () =>
  api.get<OfficeRequest[]>('/admins/office-requests').then((r) => r.data)

export const decideOfficeRequest = (id: string, approve: boolean) =>
  api
    .patch<{ message: string }>(
      `/admins/office-requests/${id}`,
      { approve },
      { headers: fpHeaders() },
    )
    .then((r) => r.data)

// Admin users ──────────────────────────────────────────────────

export const getAdmins = () =>
  api.get<User[]>('/admins', { headers: fpHeaders() }).then((r) => r.data)

export interface CreateAdminPayload {
  email: string
  username: string
  password: string
  fullName: string
}

export const createAdmin = (payload: CreateAdminPayload) =>
  api.post<User>('/admins', payload, { headers: fpHeaders() }).then((r) => r.data)

export const updateAdminStatus = (id: string, status: 'ACTIVE' | 'SUSPENDED') =>
  api
    .patch<User>(`/admins/${id}/status`, { status }, { headers: fpHeaders() })
    .then((r) => r.data)

export const deleteAdmin = (id: string) =>
  api
    .delete<unknown>(`/admins/${id}`, { headers: fpHeaders() })
    .then((r) => r.data)

// Stats + Audit ────────────────────────────────────────────────

export const getAdminStats = () =>
  api.get<AdminStats>('/admins/stats', { headers: fpHeaders() }).then((r) => r.data)

export const getAdminAuditLogs = async (): Promise<AdminAuditLog[]> => {
  try {
    const r = await api.get<AdminAuditLog[]>('/admins/audit')
    return r.data
  } catch (err: any) {
    if (err?.response?.status === 404) return []
    throw err
  }
}

export const getLastAdminAuditLogs = async (): Promise<AdminAuditLog[]> => {
  try {
    const r = await api.get<AdminAuditLog[]>('/admins/audit/last')
    return r.data
  } catch (err: any) {
    if (err?.response?.status === 404) return []
    throw err
  }
}

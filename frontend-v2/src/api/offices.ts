import { api } from './client'
import type { Office, OfficeStatus, Paginated, PaginationParams } from './types'

export interface ListOfficesParams extends PaginationParams {
  status?: OfficeStatus
}

export const listOffices = (params?: ListOfficesParams) =>
  api.get<Paginated<Office>>('/offices', { params }).then((r) => r.data)

export const getOffice = (id: string) =>
  api.get<Office>(`/offices/${id}`).then((r) => r.data)

export const getOfficeStatistics = (id: string) =>
  api.get<Record<string, number>>(`/offices/${id}/statistics`).then((r) => r.data)

export const getOfficesByOwner = (ownerUserId: string) =>
  api.get<Office[]>(`/offices/owner/${ownerUserId}`).then((r) => r.data)

export interface CreateOfficePayload {
  name: string
  ownerUserId: string
  status?: OfficeStatus
}

export const createOffice = (payload: CreateOfficePayload) =>
  api.post<Office>('/offices', payload).then((r) => r.data)

export const updateOffice = (id: string, payload: Partial<CreateOfficePayload>) =>
  api.patch<Office>(`/offices/${id}`, payload).then((r) => r.data)

export const deactivateOffice = (id: string) =>
  api.delete<unknown>(`/offices/${id}`).then((r) => r.data)

export const deleteOfficePermanent = (id: string) =>
  api.delete<unknown>(`/offices/${id}/permanent`).then((r) => r.data)

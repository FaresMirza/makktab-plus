import { api } from './client'
import type { Paginated, PaginationParams, Project, ProjectStatus } from './types'

export interface ListProjectsParams extends PaginationParams {
  status?: ProjectStatus
  projectManagerUserId?: string
}

export const listProjects = (params?: ListProjectsParams) =>
  api.get<Paginated<Project>>('/projects', { params }).then((r) => r.data)

export const getProject = (publicId: string) =>
  api.get<Project>(`/projects/${publicId}`).then((r) => r.data)

export const getProjectStats = (publicId: string) =>
  api.get<Record<string, number>>(`/projects/${publicId}/statistics`).then((r) => r.data)

export interface CreateProjectPayload {
  name: string
  description?: string
  projectManagerUserId: string
  clientName?: string
  budget?: number
  startDate?: string
  endDate?: string
  status?: ProjectStatus
}

export const createProject = (payload: CreateProjectPayload) =>
  api.post<Project>('/projects', payload).then((r) => r.data)

export const updateProject = (publicId: string, payload: Partial<CreateProjectPayload>) =>
  api.patch<Project>(`/projects/${publicId}`, payload).then((r) => r.data)

export const deleteProject = (publicId: string) =>
  api.delete<unknown>(`/projects/${publicId}`).then((r) => r.data)

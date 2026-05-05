import { api } from './client'
import type { Paginated, PaginationParams, Task, TaskStatus } from './types'

export interface ListTasksParams extends PaginationParams {
  projectId?: string
  status?: TaskStatus
  assignedToUserId?: string
  createdByUserId?: string
}

export const listTasks = (params?: ListTasksParams) =>
  api.get<Paginated<Task>>('/tasks', { params }).then((r) => r.data)

export const listOverdueTasks = (params?: PaginationParams) =>
  api.get<Paginated<Task>>('/tasks/overdue', { params }).then((r) => r.data)

export const getTask = (publicId: string) =>
  api.get<Task>(`/tasks/${publicId}`).then((r) => r.data)

export interface CreateTaskPayload {
  title: string
  description?: string
  projectId: string
  createdByUserId: string
  assignedToUserId: string
  status?: TaskStatus
  dueDate?: string
}

export const createTask = (payload: CreateTaskPayload) =>
  api.post<Task>('/tasks', payload).then((r) => r.data)

export interface UpdateTaskPayload {
  title?: string
  description?: string
  assignedToUserId?: string
  status?: TaskStatus
  dueDate?: string
}

export const updateTask = (publicId: string, payload: UpdateTaskPayload) =>
  api.patch<Task>(`/tasks/${publicId}`, payload).then((r) => r.data)

export const cancelTask = (publicId: string) =>
  api.delete<Task>(`/tasks/${publicId}`).then((r) => r.data)

export const deleteTaskPermanent = (publicId: string) =>
  api.delete<unknown>(`/tasks/${publicId}/permanent`).then((r) => r.data)

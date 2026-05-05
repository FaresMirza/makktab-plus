import { api } from './client'
import type { Paginated, PaginationParams, User, UserStatus } from './types'

export interface ListUsersParams extends PaginationParams {
  officeId?: string
  role?: string
  status?: UserStatus
}

export const listUsers = (params?: ListUsersParams) =>
  api.get<Paginated<User>>('/users', { params }).then((r) => r.data)

export const getUser = (publicId: string) =>
  api.get<User>(`/users/${publicId}`).then((r) => r.data)

export const getUserByUsername = (username: string) =>
  api.get<User>(`/users/username/${username}`).then((r) => r.data)

export const getUserByEmail = (email: string) =>
  api.get<User>(`/users/email/${email}`).then((r) => r.data)

export interface CreateUserPayload {
  fullName: string
  email: string
  phone: string
  username: string
  password?: string
  roles?: string[]
  status?: UserStatus
  officeId?: string
}

export const createUser = (payload: CreateUserPayload) =>
  api.post<User>('/users', payload).then((r) => r.data)

export const updateUser = (publicId: string, payload: Partial<CreateUserPayload>) =>
  api.patch<User>(`/users/${publicId}`, payload).then((r) => r.data)

export const changeUserPassword = (
  publicId: string,
  payload: { oldPassword: string; newPassword: string },
) => api.patch<unknown>(`/users/${publicId}/password`, payload).then((r) => r.data)

export const deactivateUser = (publicId: string) =>
  api.delete<User>(`/users/${publicId}`).then((r) => r.data)

export const deleteUserPermanent = (publicId: string) =>
  api.delete<unknown>(`/users/${publicId}/permanent`).then((r) => r.data)

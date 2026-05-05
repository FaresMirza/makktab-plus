import { api } from './client'
import type { ProjectFile } from './types'

export const uploadProjectFile = (projectPublicId: string, file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return api
    .post<ProjectFile>(`/projects/${projectPublicId}/files`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((r) => r.data)
}

export const listProjectFiles = (projectPublicId: string) =>
  api.get<ProjectFile[]>(`/projects/${projectPublicId}/files`).then((r) => r.data)

export const deleteProjectFile = (filePublicId: string) =>
  api.delete<unknown>(`/projects/files/${filePublicId}`).then((r) => r.data)

// Backend DTO/response types — kept aligned with backend Prisma schema and DTOs.

export type UserStatus = 'PENDING' | 'ACTIVE' | 'LOCKED' | 'SUSPENDED' | 'DEACTIVATED'
export type ProjectStatus = 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED'
export type OfficeStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING' | 'DEACTIVATED'

export interface User {
  publicId: string
  fullName: string
  username: string
  email: string
  phone?: string
  status: UserStatus
  roles: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Office {
  publicId: string
  name: string
  city?: string
  registrationNumber?: string
  status: OfficeStatus
  owner?: { publicId: string; fullName: string; username: string; email: string }
  _count?: { users: number; projects?: number }
  createdAt?: string
}

export interface Project {
  publicId: string
  name: string
  description?: string
  clientName?: string
  budget?: number
  status: ProjectStatus
  startDate?: string
  endDate?: string
  projectManager?: { publicId: string; fullName: string }
  createdAt?: string
}

export interface Task {
  publicId: string
  title: string
  description?: string
  status: TaskStatus
  startAt?: string
  endAt?: string
  dueDate?: string
  completedAt?: string
  // Prisma relation names → these are what the backend actually returns.
  assignedTo?: { publicId: string; fullName: string }
  createdBy?: { publicId: string; fullName: string }
  project?: { publicId: string; name: string }
  // Internal id-style fields (rarely used; available when the BE include
  // selected the FK columns directly).
  assignedToUserId?: string
  createdByUserId?: string
  projectId?: string
  createdAt?: string
}

export interface ProjectFile {
  publicId: string
  fileName: string
  fileSize: number
  fileUrl: string
  uploadedBy?: { publicId: string; fullName: string }
  createdAt: string
}

export interface OfficeRequest {
  id: string
  officeName: string
  fullName: string
  username: string
  email: string
  phone: string
  city: string
  registrationNumber: string
  createdAt: string
}

export interface AdminAuditLog {
  id: string
  action: string
  ip?: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
  admin?: { username: string; fullName?: string }
  targetOffice?: { name: string }
}

export interface AdminStats {
  activeOfficesCount: number
  totalOfficesCount: number
  totalAdminsCount: number
  totalUsersCount: number
  pendingApprovalsCount?: number
  recentLogs: AdminAuditLog[]
}

// JWT payload shape (decoded `sub` is the user's publicId)
export interface JwtPayload {
  sub: string
  username: string
  fullName?: string
  roles: string[]
  status?: string
  iat?: number
  exp?: number
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
}

// Generic helpers ------------------------------------------------

export interface MessageResponse {
  message: string
}

// Backend never returns the OTP itself — delivery is via email only.
export type OtpResponse = MessageResponse

// Pagination — matches backend's makePaginated response.
export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface Paginated<T> {
  data: T[]
  meta: PaginationMeta
}

export interface PaginationParams {
  page?: number
  limit?: number
}

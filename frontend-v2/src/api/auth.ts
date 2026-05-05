import { api, fpHeaders } from './client'
import type { AuthTokens, MessageResponse, OtpResponse } from './types'

// ── Registration ───────────────────────────────────────────────

export interface RegisterPayload {
  officeName: string
  ownerFullName: string
  username: string
  email: string
  phone: string
  city: string
  password: string
}

export const register = (payload: RegisterPayload) =>
  api.post<OtpResponse>('/auth/register', payload).then((r) => r.data)

export const verifyRegistration = (payload: { email: string; otp: string }) =>
  api
    .post<MessageResponse>('/auth/register/verify', payload, { headers: fpHeaders() })
    .then((r) => r.data)

// ── Login (2FA) ────────────────────────────────────────────────

export const login = (payload: { username: string; password: string }) =>
  api.post<OtpResponse>('/auth/login', payload).then((r) => r.data)

export const verifyLogin = (payload: { username: string; password: string; otp: string }) =>
  api
    .post<AuthTokens>('/auth/login/verify', payload, { headers: fpHeaders() })
    .then((r) => r.data)

// ── Forgot password ────────────────────────────────────────────

export const forgotPassword = (usernameOrEmail: string) =>
  api.post<OtpResponse>('/auth/forgot-password', { username: usernameOrEmail }).then((r) => r.data)

export const verifyForgotPassword = (payload: {
  username: string
  otp: string
  newPassword: string
  confirmPassword: string
}) =>
  api
    .post<MessageResponse>('/auth/forgot-password/verify', payload, { headers: fpHeaders() })
    .then((r) => r.data)

// ── First-login activation (link-based) ────────────────────────

export interface ActivateAccountPayload {
  userPublicId: string
  token: string
  newPassword: string
}

export const activateAccount = (payload: ActivateAccountPayload) =>
  api
    .post<MessageResponse>('/auth/activate', payload, { headers: fpHeaders() })
    .then((r) => r.data)

// Legacy OTP-based first-login (kept for the backend's FIRST_LOGIN OTP
// purpose, but the standard activation flow now uses /auth/activate).
export const resendFirstLoginOtp = (usernameOrEmail: string) =>
  api
    .post<OtpResponse>('/auth/first-login/resend', { username: usernameOrEmail })
    .then((r) => r.data)

export const verifyFirstLogin = (payload: {
  username: string
  otp: string
  newPassword: string
  confirmPassword: string
}) =>
  api
    .post<MessageResponse>('/auth/first-login/verify', payload, { headers: fpHeaders() })
    .then((r) => r.data)

// ── Authenticated password reset ───────────────────────────────

export const resetPassword = (newPassword: string) =>
  api
    .post<MessageResponse>('/auth/reset-password', { newPassword }, { headers: fpHeaders() })
    .then((r) => r.data)

// ── Refresh access token ───────────────────────────────────────

export const refreshAccessToken = (refreshToken: string) =>
  api.post<{ access_token: string }>('/auth/refresh', { refreshToken }).then((r) => r.data)

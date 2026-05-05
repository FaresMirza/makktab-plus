import axios, { type AxiosInstance } from 'axios'

const API_BASE_URL = 'https://api.makktabplus.online'

const TOKEN_KEY = 'mk_token'
const REFRESH_KEY = 'mk_refresh'
const USER_KEY = 'mk_user'
const FP_KEY = 'mk_fp'

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),
  getUserJSON: () => localStorage.getItem(USER_KEY),
  setUserJSON: (json: string) => localStorage.setItem(USER_KEY, json),
  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(USER_KEY)
  },
}

export function getDeviceFingerprint(): string {
  let fp = localStorage.getItem(FP_KEY)
  if (!fp) {
    fp =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36)
    localStorage.setItem(FP_KEY, fp)
  }
  return fp
}

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

// Header helper for endpoints that audit by device fingerprint
export const fpHeaders = () => ({ 'x-device-fingerprint': getDeviceFingerprint() })

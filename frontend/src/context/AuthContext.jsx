import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { loginApi, verifyLoginApi } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Helper to decode JWT without external libraries
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch (e) {
    console.error('Error decoding JWT', e)
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  
  // Initialize state from localStorage
  const getInitialUser = () => {
    const storedUser = localStorage.getItem('currentUser')
    return storedUser ? JSON.parse(storedUser) : null
  }

  const [currentUser, setCurrentUser] = useState(getInitialUser)
  const [loading, setLoading] = useState(false)
  const [tempCredentials, setTempCredentials] = useState(null)

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await loginApi(username, password)
      setTempCredentials({ username, password })
      // Return response so UI knows it was successful and can show the OTP step
      return response
    } catch (error) {
      throw new Error(error.response?.data?.message || 'اسم المستخدم أو كلمة المرور غير صحيحة')
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (otpInput) => {
    setLoading(true)
    try {
      if (!tempCredentials) {
        throw new Error('No credentials found. Please login again.')
      }

      // Handle case where UI passes an object like { username, otp } or standalone string/array
      let extractedOtp = otpInput
      if (typeof otpInput === 'object' && otpInput !== null && 'otp' in otpInput) {
        extractedOtp = otpInput.otp
      }

      // Strictly ensure it's a string
      const formattedOtp = Array.isArray(extractedOtp) 
        ? extractedOtp.join('') 
        : String(extractedOtp)

      const response = await verifyLoginApi(
        tempCredentials.username,
        tempCredentials.password,
        formattedOtp
      )
      
      const token = response.data?.access_token || response.access_token
      const refreshToken = response.data?.refresh_token || response.refresh_token

      if (!token) {
        throw new Error('لم يتم استلام رمز التحقق من الخادم (Access Token missing)')
      }

      // Decode the JWT token to extract roles and user info
      const decodedUser = decodeJWT(token)
      console.log('Decoded Token:', decodedUser)
      
      if (!decodedUser) {
        throw new Error('حدث مشكلة أثناء فك تشفير بيانات المستخدم')
      }

      // Determine the primary role
      const rawRole = Array.isArray(decodedUser.roles) 
        ? decodedUser.roles[0] 
        : decodedUser.role || 'employee'

      // Map backend internal roles to frontend UI roles
      let mappedRole = rawRole
      if (rawRole === 'admin') {
        mappedRole = 'super_admin'
      } else if (rawRole === 'owner') {
        mappedRole = 'office_owner'
      }

      // Check if sub is a UUID to prevent displaying UUIDs as usernames
      const isUUID = (str) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
      
      const tokenUsername = 
        decodedUser.username || 
        decodedUser.preferred_username || 
        decodedUser.name || 
        (decodedUser.sub && !isUUID(decodedUser.sub) ? decodedUser.sub : null);

      const userData = {
        ...decodedUser,
        // Override with explicit human-readable variables provided by the new JWT
        username: decodedUser.username || tempCredentials.username || tokenUsername || 'Super Admin',
        fullName: decodedUser.fullName || decodedUser.name || null,
        role: mappedRole,
        status: decodedUser.status || 'Active' // Ensure status is set to bypass ProtectedRoute checks
      }

      console.log('Set User State:', { username: userData.username, role: userData.role, status: userData.status })

      // Store tokens and user in context & storage
      // Must be 'token' to match our logic and App.jsx logic
      localStorage.setItem('token', token)
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken)
      }
      
      setCurrentUser(userData)
      localStorage.setItem('currentUser', JSON.stringify(userData))
      setTempCredentials(null) // clear temporary credentials

      // Redirect based on role logic
      if (mappedRole === 'super_admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/office/dashboard')
      }

      return userData
    } catch (error) {
      throw new Error(error.response?.data?.message || 'رمز التحقق غير صحيح')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setCurrentUser(null)
    setTempCredentials(null)
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('pendingUser')
    navigate('/login')
  }

  const isAuthenticated = () => {
    return currentUser !== null && localStorage.getItem('token') !== null
  }

  const hasRole = (roles) => {
    if (!currentUser) return false
    return roles.includes(currentUser.role)
  }

  const value = {
    currentUser,
    login,
    verifyOTP,
    logout,
    isAuthenticated,
    hasRole,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

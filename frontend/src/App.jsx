import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'
import ActivatePage from './pages/auth/ActivatePage'
import OfficeRegisterPage from './pages/auth/OfficeRegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'

// Super Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import OfficesManagementPage from './pages/admin/OfficesManagementPage'
import PendingOfficesPage from './pages/admin/PendingOfficesPage'
import SecurityLogsPage from './pages/admin/SecurityLogsPage'
import AddAdminPage from './pages/admin/AddAdminPage'
import AdminsListPage from './pages/admin/AdminsListPage'

// Office Pages
import DashboardPage from './pages/office/DashboardPage'
import UserManagementPage from './pages/office/UserManagementPage'
import ProjectsPage from './pages/office/ProjectsPage'
import ProjectDetailsPage from './pages/office/ProjectDetailsPage'
import MyTasksPage from './pages/office/MyTasksPage'
import AnnouncementsPage from './pages/office/AnnouncementsPage'

// Test Pages (Development Only)
import TestActivationLinks from './pages/test/TestActivationLinks'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<OfficeRegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/activate" element={<ActivatePage />} />
      
      {/* Test Routes (Development Only) */}
      <Route path="/test/activation" element={<TestActivationLinks />} />

      {/* Super Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/offices"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <OfficesManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/pending-offices"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <PendingOfficesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/logs"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <SecurityLogsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/add-admin"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <AddAdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/admins-list"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <AdminsListPage />
          </ProtectedRoute>
        }
      />

      {/* Office Routes */}
      <Route
        path="/office/dashboard"
        element={
          <ProtectedRoute allowedRoles={['office_owner', 'manager', 'employee']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/office/users"
        element={
          <ProtectedRoute allowedRoles={['office_owner', 'manager']}>
            <UserManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/office/projects"
        element={
          <ProtectedRoute allowedRoles={['office_owner', 'manager', 'employee']}>
            <ProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/office/projects/:id"
        element={
          <ProtectedRoute allowedRoles={['office_owner', 'manager', 'employee']}>
            <ProjectDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/office/my-tasks"
        element={
          <ProtectedRoute allowedRoles={['office_owner', 'manager', 'employee']}>
            <MyTasksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/office/announcements"
        element={
          <ProtectedRoute allowedRoles={['office_owner', 'manager', 'employee']}>
            <AnnouncementsPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
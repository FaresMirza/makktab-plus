import { Navigate, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { AppShell } from '@/components/layout/AppShell'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { ActivatePage } from '@/pages/auth/ActivatePage'
import { AdminDashboardPage } from '@/pages/admin/DashboardPage'
import { AdminOfficesPage } from '@/pages/admin/OfficesPage'
import { AdminPendingOfficesPage } from '@/pages/admin/PendingOfficesPage'
import { AdminAdminsPage } from '@/pages/admin/AdminsPage'
import { AdminAuditPage } from '@/pages/admin/AuditPage'
import { OfficeDashboardPage } from '@/pages/office/DashboardPage'
import { OfficeProjectsPage } from '@/pages/office/ProjectsPage'
import { OfficeProjectDetailPage } from '@/pages/office/ProjectDetailPage'
import { OfficeTasksPage } from '@/pages/office/MyTasksPage'
import { OfficeUsersPage } from '@/pages/office/UsersPage'
import { ChangePasswordPage } from '@/pages/office/ChangePasswordPage'
import { useAuth } from '@/auth/AuthContext'

export function App() {
  const { user } = useAuth()

  return (
    <Routes>
      {/* Public auth routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/activate" element={<ActivatePage />} />

      {/* Admin */}
      <Route element={<ProtectedRoute allow={['super_admin']} />}>
        <Route path="/admin" element={<AppShell />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="offices" element={<AdminOfficesPage />} />
          <Route path="pending" element={<AdminPendingOfficesPage />} />
          <Route path="admins" element={<AdminAdminsPage />} />
          <Route path="audit" element={<AdminAuditPage />} />
        </Route>
      </Route>

      {/* Office */}
      <Route element={<ProtectedRoute allow={['office_owner', 'employee']} />}>
        <Route path="/office" element={<AppShell />}>
          <Route index element={<OfficeDashboardPage />} />
          <Route path="projects" element={<OfficeProjectsPage />} />
          <Route path="projects/:publicId" element={<OfficeProjectDetailPage />} />
          <Route path="tasks" element={<OfficeTasksPage />} />
          <Route path="users" element={<OfficeUsersPage />} />
          <Route path="password" element={<ChangePasswordPage />} />
        </Route>
      </Route>

      {/* Root redirect */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={user.role === 'super_admin' ? '/admin' : '/office'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

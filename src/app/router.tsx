import { createBrowserRouter } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/DashboardPage'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import { AppLayout } from '../components/layout/AppLayout'
// import UserManagementPage from '../pages/admin/UserManagementPage'
import AdminUsersPage from '../pages/admin/AdminUserPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },

          {
            path: '/admin/users',
            element: <AdminUsersPage />,
        },
        ],
      },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
])
import { createBrowserRouter } from 'react-router-dom'

import AuthLayout from '../layouts/AuthLayout'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'
import DashboardPage from '../pages/DashboardPage'
import ProtectedRoute from '../components/auth/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
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
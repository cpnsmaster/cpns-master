import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

function ProtectedRoute() {
  const {
    user,
    isLoading,
  } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-white">
        <p className="text-neutral-400">
          Memeriksa sesi...
        </p>
      </div>
    )
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
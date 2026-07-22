import {
  BookOpen,
  Brain,
  LayoutDashboard,
  Settings,
  // ShieldCheck,
  Users,
  X,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'
import { useRole } from '../../hooks/useRole'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const {
    isAdmin,
    isSuperAdmin,
  } = useRole()

  const userMenu = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Materi',
      path: '/materi',
      icon: BookOpen,
    },
    {
      label: 'Latihan Soal',
      path: '/latihan',
      icon: Brain,
    },
  ]

  const adminMenu = [
    {
      label: 'User Management',
      path: '/admin/users',
      icon: Users,
    },
    {
      label: 'Question Management',
      path: '/admin/questions',
      icon: Brain,
    },
  ]

  const superAdminMenu = [
    {
      label: 'System Settings',
      path: '/super-admin/settings',
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
                    fixed inset-y-0 left-0 z-50
                    flex w-72 flex-col
                    border-r border-neutral-800
                    bg-neutral-950
                    transition-transform duration-300
                    lg:translate-x-0
                    ${isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          }
                `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-neutral-800 px-6">
          <div>
            <h1 className="text-xl font-black text-white">
              CPNS
              <span className="text-yellow-400">
                MASTER
              </span>
            </h1>

            <p className="mt-1 text-xs text-neutral-500">
              Belajar lebih terarah
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-8 overflow-y-auto p-4">
          {/* User Menu */}
          <div>
            <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
              Belajar
            </p>

            <div className="space-y-1">
              {userMenu.map((item) => {
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                                            flex items-center gap-3
                                            rounded-xl px-3 py-3
                                            text-sm font-medium
                                            transition
                                            ${isActive
                        ? 'bg-yellow-400 text-neutral-950'
                        : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }
                                            `
                    }
                  >
                    <Icon className="h-5 w-5" />

                    {item.label}
                  </NavLink>
                )
              })}
            </div>
          </div>

          {/* Admin Menu */}
          {isAdmin && (
            <div>
              <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Administrasi
              </p>

              <div className="space-y-1">
                {adminMenu.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                                                flex items-center gap-3
                                                rounded-xl px-3 py-3
                                                text-sm font-medium
                                                transition
                                                ${isActive
                          ? 'bg-yellow-400 text-neutral-950'
                          : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                        }
                                                `
                      }
                    >
                      <Icon className="h-5 w-5" />

                      {item.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          )}

          {/* Super Admin Menu */}
          {isSuperAdmin && (
            <div>
              <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-neutral-500">
                Super Admin
              </p>

              <div className="space-y-1">
                {superAdminMenu.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `
                                                flex items-center gap-3
                                                rounded-xl px-3 py-3
                                                text-sm font-medium
                                                transition
                                                ${isActive
                          ? 'bg-yellow-400 text-neutral-950'
                          : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                        }
                                                `
                      }
                    >
                      <Icon className="h-5 w-5" />

                      {item.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}
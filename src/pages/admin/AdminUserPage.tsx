import { useState } from 'react'

import {
  MoreHorizontal,
  ShieldCheck,
  UserX,
  UserCheck,
  KeyRound,
  Trash2,
} from 'lucide-react'

import {
  createUserByAdmin,
  manageUser,
} from '../../services/adminUserService'

import {
  useAdminUsers,
} from '../../hooks/useAdminUsers'

function AdminUsersPage() {
  const [
    fullName,
    setFullName,
  ] = useState('')

  const [
    email,
    setEmail,
  ] = useState('')

  const [
    password,
    setPassword,
  ] = useState('')

  const [
    role,
    setRole,
  ] = useState<'user' | 'admin'>(
    'user',
  )

  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false)

  const [
    openActionUserId,
    setOpenActionUserId,
  ] = useState<string | null>(null)

  const {
    data: users = [],
    isLoading:
    isUsersLoading,
    isError:
    isUsersError,
    refetch,
  } =
    useAdminUsers()

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault()

    try {
      setIsLoading(true)

      const result =
        await createUserByAdmin({
          full_name:
            fullName,
          email,
          password,
          role,
        })

      console.log(
        'User berhasil dibuat:',
        result,
      )

      alert(
        'User berhasil dibuat',
      )

      setFullName('')
      setEmail('')
      setPassword('')
      setRole('user')

      setIsCreateModalOpen(false)

      // Refresh daftar user
      await refetch()
    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : 'Gagal membuat user',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateRole(
    userId: string,
    currentRole:
      | 'user'
      | 'admin'
      | 'super_admin',
  ) {
    // Super admin tidak boleh diubah dari UI
    if (
      currentRole ===
      'super_admin'
    ) {
      alert(
        'Role super admin tidak dapat diubah melalui aplikasi.',
      )

      return
    }

    const newRole =
      currentRole === 'user'
        ? 'admin'
        : 'user'

    const confirmed =
      window.confirm(
        `Ubah role user menjadi ${newRole}?`,
      )

    if (!confirmed) {
      return
    }

    try {
      await manageUser({
        action:
          'update_role',

        user_id:
          userId,

        role:
          newRole,
      })

      alert(
        'Role berhasil diubah',
      )

      setOpenActionUserId(null)

      await refetch()

    } catch (error) {
      console.error(error)

      alert(
        error instanceof Error
          ? error.message
          : 'Gagal mengubah role',
      )
    }
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div>
          <h1 className="text-3xl font-black">
            Manajemen User
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Kelola pengguna dan hak akses aplikasi.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setIsCreateModalOpen(true)
          }
          className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-yellow-300"
        >
          + Tambah User
        </button>

      </div>


      {/* USER LIST */}
      <section>

        {/* HEADER TABLE */}
        <div className="mb-4 flex items-end justify-between">

          <div>
            <h2 className="text-xl font-bold">
              Daftar User
            </h2>

            <p className="mt-1 text-sm text-neutral-400">
              Total user: {users.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 transition hover:bg-neutral-800"
          >
            Refresh
          </button>

        </div>


        {/* TABLE */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-neutral-900">

                <tr>

                  <th className="px-6 py-4 text-sm font-medium text-neutral-400">
                    Nama
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-neutral-400">
                    Email
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-neutral-400">
                    Role
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-neutral-400">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-neutral-400">
                    Dibuat
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-medium text-neutral-400">
                    Aksi
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.map((user) => (

                  <tr
                    key={user.id}
                    className="border-t border-neutral-800 transition hover:bg-neutral-900/50"
                  >

                    <td className="px-6 py-4 font-medium">
                      {user.full_name ?? '-'}
                    </td>

                    <td className="px-6 py-4 text-neutral-400">
                      {user.email ?? '-'}
                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-neutral-800 px-3 py-1 text-xs">
                        {user.role}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <span className="rounded-full bg-green-400/10 px-3 py-1 text-xs text-green-400">
                        {user.status}
                      </span>

                    </td>

                    <td className="px-6 py-4 text-sm text-neutral-400">
                      {new Date(
                        user.created_at,
                      ).toLocaleDateString(
                        'id-ID',
                      )}
                    </td>

                    <td className="px-6 py-4 text-right">

                      <div className="relative inline-block">

                        <button
                          type="button"
                          onClick={() =>
                            setOpenActionUserId(
                              openActionUserId === user.id
                                ? null
                                : user.id,
                            )
                          }
                          className="rounded-lg border border-neutral-700 p-2 text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>


                        {openActionUserId === user.id && (

                          <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-1 shadow-2xl">

                            {/* UBAH ROLE */}

                            {user.role !== 'super_admin' && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateRole(
                                    user.id,
                                    user.role,
                                  )
                                }
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                              >
                                <ShieldCheck className="h-4 w-4" />

                                Ubah Role
                              </button>
                            )}

                            {/* SUSPEND / AKTIFKAN */}

                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  'Ubah status:',
                                  user.id,
                                )

                                setOpenActionUserId(null)
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                            >

                              {user.status === 'active' ? (
                                <UserX className="h-4 w-4" />
                              ) : (
                                <UserCheck className="h-4 w-4" />
                              )}

                              {user.status === 'active'
                                ? 'Suspend User'
                                : 'Aktifkan User'}

                            </button>


                            {/* RESET PASSWORD */}

                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  'Reset password:',
                                  user.id,
                                )

                                setOpenActionUserId(null)
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                            >

                              <KeyRound className="h-4 w-4" />

                              Reset Password

                            </button>


                            <div className="my-1 border-t border-neutral-800" />


                            {/* HAPUS USER */}

                            <button
                              type="button"
                              onClick={() => {
                                console.log(
                                  'Hapus user:',
                                  user.id,
                                )

                                setOpenActionUserId(null)
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-400/10"
                            >

                              <Trash2 className="h-4 w-4" />

                              Hapus User

                            </button>

                          </div>

                        )}

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>


      {/* MODAL CREATE USER */}

      {isCreateModalOpen && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() =>
            setIsCreateModalOpen(false)
          }
        >

          <div
            className="w-full max-w-xl rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="mb-6 flex items-start justify-between">

              <div>

                <h2 className="text-xl font-bold">
                  Buat User Baru
                </h2>

                <p className="mt-1 text-sm text-neutral-400">
                  Tambahkan pengguna baru ke aplikasi.
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setIsCreateModalOpen(false)
                }
                className="text-xl text-neutral-500 transition hover:text-white"
              >
                ×
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* NAMA */}

              <div>

                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Nama Lengkap
                </label>

                <input
                  type="text"
                  placeholder="Contoh: John Doe"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                  required
                />

              </div>


              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="user@email.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                  required
                />

              </div>


              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
                  required
                />

              </div>


              {/* ROLE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-neutral-300">
                  Role
                </label>

                <select
                  value={role}
                  onChange={(event) =>
                    setRole(
                      event.target.value as
                      | 'user'
                      | 'admin',
                    )
                  }
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
                >

                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>

                </select>

              </div>


              {/* ACTION */}

              <div className="flex justify-end gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setIsCreateModalOpen(false)
                  }
                  className="rounded-lg border border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-800"
                >
                  Batal
                </button>


                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-yellow-400 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-yellow-300 disabled:opacity-50"
                >
                  {isLoading
                    ? 'Membuat user...'
                    : 'Buat User'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default AdminUsersPage
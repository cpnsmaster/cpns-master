import {
    Search,
    UserPlus,
} from 'lucide-react'

import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

function UserManagementPage() {
    return (
        <div className="p-6 lg:p-10">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-black">
                        Manajemen User
                    </h1>

                    <p className="mt-2 text-neutral-400">
                        Kelola pengguna dan hak akses aplikasi.
                    </p>
                </div>

                <Button
                    type="button"
                    className="flex items-center gap-2"
                >
                    <UserPlus className="h-4 w-4" />
                    Tambah User
                </Button>
            </div>

            {/* Search */}
            <Card
                variant="outlined"
                className="mt-8 p-4"
            >
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                    <input
                        type="text"
                        placeholder="Cari nama atau email user..."
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-900 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-yellow-400"
                    />
                </div>
            </Card>

            {/* Table */}
            <Card
                variant="outlined"
                className="mt-6 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-neutral-800 bg-neutral-900">
                            <tr>
                                <th className="px-6 py-4 font-medium text-neutral-400">
                                    Nama
                                </th>

                                <th className="px-6 py-4 font-medium text-neutral-400">
                                    Role
                                </th>

                                <th className="px-6 py-4 font-medium text-neutral-400">
                                    Status
                                </th>

                                <th className="px-6 py-4 font-medium text-neutral-400">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b border-neutral-800">
                                <td
                                    colSpan={4}
                                    className="px-6 py-10 text-center text-neutral-500"
                                >
                                    Belum ada data user
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    )
}

export default UserManagementPage
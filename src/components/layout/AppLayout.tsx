import {
    Menu,
} from 'lucide-react'

import {
    Outlet,
    useNavigate,
} from 'react-router-dom'

import {
    useState,
} from 'react'

import {
    Sidebar,
} from './Sidebar'

import {
    Button,
} from '../ui/Button'

import {
    useAuth,
} from '../../contexts/AuthContext'

import {
    useMyProfile,
} from '../../hooks/useMyProfile'


export function AppLayout() {
    const [
        isSidebarOpen,
        setIsSidebarOpen,
    ] = useState(false)

    const navigate = useNavigate()

    const {
        user,
        logout,
    } = useAuth()

    const {
        data: profile,
        isLoading: isProfileLoading,
    } = useMyProfile()


    async function handleLogout() {
        try {
            await logout()

            navigate('/login')
        } catch (error) {
            console.error(
                'Logout failed:',
                error,
            )
        }
    }


    const displayName =
        profile?.full_name ??
        user?.email ??
        'User'


    const avatarInitial =
        displayName
            .charAt(0)
            .toUpperCase()


    return (
        <div className="min-h-screen bg-neutral-950 text-white">

            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() =>
                    setIsSidebarOpen(false)
                }
            />


            <div className="lg:pl-72">

                {/* Topbar */}
                <header className="flex h-16 items-center justify-between border-b border-neutral-800 px-4 sm:px-6 lg:px-8">

                    {/* Mobile Header */}
                    <div className="flex items-center">

                        <button
                            type="button"
                            onClick={() =>
                                setIsSidebarOpen(true)
                            }
                            className="mr-4 text-neutral-400 hover:text-white lg:hidden"
                        >
                            <Menu className="h-6 w-6" />
                        </button>

                        <div className="lg:hidden">
                            <h1 className="font-bold">
                                CPNS
                                <span className="text-yellow-400">
                                    MASTER
                                </span>
                            </h1>
                        </div>

                        {/* Desktop Page Header */}
                        <div className="hidden lg:block">
                            <p className="text-sm text-neutral-400">
                                Selamat datang kembali 👋
                            </p>
                        </div>

                    </div>


                    {/* User Info */}
                    <div className="flex items-center gap-4">

                        <div className="hidden text-right sm:block">

                            <p className="text-sm font-medium text-white">
                                {isProfileLoading
                                    ? 'Memuat...'
                                    : displayName}
                            </p>

                            <p className="text-xs text-neutral-500">
                                {user?.email}
                            </p>

                        </div>


                        {/* Avatar */}
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400 font-bold text-neutral-950">
                            {avatarInitial}
                        </div>


                        {/* Logout */}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>

                    </div>

                </header>


                {/* Page Content */}
                <main>
                    <Outlet />
                </main>

            </div>

        </div>
    )
}
import { useMyProfile } from './useMyProfile'

export function useRole() {
    const {
        data: profile,
        isLoading,
    } = useMyProfile()

    return {
        role: profile?.role ?? null,

        status: profile?.status ?? null,

        isLoading,

        isUser:
            profile?.role === 'user',

        isAdmin:
            profile?.role === 'admin' ||
            profile?.role === 'super_admin',

        isSuperAdmin:
            profile?.role === 'super_admin',

        isActive:
            profile?.status === 'active',
    }
}
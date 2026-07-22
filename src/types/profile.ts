export type UserRole =
    | 'user'
    | 'admin'
    | 'super_admin'

export type UserStatus =
    | 'active'
    | 'inactive'
    | 'suspended'

export interface Profile {
    id: string
    full_name: string | null
    avatar_url: string | null
    role: UserRole
    target_exam: string | null
    status: UserStatus
    created_at: string
    updated_at: string
}
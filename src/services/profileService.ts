import { supabase } from '../lib/supabase'

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

export async function getMyProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User belum login')
  }

  const {
    data,
    error,
  } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    throw error
  }

  return data as Profile
}
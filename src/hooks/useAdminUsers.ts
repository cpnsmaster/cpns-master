import { useQuery } from '@tanstack/react-query'

import {
  getAllUsers,
} from '../services/adminUserService'

export function useAdminUsers() {
  return useQuery({
    queryKey: [
      'admin-users',
    ],
    queryFn:
      getAllUsers,
  })
}
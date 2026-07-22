import { useQuery } from '@tanstack/react-query'

import { getMyProfile } from '../services/profileService'

export function useMyProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: getMyProfile,
  })
}
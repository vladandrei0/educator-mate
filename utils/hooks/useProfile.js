import { useQuery } from 'react-query'
import { client } from '../api-client'

export function useProfile(userId) {
   return useQuery(
      ['profile', userId],
      () => client(`/api/getuser?fbuid=${userId}`),
      {
         refetchOnWindowFocus: false,
         refetchOnMount: false,
         enabled: !!userId
      }
   )
}
import { useQuery } from 'react-query'
import { client } from '../api-client'

export function useLikes(userId) {
   return useQuery(
      ['liked', userId],
      () => client(`/api/getLiked?query=${encodeURIComponent(userId)}`),
      {
         enabled: !!userId,
         refetchOnWindowFocus: false
      }
   )
}

export function useThemeLikes(userId) {
   return useQuery(
      ['likedthemes', userId],
      () => client(`/api/getLikedThemes?query=${encodeURIComponent(userId)}`),
      {
         enabled: !!userId,
         refetchOnWindowFocus: false
      }
   )
}

export function useLikedFise(userId) {
   return useQuery(
      ['likedfise', userId],
      () => client(`/api/getLikedFise?query=${encodeURIComponent(userId)}`),
      {
         enabled: !!userId,
         refetchOnWindowFocus: false,
      }
   )
}
export function useLikedThemes(userId) {
   return useQuery(
      ['likedtemecucontent', userId],
      () => client(`/api/getLikedThemeswithcontent?query=${encodeURIComponent(userId)}`),
      {
         enabled: !!userId,
         refetchOnWindowFocus: false,
         initialData: []
      }
   )
}


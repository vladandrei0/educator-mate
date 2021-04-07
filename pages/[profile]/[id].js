import React, { useContext } from 'react'
import Profile from '../../components/Profile'
import { FirebaseContext } from '../../components/Firebase'
import { useProfile } from '../../utils/hooks/useProfile'
import Loading from '../../components/Loading'

function ProfilePage() {

   const { user, isLoading } = useContext(FirebaseContext)
   const userId = user?.id

   const { data: profile, status } = useProfile(userId)

   if (isLoading || status === 'loading') {
      return <Loading />
   }
   if (!user) {
      return (
         <p>no user...</p>
      )
   }
   return (
      <Profile profile={profile} />
   )
}

export default ProfilePage


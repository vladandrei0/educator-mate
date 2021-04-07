import React, { useContext } from 'react'
import { FirebaseContext } from '../../components/Firebase'
import FiseLiked from '../../components/screens/FiseLiked'
import Container from '@material-ui/core/Container';
import { useLikedFise } from '../../utils/hooks/useLikes'
import Loading from '../../components/Loading'

export default function FiseUser() {

   const { user, isLoading } = useContext(FirebaseContext)
   const userId = user?.profile.id

   const { data: datafise, status } = useLikedFise(userId)
   const likedFise = datafise?.map(el => el.Fisa)

   if (isLoading) {
      return <Loading/>
   }
   if (!user) {
      return <p>no user...</p>
   }
   return (
      <Container>
         <FiseLiked userId={userId} likedFise={likedFise} status={status} />
      </Container>
   )
}

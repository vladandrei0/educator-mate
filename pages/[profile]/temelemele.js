import React, { useContext } from 'react'
import { FirebaseContext } from '../../components/Firebase'
import TemeLiked from '../../components/screens/Temeliked'
import Container from '@material-ui/core/Container';
import Loading from '../../components/Loading';

export default function TemeUser() {
   const { user, isLoading } = useContext(FirebaseContext)
   const userId = user?.profile.id

   if (isLoading) {
      return <Loading />
   }
   if (!user) {
      return <p>no user...</p>
   }

   return (
      <Container >
         <TemeLiked userId={userId} />
      </Container>
   )

}

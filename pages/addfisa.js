import React, { useContext } from 'react'
import { FirebaseContext } from '../components/Firebase'
import AddFisaForm from '../components/AddFisaForm'
import Loading from '../components/Loading';

export default function AddFisa() {
   const { user, isLoading } = useContext(FirebaseContext);
   // console.log('user', user)
   const isAdmin = user?.profile.role === 'ADMIN'

   if (isLoading) {
      return <Loading />
   }
   if (user && isAdmin) {
      return (
         <div>
            <AddFisaForm />
         </div>
      )
   } else {
      return (
         <div>
            nu ai ce cauta aici
         </div>
      )

   }

}

import React from 'react'
import { useLikedThemes } from '../../utils/hooks/useLikes'
import RenderThemes from '../RenderThemes'
import Container from '@material-ui/core/Container';
import Loading from '../Loading';



export default function Temeliked({ userId }) {
   const { data: datateme, isLoading } = useLikedThemes(userId)
   const likedTeme = datateme?.map(el => el.Teme)

   if (isLoading) {
      return <Loading />
   }
   return (
      <Container>
         <h1>Temele mele</h1>
         {
            isLoading ? <Loading /> :
               <RenderThemes temeDinQuery={likedTeme} userId={userId} />
         }
      </Container>
   )
}

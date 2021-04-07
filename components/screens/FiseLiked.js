import React from 'react'
import { useLikedFise } from '../../utils/hooks/useLikes'
import Loading from '../Loading'
import RenderSheets from '../RenderSheets'


export default function FiseLiked({ userId, likedFise, status }) {



   const [visible, setVisible] = React.useState(9)
   const loadMore = () => {
      setVisible(prev => prev + 9)
   }
   return (
      <div>
         <h1>Fișele mele</h1>
         {
            status === 'loading' ? <Loading/> : <RenderSheets
               fiseDinQuery={likedFise || []}
               userId={userId}
               title={''}
               arrayfromquery={[]}
               handleDelete={() => { }}
               visible={visible}
               loadMore={loadMore} />
         }
      </div>
   )
}

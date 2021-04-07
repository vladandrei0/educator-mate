import React from 'react'
import { updateFisaStatus } from '../utils/updatelike'
import { CardFisa } from './Card'
import { useLikes } from '../utils/hooks/useLikes'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import * as mq from '../styles/media-queries'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'


export default function RenderSheets({
   fiseDinQuery,
   userId,
   max,
   title,
   randamTeme = false,
   handleDelete,
   arrayfromquery,
   visible,
   loadMore
}) {



   let max_slice;
   if (max > 0) {
      max_slice = max
   } else {
      max_slice = visible
   }
   // Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns
   const { data: likedFise } = useLikes(userId)

   if (userId) {

      return (
         <>
            <Typography variant='h3' component='h3'>{title} {title === 'Rezultatul căutării:' ? `${fiseDinQuery.length} rezultat${fiseDinQuery.length === 1 ? '' : 'e'}` : null}
               <div>

                  {(!randamTeme && title !== 'Rezultatul căutării:') ? arrayfromquery.map(q => {
                     if (q[0] === 'tip' && Array.isArray(q[1])) {
                        return q[1].map(tip => <Chip
                           key={tip}
                           variant='outlined'
                           label={tip}
                           size='small'
                           style={{ marginLeft: '5px' }}
                           onDelete={(e) => handleDelete(e, 'tip', tip)}
                           color='secondary' />)

                     } else if (q[0] === 'page') {
                        return null
                     } else {
                        return <Chip
                           key={q}
                           variant='outlined'
                           label={q[1]}
                           size='small'
                           style={{ marginLeft: '5px' }}
                           onDelete={(e) => handleDelete(e, q[0])}
                           color='secondary' />
                     }
                  }) : null}
               </div>
            </Typography>
            <Wrapper>
               {
                  fiseDinQuery.length ?
                     (fiseDinQuery.slice(0, max_slice).map(fisa => {
                        let isLiked = likedFise?.includes(fisa.id)
                        return (
                           <CardFisa
                              fisa={fisa}
                              title={fisa.nume}
                              src={fisa.poza || '/ae.jpg'}
                              userId={userId}
                              itemId={fisa.id}
                              isLiked={isLiked}
                              key={fisa.id}
                              updateStatus={updateFisaStatus}
                           />
                        )
                     }
                     ))
                     :
                     (<>
                        <div className='back'>
                           <p>Nu am găsit nici un rezultat. Încearcă altă căutare</p>
                        </div>
                     </>)
               }
            </Wrapper>
            {(!(title === 'Ultimele fișe adăugate') && (fiseDinQuery.length >= visible)) ?
               <Button
                  style={{
                     margin: '10px auto'
                  }}
                  variant='contained'
                  color='primary'
                  onClick={loadMore}>Arată mai multe</Button>
               : null}
         </ >
      )
   } else {
      return (
         <>
            <Typography variant='h3' component='h3'>{title} {title === 'Rezultatul căutării:' ? `${fiseDinQuery.length} rezultat${fiseDinQuery.length === 1 ? '' : 'e'}` : null}
               <div>

                  {!randamTeme ? arrayfromquery.map(q => {
                     if (q[0] === 'tip' && Array.isArray(q[1])) {
                        return q[1].map(tip => <Chip
                           key={tip}
                           variant='outlined'
                           label={tip}
                           size='small'
                           style={{ marginLeft: '5px' }}
                           onDelete={(e) => handleDelete(e, 'tip', tip)}
                           color='secondary' />)

                     } else if (q[0] === 'page') {
                        return null
                     } else {
                        return <Chip
                           key={q}
                           variant='outlined'
                           label={q[1]}
                           size='small'
                           style={{ marginLeft: '5px' }}
                           onDelete={(e) => handleDelete(e, q[0])}
                           color='secondary' />
                     }
                  }) : null}
               </div>
            </Typography>
            <Wrapper>
               {
                  fiseDinQuery ?
                     (fiseDinQuery.slice(0, max_slice).map(fisa => {
                        return (
                           <CardFisa
                              fisa={fisa}
                              title={fisa.nume}
                              src={fisa.poza || '/ae.jpg'}
                              itemId={fisa.id}
                              key={fisa.id}
                           />
                        )
                     }
                     )) : (
                        <>
                           <div className='back'>
                              <Typography variant='h4' component='h4'>Nu am găsit niciun rezultat, încearcă altă căutare
                              </Typography>
                           </div>
                        </>
                     )
               }
            </Wrapper>
            {(!(title === 'Ultimele fișe adăugate') && (fiseDinQuery.length >= visible)) ?
               <Button
                  style={{
                     margin: '0 auto'
                  }}
                  variant='contained'
                  color='primary'
                  onClick={loadMore}>Arată mai multe</Button>
               : null}
         </>
      )
   }
}

const Wrapper = styled.section`
   display:grid;
   grid-template-columns:repeat(auto-fill,minmax(250px, 1fr));
   justify-items:center;

   .back{
      display:flex;
      justify-content:center;
      align-items:center;
   }
   ${mq['xsmallAndSmall']}{
      grid-template-columns:repeat(auto-fill,minmax(280px, 1fr));
      grid-gap:15px;
   }
`

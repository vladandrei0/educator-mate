import React from 'react'
import styled from 'styled-components'
import CardTema from './CardTema'
import { updateTemaStatus } from '../utils/updatelike'
import { useThemeLikes } from '../utils/hooks/useLikes'
import Typography from '@material-ui/core/Typography'

export default function RenderThemes({ temeDinQuery, userId, max, title }) {

   let max_slice;
   if (max > 0) {
      max_slice = max
   } else {
      max_slice = temeDinQuery?.length + 1
   }

   const { data: likedTeme } = useThemeLikes(userId)

   if (userId) {

      return (
         <>
            <Typography variant='h3' component='h3'>
               {title} {title === 'Rezultatul căutării:' ? `${temeDinQuery.length} rezultat${temeDinQuery.length === 1 ? '' : 'e'}` : null}</Typography>
            <Wrapper>
               {!!temeDinQuery?.length ? (
                  temeDinQuery.slice(0, max_slice).map(tema => { //change second arg of slice to control number of rendered elements
                     let isLiked = likedTeme?.includes(tema.id)
                     {/* console.log('tema', tema) */ }
                     return (
                        <div key={tema.id}>
                           <CardTema
                              title={tema.nume}
                              src={tema.poza || '/ae.jpg'}
                              userId={userId}
                              slug={tema.slug}
                              count={tema.Fisa.length === 0 ?
                                 "...în curând" : `${tema.Fisa.length} fiș${tema.Fisa.length === 1 ? 'ă' : 'e'}`}
                              temaId={tema.id}
                              isLikedTema={isLiked}
                              updateThemeStatus={updateTemaStatus}
                           />
                        </div>
                     )
                  })
               ) : (<p>Nu am găsit nicio temă</p>)}
            </Wrapper>
         </>
      )

   } else {
      return (
         <>
            <Typography variant='h3' component='h3'>{title} {title === 'Rezultatul căutării:' ? `${temeDinQuery.length} rezultat${temeDinQuery.length === 1 ? '' : 'e'}` : null}</Typography>
            <Wrapper>
               {!!temeDinQuery?.length ? (
                  temeDinQuery.slice(0, max_slice).map(tema => {
                     return (
                        <CardTema
                           title={tema.nume}
                           src={tema.poza || '/ae.jpg'}
                           key={tema.id}
                           slug={tema.slug}
                           count={tema.Fisa.length === 0 ?
                              "...în curând" : `${tema.Fisa.length} fiș${tema.Fisa.length === 1 ? 'ă' : 'e'}`}
                        />
                     )
                  })
               ) : (<section>
                  Nu am găsit nicio temă în această categorie
               </section>)}
            </Wrapper>
         </>
      )
   }
}

const Wrapper = styled.section`
   display:grid;
   grid-template-columns:repeat(auto-fit,minmax(200px, 1fr));
   justify-items:center;
   
`
import TemeLayout from '../../components/screens/Teme'
import { Hero } from '../../components/Hero'
import { Container } from '../../components/Container'
import getThemes from '../api/getThemes'
import PageHead from '../../components/PageHead'

export async function getStaticProps() {
   // get latest teme
   const teme = await getThemes()

   if (!teme) {
      return {
         notfound: true,
      }
   }
   return {
      props: {
         teme
      }
   }
}

export default function Teme({ teme }) {
   return (
      <>
         <PageHead title={'Ajutorul Educatorului | Teme'}
            description={'Aici gasesti toate temele pentru tot anul pentru gradinita - de la sarbatori la animale si corpul uman'}
            image={'/domenii.png'}>
            <Container>
               <Hero image='/domenii.png' width='480px' height='728px' title='Explorează temele săptămânale' />
               <TemeLayout latestTeme={teme} />
            </Container>
         </PageHead>
      </>
   )
}


import { Hero } from '../../components/Hero'
import FiseLayout from '../../components/screens/Fise'
import { Container } from '../../components/Container'
import getManyFise from '../api/getSheets'
import { Feedback } from '../../components/Feedback';
import PageHead from '../../components/PageHead'

export default function Fise(props) {

  return (
    <>
      <PageHead title={'Ajutorul Educatorului | Fise pentru gradinita'}
        description={'Aici vei gasi fise pentru tot anul pentru gradinita. Fisele sunt gratuite, usor de descarcat si de folosit. Fara pregatiri, fara batai de cap.'}
        image={'/fise.png'}
      >
      <Container>
        <Hero image='/fise.png'
          width='423px'
          height='444px'
          title='Fișe fără pregătire'
          subtitle='Pentru toate grupele și pentru toate domeniile de dezvoltare.' />
        <FiseLayout {...props} />
        {/* <Feedback /> */}
      </Container>
      </PageHead>
    </>
  )
}

export async function getStaticProps(context) {
  const latest = await getManyFise()

  return {
    props: {
      latest
    }
  }


}
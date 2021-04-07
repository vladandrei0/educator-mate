import PageHeader from '../components/PageHead'
import { Hero } from '../components/Hero'
import { Products } from '../components/Products'
import { Container } from '../components/Container';


export default function Home() {
  return (
      <PageHeader title={'Ajutorul Educatorului - # 1 în fișe online pentru grădiniță'}
        description={'🌟 Pentru educatori - fise pentru gradinita, pentru grupa mare, grupa mica si grupa mijlocie.'}
        image={'/home.png'}
      >
      <main>
        <Container>
          <Hero image='/home.png'
            width='873px'
            height='635px'
            title='Ajutorul Educatorului'
            subtitle='#1 în fișe online pentru grădiniță'
            button="Explorează fișele"
            path='/fise' />
          <Products />
        </Container>
      </main>
      </PageHeader>

  )
}


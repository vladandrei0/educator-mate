import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import PageHead from '../components/PageHead'

export default function Blog() {
  return (
    <>
      <PageHead title={'Ajutorul Educatorului | Blog'}
        description={'Articole pentru educatori'}
      image={'/blog.png' }>
      <Container>
        <Hero image='/blog.png' width='760px' height='376px' title='Blog' />
        <h2>În curând...</h2>
      </Container>
      </PageHead>
    </>
  )
}


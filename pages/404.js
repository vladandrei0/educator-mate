import Head from 'next/head'
import Link from 'next/link'
import { Container } from '../components/Container'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const NotFoundPage = () => (
    <>
        <Head>
            <title>Ajutorul Educatorului - numarul 1 in fise online pentru educatori | 404: Not found</title>
            <link rel="icon" href="/logo.png" />
        </Head>
        <Container>
            <h1>Pagina nu există!</h1>
            <p>Oops, pagina pe care încerci să o accesezi nu există.</p>
            <Link href='/' passHref>
                <a style={{
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    <ArrowBackIcon />
                    Înapoi spre pagina principala
                </a>
            </Link>
        </Container>
    </>
)

export default NotFoundPage;
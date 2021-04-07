import { useContext } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../components/utils/ErrorFallback'
import { FirebaseContext } from '../../components/Firebase'
import Tema from '../../components/Tema'
import getOneTheme from '../api/getOneTheme'
import getThemes from '../api/getThemes'
import PageHead from '../../components/PageHead'

export async function getStaticPaths() {
    const fise = await getThemes()
    const paths = fise.map(a => {
        return {
            params: {
                slug: a.slug.toString(),
            }
        }
    })
    return {
        fallback: false,
        paths
    }
}

export async function getStaticProps(context) {

    // console.log('context', context.params)
    const { slug } = context.params
    try {
        const tema = await getOneTheme(slug)
        return {
            props: { tema } // will be passed to the page component as props
        }
    } catch (error) {
        console.log(error.message)
    }
}
export default function TemaPage({ tema }) {
    // console.log('tema in [id]', tema)
    const { user } = useContext(FirebaseContext)
    const userId = user?.profile.id;

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <PageHead title={`${tema.nume} | Fise pentru gradinita pentru tema ${tema.nume}`}
                description={tema.descriere}
                image={tema.poza}
            >
                <Tema tema={tema} userId={userId} />
            </PageHead>
        </ErrorBoundary>
    )
}

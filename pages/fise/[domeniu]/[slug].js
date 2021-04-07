import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import Fisa from '../../../components/Fisa'
import { FirebaseContext } from '../../../components/Firebase'
import getFisa from '../../api/getOneSheet';
import getManyFise from '../../api/getSheets'
import { ErrorBoundary } from 'react-error-boundary'
import { Container } from '../../../components/Container'
import FisaNoUser from '../../../components/FisaNoUser';
import PageHead from '../../../components/PageHead';

export async function getStaticPaths() {
    const fise = await getManyFise()
    const paths = fise.map(a => {
        return {
            params: {
                domeniu: a.Domenii.nume.toString(),
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
    const { slug } = context.params
    const fisa = await getFisa(slug)

    if (fisa === 'nothing was returned') {
        return {
            props: {}
        }
    } else {
        return {
            props: {
                fisa
            }
        }
    }

}


export default function FisaPage({ fisa }) {
    const { user } = useContext(FirebaseContext);
    if (fisa) {
        const userId = user?.profile.id;
        if (userId) {
            return (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <PageHead title={`${fisa.nume} | Fise pentru gradinita`}
                        description={`fisa pentru ${fisa.Lectie.nume} pentru tema ${fisa.Teme.nume} pentru gradinita`}
                        image={fisa.poza}
                    >
                        <Fisa fisa={fisa} userId={userId} />
                    </PageHead>
                </ErrorBoundary>
            )
        } else {
            return (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <PageHead title={`${fisa.nume} | Fise pentru gradinita`}
                        description={`fisa pentru ${fisa.Lectie.nume} pentru tema ${fisa.Teme.nume} pentru gradinita`}
                        image={fisa.poza}
                    >
                        <FisaNoUser fisa={fisa} />
                    </PageHead>
                </ErrorBoundary>
            )
        }


    } else {
        return (
            <Container>
                <p>Nu exista asa ceva</p>
            </Container>
        )
    }

}

function ErrorFallback({ error, resetErrorBoundary }) {
    const router = useRouter()
    return (
        <div role='alert'>
            A fost o eroare:{' '}
            <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
            <span>
                <button onClick={resetErrorBoundary}>Mai incearca o data</button>
                <button onClick={() => router.push('/fise')}>Mergi inapoi</button>
            </span>

        </div>
    )
}



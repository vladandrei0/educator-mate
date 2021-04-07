import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../styles/theme'
// import { Header } from '../Header'
import Header from '../Header'
import { Footer } from '../Footer'
import { FirebaseContext, useAuth } from '../Firebase'

export default function Layout({ children, title = 'Ajutorul Educatorului' }) {

    const { user, firebase, isLoading } = useAuth()
    // console.log('user in layout', user)
    return (
        <FirebaseContext.Provider value={{ user, firebase, isLoading }}>
            <ThemeProvider theme={theme}>
                <Head>
                    <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="p:domain_verify" content="132aa608d21f7d50f6802f2afecf5f51" />
                </Head>
                <div className='container'>
                    <Header />
                    {children}
                    <Footer />
                </div>
            </ThemeProvider>
        </FirebaseContext.Provider>
    )
}
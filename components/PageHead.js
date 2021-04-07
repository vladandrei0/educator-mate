// https://github.com/garmeeh/next-seo#faq-page

import Head from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';
import { ArticleJsonLd, FAQPageJsonLd } from 'next-seo';

const PageHeader = ({
    children,
    description,
    image,
    title = 'Ajutorul Educatorului',
    keywords,
    router
}) => {
    const domain = 'https://ajutoruleducatorului.ro';
    const url = router && router.asPath ? router.asPath : undefined;
    const canonical = url && url === '/' ? domain : domain + url;
    const featuredImage = image.includes('https://ajutorul-educatorului.club') ? image : domain + image;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                {description && <meta content={description} name="description" />}
                {keywords && <meta content={keywords} name="keywords" />}
                <meta content="follow, index" name="robots" />
                <meta content="#ffffff" name="theme-color" />
                <meta content="#ffffff" name="msapplication-TileColor" />
                <meta
                    content="/favicons/browserconfig.xml"
                    name="msapplication-config"
                />
                <link
                    href="/favicons/apple-touch-icon.png"
                    rel="apple-touch-icon"
                    sizes="180x180"
                />
                <link
                    href="/favicons/favicon-32x32.png"
                    rel="icon"
                    sizes="32x32"
                    type="image/png"
                />
                <link
                    href="/favicons/favicon-16x16.png"
                    rel="icon"
                    sizes="16x16"
                    type="image/png"
                />
                <link href="/favicons/site.webmanifest" rel="manifest" />
                <link
                    color="#5bbad5"
                    href="/favicons/safari-pinned-tab.svg"
                    rel="mask-icon"
                />
                <link href="/favicons/favicon.ico" rel="shortcut icon" />
                {url && <link href={canonical} rel="canonical" />}
                <meta content="ro_RO" property="og:locale" />
                <meta content={title} property="og:title" />
                <meta content={description} property="og:description" />
                <meta content={canonical} property="og:url" />
                <meta content="website" property="og:type" />
                <meta
                    content="ie_l2QGP8pmpxPF5NU7al-yJNoCTLltyK2fuj7TSSYo"
                    name="google-site-verification"
                />
                <meta name="facebook-domain-verification" content="4vc8w5qdhd0tjpi31n0gi2eas9nr66" />
                <meta property="fb:app_id" content="360466901749817" />
                {featuredImage && (
                    <>
                        <meta content={featuredImage} property="og:image" />
                        <meta content={description} property="og:image:alt" />
                    </>
                )}
            </Head>
            {children}
            <ArticleJsonLd
                // authorName="Lee Robinson"
                // dateModified={dateTime(date)}
                // datePublished={dateTime(date)}
                description={description}
                images={[featuredImage]}
                publisherLogo="https://ajutoruleducatorului.ro/favicons/android-chrome-192x192.png"
                publisherName="Ajutorul Educatorului"
                title={title}
                url={canonical}
            />
            <FAQPageJsonLd
                mainEntity={[
                    {
                        questionName: 'Ce fel de fișe găsesc pe platforma Ajutorul Educatorului?',
                        acceptedAnswerText: 'Fișe pentru toate grupele de grădiniță, pentru grupele mică, mijlocie si mare. Fișele sunt făcute pentru toate materiile de la matematică și cunoașterea mediului la dezvoltare fizică',
                    },
                    {
                        questionName: 'Cât costă fișele de pe platfomă?',
                        acceptedAnswerText: 'Fișele sunt gratuite.',
                    },
                    {
                        questionName: 'Cum pot folosi fișele de pe platformă?',
                        acceptedAnswerText: 'Este suficient să îți faci un cont și poți descărca orice fișă de lucru.',
                    },
                    {
                        questionName: 'Nu am găsit fișa de care aveam nevoie. Ce pot să fac?',
                        acceptedAnswerText: 'Ne poți trimite un mail sau poți completa formularul de feedback în care să ne spui ce nu ai găsit. Ne vom strădui sa revenim cât mai curând cu fișa solicitată',
                    },
                ]}
            />
        </>
    );
};

export default withRouter(PageHeader);
import Head from 'next/head'

const Metadata = () => (
  <Head>
    <title>Developpeur Full-Stack</title>
    <meta name='description' content='Gustavo Oyarzabal' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />

    {/* Open Graph Meta Tags */}
    <meta property='og:title' content='Gustavo Oyarzabal' />
    <meta property='og:description' content='Developpeur FullStack' />
    <meta property='og:image' content='https://res.cloudinary.com/dtwacyhiq/image/upload/v1719141687/logo_portfolio_GG_woytbb_ugdfme.jpg' />
    <meta property='og:url' content='https://www.gustavooyarzabal.com' />
    <meta property='og:type' content='website' />

    {/* Twitter Meta Tags */}
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:title' content='Gustavo Oyarzabal' />
    <meta name='twitter:description' content='Developpeur FullStack' />
    <meta name='twitter:image' content='https://res.cloudinary.com/dtwacyhiq/image/upload/v1719141687/logo_portfolio_GG_woytbb_ugdfme.jpg' />

    {/* Favicon and Apple Touch Icon */}
    <link rel='icon' sizes='32x32' href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1719141687/logo_portfolio_GG_woytbb_ugdfme.jpg' />
    <link rel='apple-touch-icon' sizes='180x180' href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1719141687/logo_portfolio_GG_woytbb_ugdfme.jpg' />
  </Head>
)

export default Metadata

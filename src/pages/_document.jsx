// _document.jsx
import { Html, Head, Main, NextScript } from 'next/document'
import { HeadContent } from './_app'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1718644385/icono_miniatura_portfolio_pd2ot8.webp'
          type='image/x-icon'
        />
        <link
          rel='apple-touch-icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1718644385/icono_miniatura_portfolio_pd2ot8.webp'
          sizes='180x180'
        />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060764/tsLogobuenTamano_ptixpb.png'
          type='image/x-icon'
        />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717060928/nestJSFavicon_twh5tb.jpg'
          type='image/x-icon'
        />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061262/nextJSlogoFaviconIcon_wqo7fx.png'
          type='image/x-icon'
        />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717062256/nodeJSicongoodtamano_ltrohu.png'
        />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061920/ReacticonFavicon_jktfgp.png'
        />
        <link
          rel='icon'
          href='https://res.cloudinary.com/dtwacyhiq/image/upload/v1717061800/JsLogoiconfavion_tgakst.png'
          type='image/x-icon'
        />

        <HeadContent />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

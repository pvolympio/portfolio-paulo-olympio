import type { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Providers } from '../providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import '../globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pauloolympio.dev'
const baseUrl = new URL(siteUrl)

export const viewport: Viewport = {
  themeColor: '#07070f',
  width: 'device-width',
  initialScale: 1,
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const tSeo = await getTranslations({ locale, namespace: 'seo' })
  const isPt = locale === 'pt'

  return {
    metadataBase: baseUrl,
    title: tSeo('title'),
    description: tSeo('description'),
    keywords: ['developer', 'backend', 'fullstack', 'java', 'node.js', 'typescript', 'python', 'docker', 'apis rest', 'sql'],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'pt': '/pt',
        'en': '/en',
      },
    },
    icons: {
      icon: '/favicon.svg',
    },
    openGraph: {
      title: tSeo('title'),
      description: tSeo('description'),
      type: 'website',
      url: `/${locale}`,
      siteName: 'Paulo Victor Olympio Portfolio',
      locale: isPt ? 'pt_PT' : 'en_US',
      images: [
        {
          url: '/api/og',
          width: 1200,
          height: 630,
          alt: 'Paulo Victor Olympio — Backend & Fullstack Developer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: tSeo('title'),
      description: tSeo('description'),
      images: ['/api/og'],
    },
  }
}

export default async function RootLayout({ 
  children,
  params: { locale } 
}: { 
  children: ReactNode,
  params: { locale: string }
}) {
  const messages = await getMessages()
  const tAccess = await getTranslations({ locale, namespace: 'accessibility' })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Paulo Victor Olympio',
    jobTitle: 'Backend & Fullstack Developer',
    email: 'pvolympio@gmail.com',
    url: siteUrl,
    sameAs: [
      'https://github.com/pvolympio',
      'https://www.linkedin.com/in/pauloolympio-desenvolvedor/'
    ]
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <a className="skip-link" href="#home">
              {tAccess('skipLink')}
            </a>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

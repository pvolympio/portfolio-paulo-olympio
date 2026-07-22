import type { Metadata, Viewport } from 'next'
import { Providers } from '../providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

export const viewport: Viewport = {
  themeColor: '#07070f',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Paulo Victor Olympio — Developer',
  description: 'Desenvolvedor Backend & Fullstack. Programação não é sobre linguagem, é sobre lógica, arquitetura e impacto.',
  keywords: ['developer', 'backend', 'fullstack', 'java', 'react', 'node'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Paulo Victor Olympio — Developer',
    description: 'Desenvolvedor Backend & Fullstack. Programação não é sobre linguagem, é sobre lógica, arquitetura e impacto.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paulo Victor Olympio — Developer',
    description: 'Desenvolvedor Backend & Fullstack. Programação não é sobre linguagem, é sobre lógica, arquitetura e impacto.',
  },
}

export default async function RootLayout({ 
  children,
  params: { locale } 
}: { 
  children: React.ReactNode,
  params: { locale: string }
}) {
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <a className="skip-link" href="#home">Pular para o conteúdo</a>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

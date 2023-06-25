import { getSiteById } from '@/src/lib/sites'
import './globals.css'
import { Inter } from 'next/font/google'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { HeaderP2 } from '@/src/components/portfolio/header'
import { getPagesByParentId } from '@/src/lib/pages'
import QueryProvider from '@/src/providers/QueryProvider'
import ThemeNextProvider from '@/src/providers/ThemeNextProvider'
import { UIProvider } from '@/src/providers/UIProvider'
import { SessionAuthProvider } from '@/src/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  const site = await getSiteById()
  return {
    title: site?.data.info.name,
    description: site?.data.info.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    icons: {
      icon: site?.data.info.icon,
      shortcut: site?.data.info.icon,
      apple: site?.data.info.icon,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: site?.data.info.icon,
      },
    },
    openGraph: {
      title: site?.data.info.name,
      description: site?.data.info.description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: site?.data.info.name,

      locale: 'es_ES',
      type: 'website',
    },
    robots: {
      index: true,
    }
  };
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const site = await getSiteById()
  const pages = await getPagesByParentId()

  const componentsHeader = {
    HeaderP2: () => (
      <HeaderP2 site={site} pages={pages} />
    ),
  }
  return (
    <html suppressHydrationWarning>
      <body className='bg-cris-fill'>
      <SessionAuthProvider>

        <QueryProvider >

          <ThemeNextProvider site={site} >

            <UIProvider>


              <MDXRemote
                source={site.data.components.header}
                components={componentsHeader}
              />
              {children}
            </UIProvider>
          </ThemeNextProvider>
        </QueryProvider>
      </SessionAuthProvider>
      </body>
    </html>
  )
}

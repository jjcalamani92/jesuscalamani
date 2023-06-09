import { getSiteById } from '@/src/lib/sites'
import '@/src/styles/editorlite.css'
import '@/src/styles/globals.css'
import '@/src/styles/katex.css';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { HeaderP1, HeaderP2, HeaderP10 } from '@/src/components/portfolio/header'
import { getPagesByParentId } from '@/src/lib/pages'
import QueryProvider from '@/src/providers/QueryProvider'
import ThemeNextProvider from '@/src/providers/ThemeNextProvider'
import { UIProvider } from '@/src/providers/UIProvider'
import { SessionAuthProvider } from '@/src/providers/SessionProvider'
import { FooterP0 } from '@/src/components/portfolio/footer'
import GetHeader from '@/src/components/GetHeader';
import GetFooter from '@/src/components/GetFooter';


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

  // const componentsHeader = {
  //   HeaderP1: () => (
  //     <HeaderP1 site={site} pages={pages} />
  //   ),
  //   HeaderP2: () => (
  //     <HeaderP2 site={site} pages={pages} />
  //   ),
  //   HeaderP10: () => (
  //     <HeaderP10 site={site} pages={pages} />
  //   ),
  // }
  // const componentsFooter = {
  //   FooterP0: () => (
  //     <FooterP0 site={site} />
  //   ),
  // }
  return (
    <html suppressHydrationWarning>
      <body className='bg-cris-fill'>
      <SessionAuthProvider>
        <QueryProvider >
          <ThemeNextProvider site={site} >
            <UIProvider>
              <GetHeader  site={site} pages={pages}/>
              {/* <MDXRemote
                source={site.data.components.header}
                components={componentsHeader}
              /> */}
              {children}
              <GetFooter  site={site} pages={pages}/>

              {/* <MDXRemote
                source={site.data.components.footer}
                components={componentsFooter}
              /> */}
            </UIProvider>
          </ThemeNextProvider>
        </QueryProvider>
      </SessionAuthProvider>
      </body>
    </html>
  )
}

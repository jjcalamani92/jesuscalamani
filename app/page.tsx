// export const dynamic  = "force-dynamic"
import GetHome from '@/src/components/GetHome'
import { HomeP1 } from '@/src/components/portfolio/home'
import { getSiteById } from '@/src/lib/sites'
// import { MDXRemote } from 'next-mdx-remote/rsc'

import React from 'react'

export default async function Index() {
  const site = await getSiteById()
  // const components = {
  //   HomeP1: () => (
  //     <HomeP1 component={site.data.layouts.home} />
  //   )
  // }
  return (
    <main className=''>

    <React.Fragment>
      <GetHome site={site} />
    {/* <MDXRemote
      source={site.data.layouts.home.component}
      components={components}
    /> */}
    <h1>Component</h1>
  </React.Fragment>
    </main>
  )
}

// export const dynamic = 'error';
// export const revalidate = 60

import { getSiteById } from '@/src/lib/sites'
import PageHeading from '@/src/ui/PageHeading'
import HeadingSite from '@/src/ui/HeadingSite'
import React from 'react'

import { HomeP1 } from '@/src/components/portfolio/home/HomeP1';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function Index() {
  const site = await getSiteById()
  const components = {
    
    HomeP1: () => (
      <HomeP1 component={site.data.layouts.home} />
    )
  }
  return (
    <React.Fragment>
      <header className="bg-white shadow ">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <HeadingSite site={site} title={site.data.info.name} />
        </div>
      </header>
      <main >
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 ">
          <PageHeading title='Header' />
          <br />
          <PageHeading title='Home' />
          
      <MDXRemote
            source={site.data.layouts.home.component}
            components={components}
          />
          
          <br />
          <PageHeading title='Footer' />

        </div>
      </main>
          
    </React.Fragment>
  )
}

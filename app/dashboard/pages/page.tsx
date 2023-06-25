// export const dynamic = 'error';

import { getPages, getPagesByParentId } from '@/src/lib/pages'
import HeadingPage from '@/src/ui/HeadingPage';
import { GridPagesDashboard } from '@/src/ui/grid/GridPageDashboard';

import React from 'react'

export default async function Index() {
  const pages = await getPagesByParentId()
  return (
    <React.Fragment>
       <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <HeadingPage title='Pages' />
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <GridPagesDashboard pages={pages} />
              
            
          </div>
        </main>
    </React.Fragment>
  )
}

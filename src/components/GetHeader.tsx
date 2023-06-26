import { Page } from '@/src/interfaces/page'
import { Site } from '@/src/interfaces/site'
import React from 'react'
import { HeaderP10 } from './portfolio/header/HeaderP10'

interface Props {
  site: Site
  pages: Page[]
}

export default function GetHeader({site, pages}: Props) {
  if (site.data.components.header === "<HeaderP10/>") {
    return (
      <HeaderP10 site={site} pages={pages} />
    )
  }
  return (
    <div>GetHeader</div>
  )
}

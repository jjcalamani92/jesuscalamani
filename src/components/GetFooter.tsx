import { Page } from '@/src/interfaces/page'
import { Site } from '@/src/interfaces/site'
import React from 'react'
import { HeaderP10 } from './portfolio/header/HeaderP10'
import { FooterP0 } from './portfolio/footer'

interface Props {
  site: Site
  pages: Page[]
}

export default function GetFooter({site, pages}: Props) {
  if (site.data.components.footer === "<FooterP0/>") {
    return (
      <FooterP0 site={site}  />
    )
  }
  return (
    <div>GetHeader</div>
  )
}

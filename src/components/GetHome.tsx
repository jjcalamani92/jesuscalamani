import { Page } from '@/src/interfaces/page'
import { Site } from '@/src/interfaces/site'
import React from 'react'
import { HeaderP10 } from './portfolio/header/HeaderP10'
import { FooterP0 } from './portfolio/footer'
import { HomeP1 } from './portfolio/home'

interface Props {
  site: Site
}

export default function GetHome({ site }: Props) {
  if (site.data.layouts.home.component === "<HomeP1/>") {
    return (
      <HomeP1 component={site.data.layouts.home} />
    )
  }
  return (
    <div>GetHeader</div>
  )
}

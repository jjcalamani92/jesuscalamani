'use client'

import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Site } from '../interfaces/site'
import { getSiteById } from '../lib/sites'

interface Props {
  children: React.ReactNode
  // site: Site
}
export default function QueryProvider({ children, }: Props) {
  
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
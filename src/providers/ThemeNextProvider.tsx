'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { useQuery } from '@tanstack/react-query';
import { Site } from '../interfaces/site';
import { getSiteById } from '../lib/sites';

interface Props {
  children: React.ReactNode
  site: Site
}
export default function ThemeNextProvider({ children, site }: Props) {
  const { data } = useQuery({ queryKey: ["site"] , queryFn: () => getSiteById(), initialData: site})
  
  return (
    <ThemeProvider attribute="class" defaultTheme={data.data.theme.light} themes={data.data.theme.themes}>{children}</ThemeProvider>
  )
}
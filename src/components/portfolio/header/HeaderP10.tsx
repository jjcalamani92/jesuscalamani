'use client'
import Link from 'next/link'
import React from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

import { Page } from '@/src/interfaces/page'
import { Site } from '@/src/interfaces/site'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { usePath } from '@/src/hooks/usePath'

interface Props {
  pages: Page[]
  site: Site
}

export function HeaderP10({site, pages}: Props) {

  const themes = site?.data?.theme.themes
  const lightAndDarkMode = site?.data.theme?.lightAndDarkMode
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { theme, setTheme } = useTheme();
  const path = usePath()
  if (path[0] === 'dashboard') return null
  return (
    <React.Fragment>
      <div className="">
        <header className=" inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-center p-6 lg:px-8" aria-label="Global">
            
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:gap-x-12">
                <Link  href={`/`} className="text-sm font-semibold leading-6 ">
                  Home
                </Link>
              {pages.map((item, i) => (
                <Link key={i} href={`/${item.slug}`} className="text-sm font-semibold leading-6 ">
                  {item.data.name}
                </Link>
              ))}
            </div>
            {/* <div className="space-x-3 items-center hidden lg:flex lg:flex-1 lg:justify-end">
              {
                lightAndDarkMode &&
                <>
                  {theme! === themes![1] ? (
                    <div
                      onClick={() => setTheme(themes![0])}
                      className=" items-center"
                    >
                      <SunIcon
                        className="h-6 w-6 fill-cris-base hover:fill-cris-accent focus-outline"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div
                      onClick={() => setTheme(themes![1])}
                      className=" items-center"
                    >
                      <MoonIcon
                        className="h-6 w-6 fill-cris-base hover:fill-cris-accent focus-outline"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </>

              }
              
            </div> */}
          </nav>
          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50" />
            <Dialog.Panel className="fixed top-0 right-0 shadow-lg rounded-lg m-2 z-50 w-3/4 overflow-y-auto h-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-cris-fill border ">
              <div className="flex items-center justify-between">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium">

                  {
                    site?.data.logo?.type === 'html'
                      ?
                      <MDXRemote source={site?.data.logo?.content} />
                      :
                      <img className="h-8 w-auto" src={site?.data.logo?.content} alt='logo description' />
                  }
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y ">
                  <div className="space-y-2 py-6">
                    {pages.map((item, i) => (
                      <Link
                        key={i}
                        href={item.slug}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                      >
                        {item.data.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    {
                      lightAndDarkMode &&
                      <>
                        {theme! === themes![1] ? (
                          <div
                            onClick={() => setTheme(themes![0])}
                            className=" items-center"
                          >
                            <SunIcon
                              className="h-6 w-6 fill-cris-base hover:fill-cris-accent focus-outline"
                              aria-hidden="true"
                            />
                          </div>
                        ) : (
                          <div
                            onClick={() => setTheme(themes![1])}
                            className=" items-center"
                          >
                            <MoonIcon
                              className="h-6 w-6 fill-cris-base hover:fill-cris-accent focus-outline"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </>
                    }

                    <Link
                      href="#"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 "
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </header>

        <hr className='border-cris-line' />

      </div>
    </React.Fragment>
  )
}

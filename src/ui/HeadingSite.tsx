/* eslint-disable react/no-children-prop */

'use client'
import {
  AdjustmentsHorizontalIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckBadgeIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PaintBrushIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { Site } from '../interfaces/site'
import React from 'react';
import { useGetSiteById } from '../hooks/react-query/useSite'
import FormSiteEdit from './forms/FormSiteEdit'
import { useUI } from '../providers/UIProvider'
import { SlideOversForm } from './SlideOversForm'

interface Props {
  title: string
  site: Site
}

export default function HeadingSite(props: Props) {
  const { data: site } = useGetSiteById(props.site)
  // console.log('site', site)
  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm,
    toggleModal,
    toggleSlideOversFormArticle,
    
  } = useUI();

  const handleClickEdit = (slug: string) => {
    toggleSlideOversForm.actions.toggle();
      setChildrens(<FormSiteEdit type={slug} site={site} />);
  }
  return (
    <React.Fragment>

    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {site.data.info.name}
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Full-time
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CurrencyDollarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            $120k &ndash; $140k
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0 space-x-3">
        {/* <ButtonEdit site={site} /> */}
        <span className="hidden sm:block">
          <button
            type="button"
            onClick={() => handleClickEdit('edit-site-info')}

            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Info
          </button>
        </span>

        <span className="ml-3 hidden sm:block">
          <button
            onClick={() => handleClickEdit('edit-site-theme')}
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PaintBrushIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Theme
          </button>
        </span>
        <span className="ml-3 hidden sm:block">
          <button
            onClick={() => handleClickEdit('edit-site-icon')}
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <CheckBadgeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Icon
          </button>
        </span>
        <span className="ml-3 hidden sm:block">
          <button
            onClick={() => handleClickEdit('edit-site-logo')}
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <CheckBadgeIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Logo
          </button>
        </span>

        {/* <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Publish
          </button>
        </span> */}

        {/* Dropdown */}
        {/* <Dropdown /> */}
      </div>
      
    </div>
    <SlideOversForm children={childrens} />
    
    </React.Fragment>

  )
}

'use client'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
// import Dropdown from './Dropdown'
import { Site } from '../interfaces/site'
import React from 'react';
import { FormComponentPortfolio } from './forms/FormComponentPortfolio'
import { useUI } from '../providers/UIProvider'
import { useQueryClient } from '@tanstack/react-query'

interface Props {
 title: string
}

export default function PageHeading(props: Props) {
  const { title } = props
  const {
    childrenDashboard: { childrens, setChildrens },
    toggleSlideOversForm,
    toggleModal,
    toggleSlideOversFormArticle,
  } = useUI();
  const queryClient = useQueryClient();
  const site = queryClient.getQueryData<Site>(["get-site",])
  // console.log('site', site)


  const click = () => {
    toggleSlideOversForm.actions.toggle();
      setChildrens(<FormComponentPortfolio component={site?.data.layouts.home.component!} type='home'  layout={site?.data.layouts.home!} />);
  }
  return (
    <div className="py-3 lg:flex lg:items-center lg:justify-between ">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          { title }
        </h2>
        
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0 space-x-3">
        <span className="hidden sm:block">
          <button
            type="button"
            onClick={ () => click()}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Edit
          </button>
        </span>

        

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Change
          </button>
        </span>

        {/* <Dropdown /> */}
      </div>
      
    </div>
  )
}

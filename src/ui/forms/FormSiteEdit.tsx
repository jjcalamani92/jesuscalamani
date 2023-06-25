/* eslint-disable react/no-children-prop */
'use client'
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import React, { useState, useTransition } from 'react';

import { CreatePage, Page } from '@/src/interfaces/page';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import { uid } from '@/src/utils';

// import { useQueryClient } from '@tanstack/react-query';
// import { useSession } from 'next-auth/react';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { useToggle } from 'ahooks';
import { Site, UpdateSiteTheme } from '@/src/interfaces/site';

import { FormikComponent } from './formik/FormikComponent';
import { FormikComponentUpload } from './formik/FormikComponentUpload';
import { RadioGroup } from '@headlessui/react'
import { useUpdateSite } from '@/src/hooks/react-query/useSite';
import { useSession } from 'next-auth/react';

interface Props {
  type: string
  site: Site;
}
const themes = [
  { name: 'Slate', class: 'bg-slate-600', slug: 'slate', selectedClass: 'ring-gray-400' },
  { name: 'Gray', class: 'bg-gray-600', slug: 'gray', selectedClass: 'ring-gray-400' },
  { name: 'Zinc', class: 'bg-zinc-600', slug: 'zinc', selectedClass: 'ring-gray-400' },
  { name: 'Neutral', class: 'bg-neutral-600', slug: 'neutral', selectedClass: 'ring-gray-400' },
  { name: 'Stone', class: 'bg-stone-600', slug: 'stone', selectedClass: 'ring-gray-400' },
  { name: 'Red', class: 'bg-red-600', slug: 'red', selectedClass: 'ring-gray-400' },
  { name: 'Orange', class: 'bg-orange-600', slug: 'orange', selectedClass: 'ring-gray-400' },
  { name: 'Amber', class: 'bg-amber-600', slug: 'amber', selectedClass: 'ring-gray-400' },
  { name: 'Yellow', class: 'bg-yellow-600', slug: 'yellow', selectedClass: 'ring-gray-400' },
  { name: 'Lime', class: 'bg-lime-600', slug: 'lime', selectedClass: 'ring-gray-400' },
  { name: 'Green', class: 'bg-green-600', slug: 'green', selectedClass: 'ring-gray-400' },
  { name: 'Emerald', class: 'bg-emerald-600', slug: 'emerald', selectedClass: 'ring-gray-400' },
  { name: 'Teal', class: 'bg-teal-600', slug: 'teal', selectedClass: 'ring-gray-400' },
  { name: 'Cyan', class: 'bg-cyan-600', slug: 'cyan', selectedClass: 'ring-gray-400' },
  { name: 'Sky', class: 'bg-sky-600', slug: 'sky', selectedClass: 'ring-gray-400' },
  { name: 'Blue', class: 'bg-blue-600', slug: 'blue', selectedClass: 'ring-gray-400' },
  { name: 'Indigo', class: 'bg-indigo-600', slug: 'indigo', selectedClass: 'ring-gray-400' },
  { name: 'Violet', class: 'bg-violet-600', slug: 'violet', selectedClass: 'ring-gray-400' },
  { name: 'Purple', class: 'bg-purple-600', slug: 'purple', selectedClass: 'ring-gray-400' },
  { name: 'Fuchsia', class: 'bg-fuchsia-600', slug: 'fuchsia', selectedClass: 'ring-gray-400' },
  { name: 'Pink', class: 'bg-pink-600', slug: 'pink', selectedClass: 'ring-gray-400' },
  { name: 'Rose', class: 'bg-rose-600', slug: 'rose', selectedClass: 'ring-gray-400' }, 
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function FormSiteEdit({ site, type }: Props) {
  const [selectedColor, setSelectedColor] = useState(themes.find((theme) => theme.slug === site?.data.theme.light))

  const { data } = useSession()
  const [state, { toggle, }] = useToggle();

  const { toggleSlideOversForm } = useUI();
  const updateSite = useUpdateSite();
  // const updateSiteLogo = useUpdateSiteLogo();
  // const updateSiteIcon = useUpdateSiteIcon();
  // const updateSiteTheme = useUpdateSiteTheme();

 

  const onChanges = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try {
      for (const file of event.target.files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)
        formData.append('tags', uid)

        const { secure_url, signature } = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        }).then(r => r.json())

        if (type === 'edit-site-logo') {
          updateSite.mutate({type:'logo', input:{ type: 'img', content: secure_url, uid: data?.user.sid }})
        }

        if (type === 'edit-site-icon') {
          updateSite.mutate({type: 'icon', input:{ icon: secure_url, uid: data?.user.sid }})
        }

      }

    } catch (error) {

    }
  }

  return (
    <Formik
      initialValues={
        {
          id: site?._id as string,
          name: site?.data.info.name,
          description: site?.data.info.description,
          siteId: uid,
          parentId: uid,
          uid: data?.user.sid,
          type: site?.data.type,
          light: site?.data.theme.light,
          website: site?.data.info.website,
          logo: site?.data?.logo?.content,
          typeImage: site?.data?.logo?.type,
          icon: site?.data.info?.icon
        }
      }
      onSubmit={(values) => {
        if (type === 'edit-site-info') {
          
          updateSite.mutate({type: 'info', input:{ name: values.name!, description: values.description!, website: values.website!, uid: data?.user.sid }})
        }
        if (type === 'edit-site-logo') {
          updateSite.mutate({type: 'logo', input:{ type: "html", content: values.logo!, uid: data?.user.sid }})
        }
        if (type === 'edit-site-icon') {
          updateSite.mutate({type: 'icon', input:{ icon: values.icon!, uid: data?.user.sid }})
        }
        if (type === 'edit-site-theme') {
          updateSite.mutate({type: 'theme', input:{ theme: selectedColor?.slug!, lightAndDarkMode: false,  uid: data?.user.sid }})
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(50, 'Debe tener 30 caracteres como maximo')
          .required('Required'),
      })}
    >
      {({ values }) => (
        <Form  className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
          <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            <div className="flex items-start justify-between">
              <Dialog.Title className="text-lg font-medium text-gray-900">
                Edit
              </Dialog.Title>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={toggleSlideOversForm.actions.setLeft}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flow-root">
                <div>
                  <div className="sm:rounded-md">
                    <div className="bg-white">
                      <div className="grid grid-cols-6 gap-6">
                        {
                          type === 'edit-site-info' &&
                          <>
                            <div className="col-span-6">
                              <FormikComponent label='Name' name='name' type="text" autoComplete="off" />
                            </div>
                            <div className="col-span-6">
                              <FormikComponent label='Description' name='description' type="textarea" rows='10' />
                            </div>
                            <div className="col-span-6">
                              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Web Site Url
                              </label>
                              <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                                  <span className="flex select-none items-center pl-3 text-gray-500  text-sm lg:text-base">https://</span>
                                  <Field
                                    name="website"
                                    type="text"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:leading-6 text-sm lg:text-base"
                                    autoComplete="off"
                                    placeholder="criscms.com"
                                  />

                                </div>
                              </div>
                            </div>
                          </>
                        }
                        {
                          type === 'edit-site-icon' &&
                          <>

                            {!values.icon ?
                              <>
                                <div className="col-span-6">
                                  <FormikComponent label='Icon' name='icon' type="text" autoComplete="off" />

                                </div>
                                <div className='col-span-6'>
                                  <FormikComponentUpload onChange={(event) => onChanges(event)} />
                                </div>
                              </>
                              :
                              <>
                                <div className="col-span-full">
                                  <img src={values.icon} alt="" />
                                  {!state && type === 'edit-site-icon' &&
                                    <div className="mt-2 flex items-center gap-x-3">

                                      <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => { toggle() }}
                                      >
                                        Change
                                      </button>
                                    </div>
                                  }
                                </div>
                                {
                                  state && type === 'edit-site-icon' &&
                                  <>
                                    <div className="col-span-6">
                                      <FormikComponent label='Icon' name='icon' type="text" autoComplete="off" />

                                    </div>
                                    <div className='col-span-6'>
                                      <FormikComponentUpload onChange={(event) => onChanges(event)} />
                                    </div>
                                  </>
                                }
                              </>
                            }
                          </>

                        }
                        {
                          type === 'edit-site-logo' &&
                          <>
                            {
                              !values.logo ?
                                <>
                                  <div className="col-span-6">
                                    <FormikComponent label='Image Url' name='logo' type="text" autoComplete="off" />
                                  </div>
                                  <div className='col-span-6'>
                                    <FormikComponentUpload onChange={(event) => onChanges(event)} />
                                  </div>


                                </>
                                :
                                <>
                                  <div className="col-span-full">
                                    <img src={values.logo} alt="" />
                                    {!state && type === 'edit-site-logo' &&
                                      <div className="mt-2 flex items-center gap-x-3">

                                        <button
                                          type="button"
                                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                          onClick={() => { toggle() }}
                                        >
                                          Change
                                        </button>
                                      </div>
                                    }
                                  </div>
                                  {
                                    state &&
                                    <>
                                      <div className="col-span-6">
                                        <FormikComponent label='Image Url' name='logo' type="text" autoComplete="off" />

                                      </div>
                                      <div className='col-span-6'>
                                        <FormikComponentUpload onChange={(event) => onChanges(event)} />
                                      </div>
                                    </>
                                  }
                                </>
                            }
                          </>

                        }
                        {
                          type === 'edit-site-theme' &&
                          <div className="col-span-6">
                            <h3 className="label-form">Theme</h3>

                            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                              <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                              <div className="grid  grid-cols-9 gap-3 ">
                                {themes.map((color) => (
                                  <RadioGroup.Option
                                    key={color.name}
                                    value={color}
                                    className={({ active, checked }) =>
                                      classNames(
                                        color.selectedClass,
                                        active && checked ? 'ring ring-offset-1' : '',
                                        !active && checked ? 'ring-2' : '',
                                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                      )
                                    }
                                  >
                                    <RadioGroup.Label as="span" className="sr-only">
                                      {color.name}
                                    </RadioGroup.Label>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        color.class,
                                        'h-8 w-8 rounded-full border border-black border-opacity-10'
                                      )}
                                    />
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                        }


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" border-t border-gray-200 p-3 bg-gray-200">
            <div className="group-button-form ">
              <button type="submit" className="btn-primary ">
                
                {updateSite.isLoading
                  ? '...Updating'
                  : 'Update'
                }
              </button>
              <button
                type="button"
                className="btn-default"
                onClick={toggleSlideOversForm.actions.setLeft}
              >
                Cancel
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

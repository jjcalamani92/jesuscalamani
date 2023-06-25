'use client'
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import React from 'react';

import { Page } from '@/src/interfaces/page';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import { typeCategoryPortfolio, typePagePortfolio, uid } from '@/src/utils';
import { useUpdatePage } from '@/src/hooks/react-query/usePage';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { useToggle } from 'ahooks';
import { FormikComponent } from './formik/FormikComponent';
import { FormikComponentUpload } from './formik/FormikComponentUpload';

interface Props {
  type: string
  page?: Page;
}

export function FormPageEdit({ page, type }: Props) {
  let categories: any
  let pag

  const { data } = useSession()
  const [state, { toggle, setLeft, setRight }] = useToggle();
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const updatePage = useUpdatePage(path[2]);
  // const updatePageDescription = useUpdatePageDescription(path[2]);
  // const updatePageThumbnail = useUpdatePageThumbnailUrl(path[2]);

  const queryClient = useQueryClient();
  // const pages = queryClient.getQueryData<Page[]>(["get-pages"])
  
  if (path.length === 3) {
    pag = queryClient.getQueryData(["get-page", path[2]])
    if (page?.data.type === 'category') {
      categories = queryClient.getQueryData(["get-categories-0", path[2]])
    }
    if (page?.data.type === 'blog') {
      categories = queryClient.getQueryData(["get-articles-0", path[2]])
    }
  } 
  // console.log('categories', categories)

  const onChanges = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try {
      for (const file of event.target.files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)
        formData.append('tags', path[2])

        const { secure_url, signature } = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        }).then(r => r.json())
        updatePage.mutate({type: 'thumbnailUrl', input: {thumbnailUrl: secure_url!, uid: data?.user.sid}})

        // console.log('signature', signature)
        // updatePageThumbnail.mutate({ thumbnailUrl: secure_url, uid: data?.user.sid })

      }

    } catch (error) {

    }
  }

  return (
    <Formik
      initialValues={
        {
          id: page?._id as string,
          name: page?.data.name as string,
          description: page?.data.description as string,
          siteId: uid,
          parentId: uid,
          uid: data?.user.sid,
          type: page?.data.type as string,
          thumbnailUrl: page?.data.thumbnailUrl
        }
      }
      onSubmit={(values) => {
        if (type === 'edit-page') {
          updatePage.mutate({type: 'info', input: {name: values.name , description: values.description, type: values.type, uid: values.uid}})
          // console.log('values', {type: 'info', input: {name: values.name , description: values.description, type: values.type, uid: values.uid}})
        }
        
        if (type === 'edit-page-thumbnail') {
          updatePage.mutate({type: 'thumbnailUrl', input: {thumbnailUrl: values.thumbnailUrl!, uid: values.uid}})
          // console.log('values', {...values})
          // updatePageThumbnail.mutate({ thumbnailUrl: values.thumbnailUrl as string, uid: values.uid as string })
        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(50, 'Debe tener 30 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
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
                        type === 'edit-page' &&
                        <>
                        <div className="col-span-6">
                          <FormikComponent label='Name' name='name' type="text" autoComplete="off"/>
                          
                        </div>
                        <div className="col-span-6">
                          <FormikComponent label='Description' name='description' type="textarea" rows='10' />

                        </div>
                        {
                          categories.length === 0 &&
                        <div className="col-span-6">
                          <h2 className="contents text-sm font-medium text-gray-700">
                            Type
                          </h2>
                          <div className="grid grid-cols-2">
                            { typeCategoryPortfolio.map((data) => (
                              <div
                                className="flex items-center my-2"
                                key={data.label}
                              >
                                <Field
                                  type="radio"
                                  name="type"
                                  value={data.value}
                                />

                                <label className="ml-3 label-form">
                                  {data.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        }
                        </>
                      }

                      
                      {
                        type === 'edit-page-thumbnail' &&

                        <>
                          {
                            !page?.data.thumbnailUrl ?
                              <>
                                <div className="col-span-6">
                                      <FormikComponent label='Image Url' name='thumbnailUrl' type="text" autoComplete="off" />

                                    </div>
                                    <div className='col-span-6'>
                                      <FormikComponentUpload onChange={(event) => onChanges(event)} />
                                    </div>
                              </>

                              :
                              <>
                                <div className="col-span-full">
                                  <img src={page.data.thumbnailUrl} alt="" />
                                  {!state &&
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
                                    <>
                                    <div className="col-span-6">
                                      <FormikComponent label='Image Url' name='thumbnailUrl' type="text" autoComplete="off" />

                                    </div>
                                    <div className='col-span-6'>
                                      <FormikComponentUpload onChange={(event) => onChanges(event)} />
                                    </div>
                                  </>
                                  </>
                                }
                              </>

                          }
                        </>

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
              {updatePage.isLoading 
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
    </Formik>
  );
}

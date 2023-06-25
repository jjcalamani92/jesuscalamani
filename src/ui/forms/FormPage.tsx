'use client'
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import React, { useState, useTransition } from 'react';

import { CreatePage, Page } from '@/src/interfaces/page';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import { SwalMessage, getType, type, typePagePortfolio, uid } from '@/src/utils';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { FormikComponent } from './formik/FormikComponent';
import { useCreatePage } from '@/src/hooks/react-query/usePage';
// import { useCreatePage } from '@/src/hooks/usePage';
// import { useCreatePage } from '@/src/hooks/usePage';
// import { useCreatePage, useUpdatePageById } from '@/hooks/usePages';

interface Props {
  page?: Page;
}

export function FormPage(props: Props) {
  let categories: any
  let pag
  const { page } = props;
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const createPage = useCreatePage();
  // const updatePage = useCreatePage();
  // const updatePage = useCreatePage(type);
  // const updatePage = useCreatePage(path[2]);
  const { data } = useSession()

  // const router = useRouter()
  const queryClient = useQueryClient();
  const pages = queryClient.getQueryData<Page[]>(["get-pages"])
  
  if (path.length === 3) {
    pag = queryClient.getQueryData(["get-page", path[2]])
    if (page?.data.type === 'category') {
      categories = queryClient.getQueryData(["get-categories-0", path[2]])
    }
    if (page?.data.type === 'blog') {
      categories = queryClient.getQueryData(["get-articles-0", path[2]])
    }
  } 


  return (
    <Formik
      initialValues={
         {
            name: '',
            description: 'Page description',
            uid: data?.user.sid,
            type: '',
            parentId: uid,
            siteId: uid,
          }
      }
      onSubmit={(values) => {
        createPage.mutate(values)
        // console.log('values', values)
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
              {page ? 'Edit Page' : 'New Page'}
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
                      <div className="col-span-6">
                        <FormikComponent label='Name' name='name' type="text" autoComplete="off"/>
                      </div>

                      <div className="col-span-6">
                        <FormikComponent label='Description' name='description' type="textarea" rows='10' />
                      </div>

                      <React.Fragment>
                        {
                          path.length === 2 &&
                        
                        <div className="col-span-6">
                          <h2 className="contents text-sm font-medium text-gray-700">
                            Type
                          </h2>
                          <div className="grid grid-cols-2">
                            { typePagePortfolio.filter((data) => !getType(pages!)?.includes(data.value)).map((data) => (
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
                        {
                          categories?.length === 0 &&
                        
                        <div className="col-span-6">
                          <h2 className="contents text-sm font-medium text-gray-700">
                            Type
                          </h2>
                          <div className="grid grid-cols-2">
                            { typePagePortfolio.map((data) => (
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
                      </React.Fragment>
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

              {createPage.isLoading
                  ? '...Saving'
                  : 'Save'}
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

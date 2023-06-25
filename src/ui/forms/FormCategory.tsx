import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React, { useState, useTransition } from 'react';
import { Category, CreateCategory } from '@/src/interfaces/category';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import { typeCategoryPortfolio } from '@/src/utils';
import { useRouter } from 'next/navigation';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { Page } from '@/src/interfaces/page';
import { useCreateCategory } from '@/src/hooks/react-query/useCategory';
import { useSession } from 'next-auth/react';
import { FormikComponent } from './formik/FormikComponent';


interface Props {
  category?: Category;
}

export function FormCategory(props: Props) {
  const { category } = props;
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const { data } = useSession()

  const queryClient = useQueryClient()
  const createCategory = useCreateCategory();
 
  

  return (
    <Formik
      initialValues={
          {
            name: '',
            description: 'Page description',
            uid: data?.user.sid,
            type: '',
            siteId: process.env.NEXT_PUBLIC_SITE_UID as string,
          }
      }
      onSubmit={(values) => {
        
          if (path.length === 3) {
            const page = queryClient.getQueryData<Page>([`get-page`, path[2]])
            createCategory.mutate({ i: "0", input: { ...values, parentId: path[2], paths: page?.data.params.paths } as CreateCategory })
          }
          if (path.length === 4) {
            let category = queryClient.getQueryData<Category>([`get-${path[2]}`, path[3]])
            let i = path[2].replace('category','')
            // console.log('category', category)
            // console.log('values', { ...values, parentId: path[3], paths: category?.data.params.paths })
            createCategory.mutate({ i: `${+i+1}`, input: { ...values, parentId: path[3], paths: category?.data.params.paths } as CreateCategory })
          }
          
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(50, 'Debe tener 30 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {category ? 'Edit Category' : 'New Category'}
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
                      
                      <div className="col-span-6">
                        <h2 className="contents text-sm font-medium text-gray-700">
                          Type
                        </h2>
                        <div className="grid grid-cols-2">
                          <React.Fragment>
                            {
                              typeCategoryPortfolio.map((data) => (
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
                          </React.Fragment>
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-t border-gray-200 p-3 bg-gray-200">
          <div className="group-button-form ">
            <button type="submit" className="btn-primary">
              { createCategory.isLoading
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

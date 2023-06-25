// 'use client'
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Category, CreateCategory } from '@/src/interfaces/category';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import { useUpdateCategory } from '@/src/hooks/react-query/useCategory';
import { useSession } from 'next-auth/react';
import { useToggle } from 'ahooks';
import { FormikComponent } from './formik/FormikComponent';
import { FormikComponentUpload } from './formik/FormikComponentUpload';
import { useQueryClient } from '@tanstack/react-query';
import { Component } from '@/src/interfaces/site';
import { useUpdateSiteComponent } from '@/src/hooks/react-query/useSite';
import { type, uid } from '@/src/utils';


interface Props {
  component: string
  category?: Category;
  layout: Component
}

export function FormComponentPortfolio({ category, component, layout }: Props) {
  const { data } = useSession()
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  // const updateCategory = useUpdateCategory(path[3]);
  const updateSiteComponent = useUpdateSiteComponent();


  return (
    <Formik
      initialValues={

        {
          // id: category?._id as string,
          uid: data?.user.sid,
          h1: layout.content.h1,
          h2: layout.content.h2,
          h3: layout.content.h3,
          h4: layout.content.h4,
          h5: layout.content.h5,
          p: layout.content.p,
          c1: layout.content.c1,
          c2: layout.content.c2,

        }

      }
      onSubmit={(values) => {
        {
          layout.component === '<HomeP1/>' &&
          updateSiteComponent.mutate({type: type, id: uid, component: 'Home', uid: values.uid, content: {
            h1: values.h1, h2: values.h2, h3: values.h3, p: values.p, c1: values.c1, c2: values.c2
          }})
          // updateSiteComponentAction({type: type, id: uid, component: 'Home', uid: values.uid, content: {
          //   h1: values.h1, h2: values.h2, h3: values.h3, p: values.p, c1: values.c1, c2: values.c2
          // }})
          // console.log('first', {type: type, id: uid, component: 'Home', uid: values.uid, content: {
          //   h1: values.h1, h2: values.h2, h3: values.h3, p: values.p, c1: values.c1, c2: values.c2
          // }})
        }
      }}
      // validationSchema={Yup.object({
      //   // name: Yup.string()
      //   //   .max(50, 'Debe tener 30 caracteres como maximo')
      //   //   .required('Required'),
      // })}
    >
      <Form
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
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
                        layout.component === '<HomeP0/>' &&
                        <>
                          <div className="col-span-6">
                            <FormikComponent label='Title' name='h1' type="text" autoComplete="off" />
                          </div>


                          <div className="col-span-6">
                            <FormikComponent label='Content' name='p' type="textarea" rows='10' />
                          </div>
                        </>
                      }
                      {
                        layout.component === '<HomeP1/>' &&
                        <>
                          <div className="col-span-6">
                            <FormikComponent label='Title Left' name='h1' type="text" autoComplete="off" />
                          </div>
                          <div className="col-span-6">
                            <FormikComponent label='Title Color' name='h2' type="text" autoComplete="off" />
                          </div>
                          <div className="col-span-6">
                            <FormikComponent label='Title Right' name='h3' type="text" autoComplete="off" />
                          </div>
                          <div className="col-span-6">
                            <FormikComponent label='Content' name='p' type="textarea" rows='10' />
                          </div>
                          <div className="col-span-6">
                            <FormikComponent label='Color 1' name='c1' type="text" autoComplete="off" />
                          </div>
                          <div className="col-span-6">
                            <FormikComponent label='Color 2' name='c2' type="text" autoComplete="off" />
                          </div>
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
            <button type="submit" className="btn-primary">
              {
                updateSiteComponent.isLoading
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

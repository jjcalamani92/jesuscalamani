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

interface Props {
  type: string
  category?: Category;
}

export function FormCategoryEdit({ category, type }: Props) {
  const { data } = useSession()
  const [state, { toggle, setLeft, setRight }] = useToggle();

  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const updateCategory = useUpdateCategory(path[3]);
  const i = path[2].slice(8)
  const onChanges = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    try {
      for (const file of event.target.files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)
        formData.append('tags', path[3])

        const { secure_url, } = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        }).then(r => r.json())
        updateCategory.mutate({ i: i, type: 'thumbnailUrl',  input: { thumbnailUrl: secure_url, uid: data?.user.sid } })
        // updateCategoryThumbnailUrl.mutate({ i: i, input: { thumbnailUrl: secure_url, uid: data?.user.sid } })


      }

    } catch (error) {

    }
  }

  return (
    <Formik
      initialValues={

        {
          id: category?._id as string,
          name: category?.data.name,
          description: category?.data.description,
          siteId: process.env.NEXT_PUBLIC_SITE_UID,
          parentId: category?.parentId,
          uid: data?.user.sid,
          type: category?.data.type,
          thumbnailUrl: category?.data.thumbnailUrl

        }

      }
      onSubmit={(values) => {

        if (type === 'edit-category') {
          
          updateCategory.mutate({ i: i, type: 'info',  input: { name: values.name!, description: values.description!, type: values.type!, uid: values.uid } })
          // console.log('values', { i: i, type: 'info',  input: { name: values.name!, description: values.description!, type: values.type!, uid: values.uid } })
        }
        if (type === 'edit-category-description') {

          // updateCategoryDescription.mutate({ i: i, input: { description: values.description!, uid: values.uid } })
        }
        if (type === 'edit-category-thumbnail') {
          updateCategory.mutate({ i: i, type: 'thumbnailUrl',  input: { thumbnailUrl: values.thumbnailUrl!, uid: values.uid } })
          // updateCategoryThumbnailUrl.mutate({ i: i, input: { thumbnailUrl: values.thumbnailUrl!, uid: values.uid } })
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
                        type === 'edit-category' &&
                        <>
                        <div className="col-span-6">
                          <FormikComponent label='Name' name='name' type="text" autoComplete="off"/>
                        </div>
                     

                        <div className="col-span-6">
                          <FormikComponent label='Description' name='description' type="textarea" rows='10' />
                        </div>
                        </>
                      }

                      {
                        type === 'edit-category-thumbnail' &&

                        <>
                          {
                            !category?.data.thumbnailUrl ?
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
                                  <img src={category.data.thumbnailUrl} alt="" />
                                  {!state &&
                                    <div className="mt-2 flex items-center gap-x-3">

                                      <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => toggle()}
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
                                      <FormikComponent label='Image Url' name='thumbnailUrl' type="text" autoComplete="off" />

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
                updateCategory.isLoading
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

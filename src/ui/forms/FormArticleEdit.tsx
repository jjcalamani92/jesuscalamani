'use client'
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import React from 'react';
import { usePath } from '@/src/hooks/usePath';
import { useUI } from '@/src/providers/UIProvider';
import {  uid } from '@/src/utils';
import { useSession } from 'next-auth/react';
import { useToggle } from 'ahooks';
import { Article } from '@/src/interfaces/article';
import { useUpdateArticle } from '@/src/hooks/react-query/useArticle';
import { FormikComponent } from './formik/FormikComponent';
import { FormikComponentUpload } from './formik/FormikComponentUpload';

interface Props {
  type: string
  article?: Article;
}

export function FormArticleEdit({ article, type }: Props) {
  const { data } = useSession()
  const [state, { toggle, setLeft, setRight }] = useToggle();
  const path = usePath();

  const { toggleSlideOversForm } = useUI();
  const updateArticle = useUpdateArticle(path[2]);

  

  const onDelete = async () => {
    // cloudinary.uploader.destroy("ay6ru7fkxatfj1sar45y", function(error,result) {
    //   console.log(result, error) })
    //   .then(resp => console.log(resp))
    //   .catch(_err=> console.log("Something went wrong, please try again later."));
    const formData = new FormData()
       
        formData.append('public_id', "ay6ru7fkxatfj1sar45y")
        formData.append('signature', "public_id=ay6ru7fkxatfj1sar45y&timestamp=1684782360780")
        formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
        formData.append('timestamp', `${ new Date().getTime()}`)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_UPLOAD_PRESET)


        await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`, {
          method: 'POST',
          body: formData
        }).then(r => r.json())
    console.log('delete')

    // const formData = new FormData()
       
    //     formData.append('public_id', "ay6ru7fkxatfj1sar45y")
    //     formData.append('signature', "e8c5c288b4e931535c9f18c15a98a303d0925859")
    //     formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
    //     formData.append('timestamp', "1684764581")

    //     await fetch(`https://${process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY}:${process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/image/ay6ru7fkxatfj1sar45y`, {
    //       method: 'DELETE',
    //     }).then(r => r.json())
    // console.log('delete')
  }

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
        // const data = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          //   method: 'POST',
          //   body: formData
          // }).then(r => r.json())
          // console.log('data', data)
          const { public_id, secure_url, signature } = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: formData
          }).then(r => r.json())
          console.log('data', {public_id, secure_url, signature})

        updateArticle.mutate({type: 'thumbnailUrl', input:{ thumbnailUrl: secure_url, uid: data?.user.sid }})


      }

    } catch (error) {

    }
  }

  return (
    <Formik
      initialValues={
        {
          id: article?._id as string,
          name: article?.data.name,
          description: article?.data.description,
          siteId: uid,
          parentId: uid,
          uid: data?.user.sid,
          thumbnailUrl: article?.data.thumbnailUrl
        }
      }
      onSubmit={(values) => {
        if (type === 'edit-article') {
          updateArticle.mutate({type: 'info', input: { name: values.name as string, description: values.description!, uid: values.uid as string }})
        }
        if (type === 'edit-article-description') {
          // updateArticleDescription.mutate({ description: values.description!, uid: values.uid as string })
        }
        if (type === 'edit-article-thumbnail') {
          // console.log('values', {...values})
          // updateArticleThumbnail.mutate({ thumbnailUrl: values.thumbnailUrl as string, uid: values.uid as string })
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
                        type === 'edit-article' &&
                        <>
                        <div className="col-span-6">
                          <FormikComponent label='Name' name='name' type="text" autoComplete="off" />

                        </div>
                        <div className="col-span-6">
                          <FormikComponent label='Description' name='description' type="textarea" rows='10' />
                        </div>
                        </>
                      }

                      {
                        type === 'edit-article-thumbnail' &&

                        <>
                          {
                            !article?.data.thumbnailUrl ?
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
                                  <img src={article.data.thumbnailUrl} alt="" />
                                  {!state &&
                                    <div className="mt-2 flex items-center gap-x-3">

                                      <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        onClick={() => {toggle(), onDelete()}}
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
            <button type="submit" className="btn-primary ">

              {updateArticle.isLoading 
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

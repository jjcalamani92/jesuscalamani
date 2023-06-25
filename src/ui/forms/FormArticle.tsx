
import { useCreateArticle } from '@/src/hooks/react-query/useArticle';
import { usePath } from '@/src/hooks/usePath';
import { Article, CreateArticle } from '@/src/interfaces/article';
import { useUI } from '@/src/providers/UIProvider';
import { uid } from '@/src/utils';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { FormikComponent } from './formik/FormikComponent';



interface Props {
  article?: Article;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormArticle(props: Props) {
  const { article } = props;
  // const { data: session } = useSession();
  const path = usePath();
  const { data } = useSession()
  const { toggleSlideOversForm } = useUI();
  const createArticle = useCreateArticle();

  return (
    <Formik
      initialValues={
        {
          name: '',
          description: 'Article description',
          uid: data?.user.sid,
          siteId: uid,
          parentId: '',
        }
      }
      onSubmit={(values) => {


        

          if (path.length === 3) {
            createArticle.mutate({ i: "0", input: { ...values, parentId: path[2] } as CreateArticle });
          }
          if (path.length === 4) {
            let i = path[2].replace('category','')
            createArticle.mutate({ i: `${+i+1}`, input: { ...values, parentId: path[3] } as CreateArticle });
          }
          
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(100, 'Debe tener 100 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form
        // onSubmit={handleSubmit}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {article ? 'Edit Article' : 'New Article'}
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
              {createArticle.isLoading
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

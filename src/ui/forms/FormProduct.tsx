
import { useCreateProduct } from '@/src/hooks/react-query/useProduct';
import { usePath } from '@/src/hooks/usePath';
import { Product, CreateProduct } from '@/src/interfaces/product';
import { useUI } from '@/src/providers/UIProvider';
import { uid } from '@/src/utils';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { Category } from '@/src/interfaces/category';
import { FormikComponent } from './formik/FormikComponent';



interface Props {
  product?: Product;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormProduct(props: Props) {
  const { product } = props;
  // const { data: session } = useSession();
  const path = usePath();
  const { data } = useSession()
  const { toggleSlideOversForm } = useUI();
  const createProduct = useCreateProduct();
  const queryClient = useQueryClient();
  let category = queryClient.getQueryData<Category>([`get-${path[2]}`, path[3]])

  return (
    <Formik
      initialValues={
        {
          name: '',
          description: 'Product description',
          price: 0,
          type: category?.data.name,
          uid: data?.user.sid,
          siteId: uid,
          parentId: path[3],
        }
      }
      onSubmit={(values) => {
          if (path.length === 3) {
            createProduct.mutate({ i: "0", input: { ...values, parentId: path[2] } as CreateProduct });
          }
          if (path.length === 4) {
            let i = path[2].replace('category','')
            createProduct.mutate({ i: `${+i+1}`, input: values as CreateProduct });
          }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(100, 'Debe tener 100 caracteres como maximo')
          .required('Required!!'),
      })}
    >
      <Form
        // onSubmit={handleSubmit}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {product ? 'Edit Product' : 'New Product'}
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
                        <FormikComponent label='Price [Bs]' name='price' type="number"/>
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
              {createProduct.isLoading
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


import { useCreateArticle, useCreateArticles } from '@/src/hooks/react-query/useArticle';
import { usePath } from '@/src/hooks/usePath';
import { Article, CreateArticle } from '@/src/interfaces/article';
import { useUI } from '@/src/providers/UIProvider';
import { type, uid, url, v } from '@/src/utils';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSession } from 'next-auth/react';
import * as Yup from 'yup';
import { FormikComponent } from './formik/FormikComponent';
import { FormikComponentUpload } from './formik/FormikComponentUpload';
import { FormikComponentUploadFiles } from './formik/FormikComponentUploadFiles';
import React from 'react';
import { addArticles } from '@/src/lib/articles';



interface Props {
  article?: Article;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormArticles(props: Props) {
  const { article } = props;
  // const { data: session } = useSession();

  const path = usePath();
  const { data } = useSession()
  const { toggleSlideOversForm } = useUI();
  const createArticle = useCreateArticles();

  const onChanges = async (event: any) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }
    const fileContent = event.target.result;
    const jsonContent = JSON.parse(fileContent);

    // if (path.length === 3) {
    //   createArticle.mutate({ i: "0", input: file });
    // }
    // if (path.length === 4) {
    //   let i = path[2].replace('category','')
    //   createArticle.mutate({ i: `${+i+1}`, input: file });
    // }
  }

  // const handleFileChange = (event:any) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };

  // const handleUpload = () => {
  //   if (selectedFile) {
  //     const reader = new FileReader();

  //     reader.onload = (event: any) => {
  //       const fileContent = event.target.result;
  //       const jsonContent = JSON.parse(fileContent);

  //       // Aquí puedes procesar los datos del archivo JSON
  //       console.log('Datos del archivo JSON:', jsonContent);
  //     };

  //     reader.readAsText(selectedFile);
  //   } else {
  //     console.log('No se ha seleccionado ningún archivo.');
  //   }
  // };

  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileChange = (event:any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleUpload = async () => {
    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = async (event:any) => {
        const fileContent = event.target.result;
        const jsonContent = JSON.parse(fileContent);

        try {
          // await addArticles(jsonContent)
          if (path.length === 3) {
            createArticle.mutate({ i: "0", input: jsonContent, parentId: path[2] });
          }
          if (path.length === 4) {
            let i = path[2].replace('category','')
            createArticle.mutate({ i: `${+i+1}`, input: jsonContent, parentId: path[3] });
          }
          // const response = await fetch(`${url}/api/${v}/${type}/mutation/articles/add/many`, {
          //   method: 'POST',
          //   // headers: {
          //   //   'Content-Type': 'application/json',
          //   // },
          //   body: JSON.stringify(jsonContent),
          // });

          // if (response.ok) {
          //   // La solicitud se realizó correctamente
          //   console.log('Archivo JSON enviado con éxito.');
          // } else {
          //   // Hubo un error en la solicitud
          //   console.error('Error al enviar el archivo JSON.');
          // }
        } catch (error) {
          console.error('Error al enviar la solicitud:', error);
        }
      };

      reader.readAsText(selectedFile);
    } else {
      console.log('No se ha seleccionado ningún archivo.');
    }
  };
  // const handleUpload = async () => {
  //   if (selectedFile) {
  //     const reader = new FileReader();

  //     reader.onload = async (event:any) => {
  //       const fileContent = event.target.result;
  //       const jsonContent = JSON.parse(fileContent);

  //       try {
  //         const response = await axios.post(`${url}/api/${v}/${type}/mutation/articles/add/many`, jsonContent, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });

  //         console.log('Archivo JSON enviado con éxito:', response.data);
  //       } catch (error) {
  //         console.error('Error al enviar el archivo JSON:', error);
  //       }
  //     };

  //     reader.readAsText(selectedFile);
  //   } else {
  //     console.log('No se ha seleccionado ningún archivo.');
  //   }
  // };

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




        // if (path.length === 3) {
        //   createArticle.mutate({ i: "0", input: { ...values, parentId: path[2] } as CreateArticle });
        // }
        // if (path.length === 4) {
        //   let i = path[2].replace('category', '')
        //   createArticle.mutate({ i: `${+i + 1}`, input: { ...values, parentId: path[3] } as CreateArticle });
        // }

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
              New Articles
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

                      <div className='col-span-6'>
                        <FormikComponentUploadFiles onChange={(event) => onChanges(event)} />
                      </div>
                      <div className='col-span-6'>
                        <input type="file" accept=".json" onChange={handleFileChange} />
                        <button onClick={handleUpload}>Subir archivo</button>
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

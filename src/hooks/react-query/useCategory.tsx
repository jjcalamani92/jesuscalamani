import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { addCategory, deleteCategories, getCategoriesByParentId, getCategoryById, updateCategoryDescription, updateCategoryName, updateCategoryThumbnailUrl } from "../lib/categories";
import { Category, CreateCategory, UpdateCategoryInfo, UpdateCategoryThumbnailUrl } from "@/src/interfaces/category";
import { useUI } from "@/src/providers/UIProvider";
import { SwalMessage, SwalMessageError, SwalMessageTime } from "@/src/utils";
import { useSelection } from "@/src/providers/SelectionProvider";
import Swal from "sweetalert2";
import { addCategory, deleteCategories, deleteCategoriesByParentId, getCategories, getCategoriesByParentId, getCategory, getCategoryById, updateCategory } from "@/src/lib/categories";

interface MutationAddProps {
  i: string
  input: CreateCategory
}

export const useCreateCategory = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( {i, input}: MutationAddProps) => addCategory(i, input),
    onSuccess: async (data, {i, input}) => {
      queryClient.invalidateQueries([`get-categories-${i}`, input.parentId]);
      // await SwalMessage('Category Created');
      toggle();
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-left',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      })
      await Toast.fire({
        icon: 'success',
        title: 'Success'
      })
    },
    onError: (err) => {
      // console.log('err', err)
      SwalMessageError(err as string);
    },
  });
}

interface MutationDeleteProps {
  i: string
  parentId: string
  ids: string[]
}

export const useDeleteCategories = ( ) => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();

  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async ({i, ids}: MutationDeleteProps) => await deleteCategoriesByParentId(i, ids),
      onSuccess:  (data, {i, parentId}) => {
        console.log('data', data)
        queryClient.invalidateQueries([`get-categories-${i}`, parentId])
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error as string,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );
}


interface UpdateCategory {
  i: string
  type: string
  input: UpdateCategoryInfo | UpdateCategoryThumbnailUrl
}

export const useUpdateCategory = (id: string) => {
  const {
    toggleSlideOversForm: {
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({i, type, input }: UpdateCategory) => updateCategory(i, id, type,  input),
    onSuccess: async (data, {i, input}) => {
      queryClient.invalidateQueries([`get-category${i}`, id])
      // queryClient.invalidateQueries([`get-page`, id]);
      await SwalMessageTime(data.message, 1500);
      toggle();
    },
    onError: (err) => {
      // SwalMessageError(err as string);
    },
  });
}

// interface MutationUpdateNameProps {
//   i: string
//   input: UpdateCategoryName
// }

// export const useUpdateCategoryName = (id: string) => {
//   const {
//     toggleSlideOversForm: {
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({i, input}: MutationUpdateNameProps) => updateCategoryName(i, id, input),
//     onSuccess: async ({}, {i}) => {
//       queryClient.invalidateQueries([`get-category${i}`, id]);
//       await SwalMessageTime('Name Updated', 1500);
//       toggle();
//     },
//     onError: (err) => {
//       SwalMessageError(err as string);
//     },
//   });
// }

// interface MutationUpdateDescriptionProps {
//   i: string
//   input: UpdateCategoryDescription
// }

// export const useUpdateCategoryDescription = (id: string) => {
//   const {
//     toggleSlideOversForm: {
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({i, input}: MutationUpdateDescriptionProps) => updateCategoryDescription(i, id, input),
//     onSuccess: async ({}, {i}) => {
//       queryClient.invalidateQueries([`get-category${i}`, id]);
//       await SwalMessageTime('Description Updated', 1500);
//       toggle();
//     },
//     onError: (err) => {
//       SwalMessageError(err as string);
//     },
//   });
// }
// interface MutationUpdateThumbnailUrlProps {
//   i: string
//   input: UpdateCategoryThumbnailUrl
// }

// export const useUpdateCategoryThumbnailUrl = (id: string) => {
//   const {
//     toggleSlideOversForm: {
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async ({i, input}: MutationUpdateThumbnailUrlProps) => updateCategoryThumbnailUrl(i, id, input),
//     onSuccess: async ({}, {i}) => {
//       queryClient.invalidateQueries([`get-category${i}`, id]);
//       await SwalMessageTime('Thumbnail Updated', 1500);
//       toggle();
//     },
//     onError: (err) => {
//       SwalMessageError(err as string);
//     },
//   });
// }

export const useGetCategoryById = (i:string, category: Category) => {
  return useQuery({
    queryKey: [ `get-category${i}`, category._id],
    queryFn: () => getCategoryById(i, category._id),
    initialData: category
  });
};

export const useGetCategories = ( i: string, sid: string, categories: Category[]) => {
  return useQuery({
    queryKey: [ `get-categories-${i}`, sid],
    queryFn: () => getCategoriesByParentId(i, sid),
    initialData: categories
  });
};
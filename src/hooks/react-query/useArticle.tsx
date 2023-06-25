import { Article, CreateArticle, UpdateArticleContent, UpdateArticleInfo, UpdateArticleThumbnailUrl } from "@/src/interfaces/article";
import { addArticle, addArticles, deleteArticles, getArticleById, getArticlesByParentId, updateArticle } from "@/src/lib/articles";
import { useSelection } from "@/src/providers/SelectionProvider";
import { useUI } from "@/src/providers/UIProvider";
import { SwalMessage, SwalMessageError, SwalMessageTime } from "@/src/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";

interface MutationAddsProps {
  i: string
  parentId: string
  input: any
}

export const useCreateArticles = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ input, parentId}: MutationAddsProps) => addArticles(input),
  
    onSuccess: async (data, {i, input, parentId}) => {
      queryClient.invalidateQueries([`get-articles-${i}`, parentId]);
      await SwalMessage('article Created');
      toggle();
    },
    onError: (err) => {
      // console.log('err', err)
      SwalMessageError(err as string);
    },
  });
}

interface MutationAddProps {
  i: string
  input: CreateArticle
}

export const useCreateArticle = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ input}: MutationAddProps) => addArticle(input),
  
    onSuccess: async (data, {i, input}) => {
      queryClient.invalidateQueries([`get-articles-${i}`, input.parentId]);
      await SwalMessage('article Created');
      toggle();
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


export const useDeleteArticles = ( ) => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();

  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async ({ids}: MutationDeleteProps) => await deleteArticles(ids),
      onSuccess:  ({}, {i, parentId}) => {
        queryClient.invalidateQueries([`get-articles-${i}`, parentId])
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

interface UpdateArticle {
  type: string
  input: UpdateArticleInfo | UpdateArticleThumbnailUrl | UpdateArticleContent
}

export const useUpdateArticle = (id: string) => {
  const {
    toggleSlideOversForm: {
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, input }: UpdateArticle) => updateArticle(type, id, input),
    onSuccess: async (data, { type, input }) => {
      queryClient.invalidateQueries([`get-article`, id]);
      await SwalMessageTime(data.message, 1500);
      // await SwalMessage(data.message);
      if (type !== 'content') {
        toggle();
      }
      // toggle();
    },
    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
}

// export const useUpdateArticleName = (id: string) => {
//   const {
//     toggleSlideOversForm: {
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (input: UpdateArticleName) => updateArticleName( id, input),
//     onSuccess: async ({}, ) => {
//       queryClient.invalidateQueries([`get-article`, id]);
//       await SwalMessageTime('Name Updated', 1500);
//       toggle();
//     },
//     onError: (err) => {
//       SwalMessageError(err as string);
//     },
//   });
// }

// export const useUpdateArticleDescription = (id: string) => {
//   const {
//     toggleSlideOversForm: {
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (input: UpdateArticleDescription) => updateArticleDescription( id, input),
//     onSuccess: async ({}, ) => {
//       queryClient.invalidateQueries([`get-article`, id]);
//       await SwalMessageTime('Description Updated', 1500);
//       toggle();
//     },
//     onError: (err) => {
//       SwalMessageError(err as string);
//     },
//   });
// }

// export const useUpdateArticleThumbnailUrl = (id: string) => {
//   const {
//     toggleSlideOversForm: {
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (input: UpdateArticleThumbnailUrl) => updateArticleThumbnailUrl( id, input),
//     onSuccess: async ({}, ) => {
//       queryClient.invalidateQueries([`get-article`, id]);
//       await SwalMessageTime('ThumbnailUrl Updated', 1500);
//       toggle();
//     },
//     onError: (err) => {
//       SwalMessageError(err as string);
//     },
//   });
// }

// export const useUpdateArticleContentById = ( id: string) => {
//   const {
//     toggleSlideOversForm: {
//       value,
//       actions: { toggle, setLeft },
//     },
//   } = useUI();
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (input: UpdateArticleContent) => updateArticleContent( id, input),


//     onSuccess: async (data) => {
//       queryClient.invalidateQueries([`get-article`, id]);
//       await SwalMessageTime('Content Updated', 1500);

//       // toggle();
//     },
//     onError: (err) => {
//       // console.log('err', err)
//       SwalMessageError(err as string);
//     },
//   });
// }

export const useGetArticleById = (article: Article) => {
  return useQuery({
    queryKey: [ `get-article`, article._id ],
    queryFn: () => getArticleById( article._id),
    initialData: article
  });
};

export const useGetArticlesByParentId = (i: string, parentId: string, articles: Article[]) => {
  return useQuery({
    queryKey: [ `get-articles-${i}`, parentId],
    queryFn: () => getArticlesByParentId( parentId),
    initialData: articles
  });
};
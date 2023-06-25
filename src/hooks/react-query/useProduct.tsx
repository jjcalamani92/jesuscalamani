import { Article, CreateArticle, UpdateArticleContent, UpdateArticleInfo, UpdateArticleThumbnailUrl } from "@/src/interfaces/article";
import { CreateProduct, Product } from "@/src/interfaces/product";
import { addArticle, deleteArticles, getArticleById, getArticlesByParentId, updateArticle } from "@/src/lib/articles";
import { addProduct, getProductsByParentId } from "@/src/lib/products";
import { useSelection } from "@/src/providers/SelectionProvider";
import { useUI } from "@/src/providers/UIProvider";
import { SwalMessage, SwalMessageError, SwalMessageTime } from "@/src/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Swal from "sweetalert2";

interface MutationAddProps {
  i: string
  input: CreateProduct
}

export const useCreateProduct = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ input}: MutationAddProps) => addProduct(input),
  
    onSuccess: async (data, {i, input}) => {
      queryClient.invalidateQueries([`get-products-${i}`, input.parentId]);
      await SwalMessage(data.message);
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



export const useGetArticleById = (article: Article) => {
  return useQuery({
    queryKey: [ `get-article`, article._id ],
    queryFn: () => getArticleById( article._id),
    initialData: article
  });
};

export const useGetProductsByParentId = (i: string, parentId: string, products: Product[]) => {
  return useQuery({
    queryKey: [ `get-products-${i}`, parentId],
    queryFn: () => getProductsByParentId( parentId),
    initialData: products
  });
};
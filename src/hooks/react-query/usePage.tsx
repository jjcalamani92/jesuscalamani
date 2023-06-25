import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUI } from "@/src/providers/UIProvider";
import { CreatePage, Page, UpdatePageInfo, UpdatePageThumbnailUrl } from "@/src/interfaces/page";
import { addPage, deletePages, deletePagesByParentId, getPage, getPageById, getPages, getPagesByParentId, updatePage } from "@/src/lib/pages";
import { useSelection } from "@/src/providers/SelectionProvider";
import Swal from "sweetalert2";
import { SwalMessage, SwalMessageError } from "@/src/utils";

export const useCreatePage = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePage) => addPage(input),
  
    onSuccess: async (data, variables) => {
      queryClient.invalidateQueries([`get-pages`]);
      await SwalMessage(data.message);
      toggle();
    },

    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
}

interface UpdatePage {
  type: string
  input: UpdatePageInfo | UpdatePageThumbnailUrl
}

export const useUpdatePage = (id: string) => {
  const {
    toggleSlideOversForm: {
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, input }: UpdatePage) => updatePage(type, id, input),
    onSuccess: async (data, {input}) => {
      queryClient.invalidateQueries([`get-page`, id]);
      // await SwalMessageTime('Info Updated', 1500);
      await SwalMessage(data.message);
      toggle();
      // toggle();
    },
    onError: (err) => {
      // SwalMessageError(err as string);
    },
  });
}

export const useDeletePages = ( ) => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();

  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (ids: string[]) => await deletePagesByParentId( ids),
      onSuccess:  (data, ids) => {
        console.log('data', data)
        queryClient.invalidateQueries([`get-pages`])
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
export const useGetPageById = ( page: Page) => {
  return useQuery({
    queryKey: [`get-page`, page._id],
    queryFn: () => getPageById( page._id),
    initialData: page
  });
};
export const useGetPages = (type: string, pages: Page[]) => {
  return useQuery({
    queryKey: [`get-pages`],
    queryFn: () => getPagesByParentId(),
    initialData: pages
  });
};
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Site, UpdateSiteComponent, UpdateSiteIcon, UpdateSiteInfo, UpdateSiteLogo, UpdateSiteTheme } from "@/src/interfaces/site";
import { getSite, getSiteById, updateSite, updateSiteComponent } from "@/src/lib/sites";
import { useUI } from "@/src/providers/UIProvider";
import { SwalMessage, SwalMessageError, SwalMessageTime } from "@/src/utils";

interface UpdateSite {
  type: string
  input: UpdateSiteInfo | UpdateSiteTheme | UpdateSiteLogo | UpdateSiteIcon
}

export const useUpdateSite = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ type, input }: UpdateSite) => updateSite(type, input),
    onSuccess: async ({data},{ type }) => {
      queryClient.invalidateQueries([`get-site`,]);
      await SwalMessage(data.message);
      toggle();
    },
    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
}
export const useUpdateSiteComponent = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: UpdateSiteComponent) => updateSiteComponent(input),
    onSuccess: async ({data},{ type }) => {
      queryClient.invalidateQueries([`get-site`,]);
      await SwalMessage(data.updateSiteComponent);
      toggle();
    },
    onError: (err) => {
      SwalMessageError(err as string);
    },
  });
}

export const useGetSite = (site: Site) => {
  return useQuery({
    queryKey: [`get-site`],
    queryFn: () => getSiteById(),
    initialData: site
  });
};
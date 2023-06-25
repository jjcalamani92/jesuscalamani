import {
  Component,
  Content,
  Site,
  UpdateSiteComponent,
  UpdateSiteIcon,
  UpdateSiteInfo,
  UpdateSiteLogo,
  UpdateSiteTheme,
} from "../interfaces/site";
import { uid, url, type, v } from "../utils";

export async function getSiteById(): Promise<Site> {
  const res = await fetch(`${url}/api/${v}/${type}/query/sites/${uid}`, {
    cache :"no-cache"
  });
  return await res.json();
}


export const updateSite = async (
  typeOperation: string,
  input: UpdateSiteInfo | UpdateSiteTheme | UpdateSiteLogo | UpdateSiteIcon
) => {
  try {
    const res = await fetch(
      `${url}/api/${v}/${type}/mutation/sites/${uid}/${typeOperation}`,
      {
        method: "POST",

        body: JSON.stringify(input),
      }
    );

    return await res.json();
  } catch (error) {
    console.error("Error:", error);
  }
};
export const updateSiteComponent = async (
  input: UpdateSiteComponent
) => {
  const mutation = `
    mutation UpdateSiteComponent($input:UpdateSiteComponent!) {
  updateSiteComponent(input: $input)
}
  `;

  const variables = { input };

  const res = await fetch(`${url}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });
  return res.json();
};

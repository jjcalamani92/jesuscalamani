import { CreatePage, Page, UpdatePageInfo, UpdatePageThumbnailUrl } from "../interfaces/page";
import { uid, url, type, v } from "../utils";

export const addPage = async (input: CreatePage) => {
  const res = await fetch(`${url}/api/${v}/${type}/mutation/pages`, {
    method: "POST",
    body: JSON.stringify(input),
    // headers: {
    //   "Content-type": "application/json",
    // },
  });

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message);
  }

  return await res.json();
  
};

export const deletePages = async (ids: string[]) => {
  const res = await fetch(`${url}/api/${v}/${type}/mutation/pages`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: ids }),
  });
  return res.json();
};
export const deletePagesByParentId = async (ids: string[]) => {
  const mutation = `
    mutation DeletePagesByParentId( $type: String!, $ids: [String]!) {
      deletePagesByParentId(type: $type, ids: $ids)
    }
  `;

  const variables = { type: type, ids: ids };
  // console.log('variables', variables)
  const res = await fetch(`${url}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });
  return res.json();
};

export async function getPageById(id: string): Promise<Page> {
  const res = await fetch(`${url}/api/${v}/${type}/query/pages/${id}`);
  return res.json();
}
export async function getPage(type: string, id: string): Promise<Page> {
  const res = await fetch(`${url}/api/${v}/${type}/pages/${id}?type=${type}`);
  return res.json();
}

export async function getPages(type: string): Promise<Page[]> {
  const res = await fetch(
    `${url}/api/${v}/${type}/pages/page/siteId?id=${uid}`
  );
  return res.json();
}

export async function getPagesByParentId(): Promise<Page[]> {
  const res = await fetch(
    `${url}/api/${v}/${type}/query/pages/page/parentId?id=${uid}`, 
  );
  return res.json();
}

export const updatePage = async (
  type: string,
  id: string,
  input: UpdatePageInfo | UpdatePageThumbnailUrl 
) => {
  const res = await fetch(
    `${url}/api/${v}/${type}/mutation/pages/${id}/${type}`,
    {
      method: "POST",
      body: JSON.stringify(input),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    }
  );
  return res.json();
};

export async function getPageBySlug(slug: string): Promise<Page> {
  const res = await fetch(
    `${url}/api/${v}/${type}/query/pages/page/${uid}/${slug}`,
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export async function getPageSeoBySlug(slug: string) {
  const res = await fetch(
    `${url}/api/${v}/${type}/query/pages/page/${uid}/${slug}`,
    // { next: { revalidate: 60 } }
    {cache: 'no-cache'}
  );
  return res.json();
}

export async function getPagesBySiteId(): Promise<Page[]> {
  const res = await fetch(
    `${url}/api/${v}/${type}/query/pages/page/siteId?id=${uid}`,
    // { next: { revalidate: 60 } }
    {cache: 'no-cache'}
  );
  return res.json();
}
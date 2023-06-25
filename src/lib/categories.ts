import { Category, CreateCategory, UpdateCategoryInfo, UpdateCategoryThumbnailUrl } from "../interfaces/category";

import { uid, url, type, v } from "../utils";

export const addCategory = async (i: string, input: CreateCategory) => {
  const res = await fetch(`${url}/api/${v}/${type}/mutation/categories/${i}`, {
    method: "POST",
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    const { message } = await res.json()
    throw new Error(message);
  }

  return await res.json();
  
};

export const deleteCategories = async (i: string, ids: string[]) => {
  const res = await fetch(`${url}/api/${v}/${type}/categories/${i}`, {
    method: "DELETE",
    body: JSON.stringify({ ids: ids }),
    headers: {
      "Content-type": "application/json",
    },
  });
  return res.json();
};

export const deleteCategoriesByParentId = async (i: string, ids: string[]) => {
  const mutation = `
    mutation DeleteCategoriesByParentId( $type: String!, $i: String!, $ids: [String]!) {
      deleteCategoriesByParentId(type: $type, i: $i, ids: $ids)
    }
  `;

  const variables = { type: type, i: i,  ids: ids };

  const res = await fetch(`${url}/api/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: mutation, variables }),
  });
  return res.json();
};


export async function getCategoryById(i:string, id: string ): Promise<Category> {
  const res = await fetch(
    `${url}/api/${v}/${type}/query/categories/${i}/${id}`
  );
  return res.json();
}
export async function getCategory(i:string, type: string, sid: string ): Promise<Category> {
  const res = await fetch(
    `${url}/api/${v}/${type}/categories/${i}/${sid}?type=${type}`
  );
  return res.json();
}
export async function getCategories(i:string, type: string, sid: string ): Promise<Category[]> {
  const res = await fetch(
    `${url}/api/${v}/${type}/categories/${i}?type=${type}&uid=${sid}`
  );
  return res.json();
}

export async function getCategoriesByParentId(i:string, id: string ): Promise<Category[]> {
  const res = await fetch(
    `${url}/api/${v}/${type}/query/categories/${i}/category/parentId?id=${id}`
  );
  return res.json();
}
      
export const updateCategory = async (
  i: string,
  id: string,
  type: string,
  input: UpdateCategoryInfo | UpdateCategoryThumbnailUrl
) => {
  const res = await fetch(
    `${url}/api/${v}/${type}/mutation/categories/${i}/${id}/${type}`,
    {
      method: "POST",
      body: JSON.stringify(input),
      
    }
  );
  return res.json();
};

import { Article, CreateArticle, UpdateArticleContent, UpdateArticleInfo, UpdateArticleThumbnailUrl } from "../interfaces/article";
import { CreateProduct, Product } from "../interfaces/product";
import { url, type, uid, v } from "../utils";

export const addProduct = async ( input: CreateProduct) => {
  const res = await fetch(`${url}/api/${v}/${type}/products`,
  {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.json()
}

export const deleteProducts = async (ids: string[]) => {
  const res = await fetch(`${url}/api/${v}/${type}/products`,
  {
    method: 'DELETE',
    body: JSON.stringify({ids: ids}),
  });
  return res.json()
}


export const updateArticle = async (
  type: string,
  id: string,
  input: UpdateArticleInfo | UpdateArticleThumbnailUrl | UpdateArticleContent
) => {
  const res = await fetch(
    `${url}/api/${v}/${type}/articles/${id}?type=${type}`,
    {
      method: "PUT",
      body: JSON.stringify(input),
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return res.json();
};

export const getArticleById = async (id: string):Promise<Article> => {
  const res = await fetch(`${url}/api/${v}/${type}/articles/${id}`);

  return res.json();
};

export const getProductsByParentId = async (id: string):Promise<Product []> => {
  const res = await fetch(`${url}/api/${v}/${type}/query/products/product/parentId?id=${id}`);
  return await res.json();
};


export async function getArticlesBySiteId():Promise<Article []> {
  const res = await fetch(`${url}/api/${v}/${type}/articles/siteId/${uid}`, {cache: 'no-store'});
  return res.json();
}

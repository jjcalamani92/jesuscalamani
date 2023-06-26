import { Article, CreateArticle, UpdateArticleContent, UpdateArticleInfo, UpdateArticleThumbnailUrl } from "../interfaces/article";
import { url, type, uid, v } from "../utils";

export const addArticle = async ( input: CreateArticle) => {
  const res = await fetch(`${url}/api/${v}/${type}/mutation/articles`,
  {
    method: 'POST',
    body: JSON.stringify(input),
  });
  return res.json()
}

export const addArticles = async ( input: any) => {
  
  const res = await fetch(`${url}/api/${v}/${type}/mutation/articles/add/many`,
  {
    method: 'POST',
    
    body: JSON.stringify(input),
    
  });
  return res.json()
}

export const deleteArticles = async (ids: string[]) => {
  const res = await fetch(`${url}/api/${v}/${type}/articles`,
  {
    method: 'DELETE',
    body: JSON.stringify({ids: ids}),
  });
  return res.json()
}


export const updateArticle = async (
  typeOperation: string,
  id: string,
  input: UpdateArticleInfo | UpdateArticleThumbnailUrl | UpdateArticleContent
) => {
  const res = await fetch(
    `${url}/api/${v}/${type}/mutation/articles/${id}?typeOperation=${typeOperation}`,
    {
      method: "POST",
      body: JSON.stringify(input),
      // headers: {
      //   "Content-type": "application/json",
      // },
    }
  );
  return res.json();
};

export const getArticleById = async (id: string):Promise<Article> => {
  const res = await fetch(`${url}/api/${v}/${type}/query/articles/${id}`, {cache: 'no-store'});

  return res.json();
};
export const getArticlesByParentId = async (id: string):Promise<Article []> => {
  const res = await fetch(`${url}/api/${v}/${type}/query/articles/article/parentId?id=${id}`);

  return res.json();
};


export async function getArticlesBySiteId():Promise<Article []> {
  const res = await fetch(`${url}/api/${v}/${type}/articles/siteId/${uid}`, {cache: 'no-store'});
  return res.json();
}

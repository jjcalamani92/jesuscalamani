import { Image, Seo, Tags, UpdateDate } from "./site";


export interface Article {
  _id: string;
  data: DataArticle;
  parentId: string
  slug: string
}

export interface DataArticle {
  name: string;
  description: string;
  thumbnailUrl: string;
  siteId: string
  content: string;
  category: string;
  meta: string;
  tags: Tags[];
  author: string;
  updateDate: UpdateDate
  paths: string[]
}

export interface ListArticle {
  page: ConnectionArticle
  pageData: PageDataArticle
}
export interface ConnectionArticle {
  edges: EdgeArticle[]
  pageInfo: PageInfoArticle
}
export interface EdgeArticle {
  cursor: string
  node: Article
}
export interface PageInfoArticle {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataArticle {
  count: number
  limit: number
  offset:number
}



export interface CreateArticle {
  name: string
  uid: string
  description: string
  siteId: string
  parentId: string
}
export interface UpdateArticle {
  id:string
  name: string
  uid: string
  description: string
  siteId: string
  parentId: string
}
export interface UpdateArticleInfo {
  name: string
  description: string
  uid: string
}
export interface UpdateArticleContent {
  content: string
  uid: string
}
export interface UpdateArticleThumbnailUrl {
  thumbnailUrl: string
  uid: string
}
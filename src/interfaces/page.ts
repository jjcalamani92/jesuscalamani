// import { Article } from "../article/article.interface";
// import { Product } from "../product/product.interface";
// import { Food } from "./product/food.interface";
import { Article } from "./article";
import { Category } from "./category";
import { Pet, Type } from "./pet";
import { Product } from "./product";
import { Image, Seo } from "./site";

export interface Page {
  _id: string;
  data: DataPage;
  slug: string;
  parentId: string;
  articles?: Article[];
  pages?: Page[];
  products?: Product[]
  adoptions?: Product[]
  categories?: Category[]
  // pets?: any[];
}

export interface Paths {
  name: string
  slug: string;
}

interface DataPage {
  name: string
  description: string
  thumbnailUrl: string
  siteId: string
  params: {
    path: string[]
    paths: Paths[]
  }
  type: string
  icon?: Image;
}

export interface CreatePage {
  name: string
  description: string
  type: string
  parentId: string
  siteId: string
  uid: string
}
export interface UpdatePage {
  id:string
  name: string
  description: string
  type: string
  parentId: string
  siteId: string
  uid: string
}
export interface UpdatePageInfo {
  name: string
  description: string
  type: string
  uid: string
}
export interface UpdatePageThumbnailUrl {
  thumbnailUrl: string
  uid: string
}
export interface UpdateImage {
  id:string
  type:string
  uid: string
  images: {
    src: string
    alt: string
  }
}

export interface DeletePages {
  ids:string[]
}


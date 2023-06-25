
import { Article } from "./article";
import { Paths } from "./page";
import { Type } from "./pet";
import { Product } from "./product";
import { Image, } from "./site";

export interface Category {
  _id: string;
  data: DataCategory;
  slug: string;
  parentId: string;
  articles?: Article[];
  categories?: Category[];
  products?: Product[]
  adoptions?: Product[]
}

interface DataCategory {
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

export interface CreateCategory {
  name: string
  description: string
  type: string
  parentId: string
  siteId: string
  uid: string
  paths: Paths[]
}
export interface UpdateCategory {
  id:string
  name: string
  description: string
  type: string
  parentId: string
  siteId: string
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

export interface DeleteCategories {
  ids:string[]
}
export interface UpdateCategoryInfo {
  name: string
  description: string
  type: string
  uid: string
}

export interface UpdateCategoryThumbnailUrl {
  thumbnailUrl: string
  uid: string
}
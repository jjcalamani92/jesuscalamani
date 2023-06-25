import { Image, Seo, UpdateDate } from "./site";

export interface Service {
  _id: string;
  data: DataService;
  parentId: string
  slug: string
}

export interface DataService {
  siteId: string
  type: Type
  mark: Type
  inStock: number
  price: number
  discountPrice: number
  promotion: Type
  name: string
  description: string
  thumbnailUrl: string
  details: string
  featured: string
  specs: string
  tags: {
    uid: string
    text: string
    slug: string
  }
  imageService: Image[]
  
  updateDate: UpdateDate
}

export interface Type {
  label: string
  slug: string
}

export interface ListService {
  page: ConnectionService
  pageData: PageDataService
}
export interface ConnectionService {
  edges: EdgeService[]
  pageInfo: PageInfoService
}
export interface EdgeService {
  cursor: string
  node: Service
}
export interface PageInfoService {
  startCursor: string
  endCursor: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}
export interface PageDataService {
  count: number
  limit: number
  offset:number
}

export interface CreateService {
  name: string
  description: string
  uid: string
  siteId: string
  parentId: string
  type: string
}
export interface UpdateService {
  id: string
  name: string
  description: string
  uid: string
  siteId: string
  parentId: string
  type: string
}

export interface UpdateDetailService {
  id: string
  text: string
  uid: string
}
export interface UpdateSpecsService {
  id: string
  text: string
  uid: string
}
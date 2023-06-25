import { Image } from "./site"

export interface User {
  _id: string
  email: string
  password: string
  data: DataUser
}

interface DataUser {
  username: string
  role: string
  picture: string
}

export interface CreateUser {
  username: string
  email: string
  password: string
  role: string
  oAuth: string
  image: string
  siteId: string
  // input: {
  // }
}
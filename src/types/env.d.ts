namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SITE_URL: string
    NEXT_PUBLIC_SITE_TYPE: string
    NEXT_PUBLIC_SITE_UID: string

    NEXT_PUBLIC_CLOUDINARY_API_SECRET: string
    NEXT_PUBLIC_CLOUDINARY_API_KEY: string
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string
    NEXT_PUBLIC_UPLOAD_PRESET: string

    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    
  }
}
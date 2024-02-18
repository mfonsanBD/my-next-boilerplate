/* eslint-disable no-unused-vars */
declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string
    NEXTAUTH_SECRET: string
    NEXTAUTH_URL: string
    NEXT_PUBLIC_APP_URL: string
    NEXT_APP_VERSION: string
    NEXT_PUBLIC_APP_NAME: string
  }
}

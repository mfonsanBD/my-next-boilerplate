/* eslint-disable no-unused-vars */
import NextAuth, { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    type?: string
  }

  interface Session {
    user: {
      type?: string
    } & DefaultSession['user']
  }
}

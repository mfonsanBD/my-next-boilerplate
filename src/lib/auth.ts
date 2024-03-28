/* eslint-disable no-unreachable */
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcrypt'
import { db } from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as any,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize({ email, password }: any) {
        if (!email || !password) {
          throw new Error('Os dados são obrigatórios')
        }

        const existingUser = await db.user.findUnique({
          where: { email },
        })

        if (!existingUser) {
          throw new Error('O e-mail está incorreto ou usuário não existe.')
        }

        const passwordMatch = await compare(password, existingUser.password)

        if (!passwordMatch) {
          throw new Error('A senha está incorreta.')
        }

        if (existingUser.status === 'inativo') {
          throw new Error(
            'Seu usuário está inativo. Entre em contato com o administrador para reativar sua conta.',
          )
        }

        return {
          id: existingUser.id,
          name: existingUser.name,
          email: existingUser.email,
          image: existingUser.image,
          type: existingUser.type,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          type: user?.type,
          name: user?.name,
          image: user?.image,
        }
      }
      if (trigger === 'update') {
        return { ...token, ...session.user }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          type: token.type,
          name: token.name,
          image: token.image as string,
        },
      }
      return session
    },
  },
}

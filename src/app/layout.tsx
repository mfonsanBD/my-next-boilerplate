import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/providers/auth'

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Login`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}

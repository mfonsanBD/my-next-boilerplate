import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ToastyArea from '../ToastyArea/ToastyArea'
import { UrbanismoNav } from '../Urbanismo/UrbanismoNav'

interface BaseProps {
  children: React.ReactNode
}

export default async function UrbanismoBase({ children }: BaseProps) {
  const data = await getServerSession(authOptions)
  if (!data) {
    redirect('/')
  }

  return (
    <div className="h-screen flex flex-col justify-between">
      <div>
        <Header />
        <UrbanismoNav />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </div>
  )
}

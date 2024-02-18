import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

interface BaseProps {
  children: React.ReactNode
}

export default async function Base({ children }: BaseProps) {
  const data = await getServerSession(authOptions)
  if (!data) {
    redirect('/')
  }

  return (
    <div className="bg-[#EFF2F4] h-screen flex flex-col justify-between">
      <div>
        <Header />
        {children}
      </div>

      <Footer />

      <div className="absolute">
        <ToastContainer
          position="bottom-center"
          style={{ width: '30%', zIndex: 90 }}
          toastStyle={{ fontFamily: 'Poppins' }}
          closeOnClick
        />
      </div>
    </div>
  )
}

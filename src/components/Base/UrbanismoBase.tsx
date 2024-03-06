import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ToastyArea from '../ToastyArea/ToastyArea'
import { UrbanismoNav } from '../Urbanismo/UrbanismoNav'
import Base from './Base'

interface BaseProps {
  children: React.ReactNode
}

export default async function UrbanismoBase({ children }: BaseProps) {
  return (
    <Base>
      <div>
        <Header />
        <UrbanismoNav />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </Base>
  )
}

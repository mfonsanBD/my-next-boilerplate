import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ToastyArea from '../ToastyArea/ToastyArea'
import { TransportNav } from '../Transporte/TransportNav'
import Base from './Base'

interface BaseProps {
  children: React.ReactNode
}

export default async function TransportBase({ children }: BaseProps) {
  return (
    <Base>
      <div>
        <Header />
        <TransportNav />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </Base>
  )
}

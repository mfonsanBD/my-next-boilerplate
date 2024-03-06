import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ToastyArea from '../ToastyArea/ToastyArea'
import Base from './Base'

interface BaseProps {
  children: React.ReactNode
}

export default async function BaseDefault({ children }: BaseProps) {
  return (
    <Base>
      <div>
        <Header />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </Base>
  )
}

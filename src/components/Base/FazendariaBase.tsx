import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ToastyArea from '../ToastyArea/ToastyArea'
import { FazendariaNav } from '../Fazendaria/FazendariaNav'
import Base from './Base'

interface BaseProps {
  children: React.ReactNode
}

export default async function FazendariaBase({ children }: BaseProps) {
  return (
    <Base>
      <div>
        <Header />
        <FazendariaNav />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </Base>
  )
}

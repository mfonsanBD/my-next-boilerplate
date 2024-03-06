import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ToastyArea from '../ToastyArea/ToastyArea'
import { MeioAmbienteNav } from '../MeioAmbiente/MeioAmbienteNav'
import Base from './Base'

interface BaseProps {
  children: React.ReactNode
}

export default async function MeioAmbienteBase({ children }: BaseProps) {
  return (
    <Base>
      <div>
        <Header />
        <MeioAmbienteNav />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </Base>
  )
}

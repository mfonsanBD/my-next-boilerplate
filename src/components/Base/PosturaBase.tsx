import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ToastyArea from '../ToastyArea/ToastyArea'
import { PosturaNav } from '../Postura/PosturaNav'
import Base from './Base'

interface BaseProps {
  children: React.ReactNode
}

export default async function PosturaBase({ children }: BaseProps) {
  return (
    <Base>
      <div>
        <Header />
        <PosturaNav />
        {children}
      </div>
      <Footer />
      <ToastyArea />
    </Base>
  )
}

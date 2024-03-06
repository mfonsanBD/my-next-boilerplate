import React from 'react'
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
    <div className="h-screen flex flex-col justify-between">{children}</div>
  )
}

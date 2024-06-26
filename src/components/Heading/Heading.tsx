import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
}

export default function Heading({ children }: HeadingProps) {
  return <h1>{children}</h1>
}

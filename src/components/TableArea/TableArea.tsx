import { ReactNode } from 'react'

interface TableAreaProps {
  children: ReactNode
}

export default function TableArea({ children }: TableAreaProps) {
  return (
    <section>
      <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

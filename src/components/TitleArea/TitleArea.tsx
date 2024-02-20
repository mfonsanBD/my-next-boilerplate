import { ReactNode } from 'react'

interface TitleAreaProps {
  children: ReactNode
  title: string
}

export default function TitleArea({ children, title }: TitleAreaProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between border-b border-b-zinc-100">
        <h1 className="text-2xl font-bold tracking-tight text-slate-700">
          {title}
        </h1>

        {children}
      </div>
    </section>
  )
}

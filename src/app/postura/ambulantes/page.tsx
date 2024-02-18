import Base from '@/components/Base/Base'
import { AddButton } from '@/components/Postura/Ambulantes/AddButton'
import { AmbulantesComp } from '@/components/Postura/Ambulantes/ambulantes'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Postura - Ambulantes`,
}

const Ambulantes = () => (
  <Base>
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-700">
          Ambulantes
        </h1>

        <AddButton />
      </div>
    </div>

    <section>
      <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
        <AmbulantesComp />
      </div>
    </section>
  </Base>
)

export default Ambulantes

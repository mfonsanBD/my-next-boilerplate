import BaseDefault from '@/components/Base/BaseDefault'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Painel de Controle`,
}

const PainelControle = () => (
  <BaseDefault>
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-700">
          Painel de Controle
        </h1>
      </div>
    </div>

    <section>
      <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
        <p>Widget</p>
      </div>
    </section>
  </BaseDefault>
)

export default PainelControle

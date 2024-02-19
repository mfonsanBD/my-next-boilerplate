import Base from '@/components/Base/Base'
import { AddButton } from '@/components/Transporte/PermissionarioVan/AddButton'
import { PermissionarioVanComp } from '@/components/Transporte/PermissionarioVan/permissionario-van'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Transporte - Permissionário Van`,
}

const PermissionarioVan = () => (
  <Base>
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-700">
          Permissionário Van
        </h1>

        <AddButton />
      </div>
    </div>

    <section>
      <div className="mx-auto max-w-7xl py-8 sm:px-6 lg:px-8">
        <PermissionarioVanComp />
      </div>
    </section>
  </Base>
)

export default PermissionarioVan

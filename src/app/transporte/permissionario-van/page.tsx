import TransportBase from '@/components/Base/TransportBase'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { AddButton } from '@/components/Transporte/PermissionarioVan/AddButton'
import { PermissionarioVanComp } from '@/components/Transporte/PermissionarioVan/permissionario-van'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Transporte - Permissionário Van`,
}

const PermissionarioVan = () => (
  <TransportBase>
    <TitleArea title="Permissionário Van">
      <AddButton />
    </TitleArea>

    <TableArea>
      <PermissionarioVanComp />
    </TableArea>
  </TransportBase>
)

export default PermissionarioVan

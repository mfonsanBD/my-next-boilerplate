import Base from '@/components/Base/Base'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { AddButton } from '@/components/Transporte/PermissionarioVan/AddButton'
import { PermissionarioVanComp } from '@/components/Transporte/PermissionarioVan/permissionario-van'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Transporte - Permissionário Van`,
}

const PermissionarioVan = () => (
  <Base>
    <TitleArea title="Permissionário Van">
      <AddButton />
    </TitleArea>

    <TableArea>
      <PermissionarioVanComp />
    </TableArea>
  </Base>
)

export default PermissionarioVan

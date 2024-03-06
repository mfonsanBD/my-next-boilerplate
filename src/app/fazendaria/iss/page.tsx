import FazendariaBase from '@/components/Base/FazendariaBase'
import { AddButton } from '@/components/Fazendaria/ISS/AddButton'
import { FazendariaISSComp } from '@/components/Fazendaria/ISS/iss'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Empresas ISS`,
}

const FazendariaISS = () => (
  <FazendariaBase>
    <TitleArea title="Empresas ISS">
      <AddButton />
    </TitleArea>

    <TableArea>
      <FazendariaISSComp />
    </TableArea>
  </FazendariaBase>
)

export default FazendariaISS

import FazendariaBase from '@/components/Base/FazendariaBase'
import { AddButton } from '@/components/Fazendaria/IPTU/AddButton'
import { FazendariaIPTUComp } from '@/components/Fazendaria/IPTU/iptu'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - IPTU Imóveis`,
}

const FazendariaIPTU = () => (
  <FazendariaBase>
    <TitleArea title="IPTU Imóveis">
      <AddButton />
    </TitleArea>

    <TableArea>
      <FazendariaIPTUComp />
    </TableArea>
  </FazendariaBase>
)

export default FazendariaIPTU

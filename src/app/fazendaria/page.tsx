import Base from '@/components/Base/Base'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Fazendária`,
}

const Fazendaria = () => (
  <Base>
    <TitleArea title="Fazendária" />

    <TableArea>
      <p>Área Fazendária</p>
    </TableArea>
  </Base>
)

export default Fazendaria

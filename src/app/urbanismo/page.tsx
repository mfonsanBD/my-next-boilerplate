import Base from '@/components/Base/Base'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Urbanismo`,
}

const Urbanismo = () => (
  <Base>
    <TitleArea title="Urbanismo" />

    <TableArea>
      <p>Área do Urbanismo</p>
    </TableArea>
  </Base>
)

export default Urbanismo

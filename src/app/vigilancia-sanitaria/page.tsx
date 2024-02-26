import Base from '@/components/Base/Base'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Vigilância Sanitaria`,
}

const VigilanciaSanitaria = () => (
  <Base>
    <TitleArea title="Vigilância Sanitaria" />

    <TableArea>
      <p>Área da Vigilância Sanitaria</p>
    </TableArea>
  </Base>
)

export default VigilanciaSanitaria

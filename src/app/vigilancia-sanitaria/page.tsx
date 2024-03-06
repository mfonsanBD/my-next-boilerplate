import BaseDefault from '@/components/Base/BaseDefault'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Vigilância Sanitaria`,
}

const VigilanciaSanitaria = () => (
  <BaseDefault>
    <TitleArea title="Vigilância Sanitaria" />

    <TableArea>
      <p>Área da Vigilância Sanitaria</p>
    </TableArea>
  </BaseDefault>
)

export default VigilanciaSanitaria

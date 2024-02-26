import Base from '@/components/Base/Base'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Meio Ambiente`,
}

const MeioAmbiente = () => (
  <Base>
    <TitleArea title="Meio Ambiente" />

    <TableArea>
      <p>Área do Meio Ambiente</p>
    </TableArea>
  </Base>
)

export default MeioAmbiente

import BaseDefault from '@/components/Base/BaseDefault'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Painel de Controle`,
}

const PainelControle = () => (
  <BaseDefault>
    <TitleArea title="Painel de Controle" />

    <TableArea>
      <p>Área do Painel de Controle</p>
    </TableArea>
  </BaseDefault>
)

export default PainelControle

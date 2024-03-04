import MeioAmbienteBase from '@/components/Base/MeioAmbienteBase'
import { AddButton } from '@/components/MeioAmbiente/ResponsaveisObras/AddButton'
import { ResponsaveisObrasComp } from '@/components/MeioAmbiente/ResponsaveisObras/responsaveis-obras'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Meio Ambiente - Responsáveis de Obras`,
}

const ResponsaveisObras = () => (
  <MeioAmbienteBase>
    <TitleArea title="Responsáveis de Obras">
      <AddButton />
    </TitleArea>

    <TableArea>
      <ResponsaveisObrasComp />
    </TableArea>
  </MeioAmbienteBase>
)

export default ResponsaveisObras

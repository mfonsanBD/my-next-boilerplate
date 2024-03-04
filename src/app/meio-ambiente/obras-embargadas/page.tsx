import MeioAmbienteBase from '@/components/Base/MeioAmbienteBase'
import { AddButton } from '@/components/MeioAmbiente/ObrasEmbargadas/AddButton'
import { ObrasEmbargadasComp } from '@/components/MeioAmbiente/ObrasEmbargadas/obras-embargadas'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Meio Ambiente - Obras Embargadas`,
}

const ObrasEmbargadas = () => (
  <MeioAmbienteBase>
    <TitleArea title="Obras Embargadas">
      <AddButton />
    </TitleArea>

    <TableArea>
      <ObrasEmbargadasComp />
    </TableArea>
  </MeioAmbienteBase>
)

export default ObrasEmbargadas

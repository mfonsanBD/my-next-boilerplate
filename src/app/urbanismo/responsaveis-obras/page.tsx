import UrbanismoBase from '@/components/Base/UrbanismoBase'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { AddButton } from '@/components/Urbanismo/ResponsaveisObras/AddButton'
import { ResponsaveisObrasComp } from '@/components/Urbanismo/ResponsaveisObras/responsaveis-obras'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Urbanismo - Responsáveis de Obras`,
}

const ResponsaveisObras = () => (
  <UrbanismoBase>
    <TitleArea title="Responsáveis de Obras">
      <AddButton />
    </TitleArea>

    <TableArea>
      <ResponsaveisObrasComp />
    </TableArea>
  </UrbanismoBase>
)

export default ResponsaveisObras

import Base from '@/components/Base/Base'
import { AddButton } from '@/components/Postura/Ambulantes/AddButton'
import { AmbulantesComp } from '@/components/Postura/Ambulantes/ambulantes'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Postura - Ambulantes`,
}

const Ambulantes = () => (
  <Base>
    <TitleArea title="Ambulantes">
      <AddButton />
    </TitleArea>

    <TableArea>
      <AmbulantesComp />
    </TableArea>
  </Base>
)

export default Ambulantes

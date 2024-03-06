import UrbanismoBase from '@/components/Base/UrbanismoBase'
import TableArea from '@/components/TableArea/TableArea'
import TitleArea from '@/components/TitleArea/TitleArea'
import { AddButton } from '@/components/Urbanismo/ObrasEmExecucao/AddButton'
import { ObrasEmExecucaoComp } from '@/components/Urbanismo/ObrasEmExecucao/obras-em-execucao'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME} - Obras em Execução`,
}

const Urbanismo = () => (
  <UrbanismoBase>
    <TitleArea title="Obras em Execução">
      <AddButton />
    </TitleArea>

    <TableArea>
      <ObrasEmExecucaoComp />
    </TableArea>
  </UrbanismoBase>
)

export default Urbanismo

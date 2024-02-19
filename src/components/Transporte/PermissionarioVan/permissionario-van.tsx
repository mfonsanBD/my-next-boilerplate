'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { PermissionarioVanMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function PermissionarioVanComp() {
  const { data, isLoading } = useSWR(
    '/api/transporte/permissionario-van',
    fetcher,
  )
  const permissionarios = PermissionarioVanMapper(data?.permissionariosVan)

  return (
    <div className="bg-white p-4 sm:p-10 rounded-lg">
      <DataTable
        data={permissionarios}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  )
}

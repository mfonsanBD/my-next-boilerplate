'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { PermissionarioVanMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function ObrasEmbargadasComp() {
  const { data, isLoading } = useSWR(
    '/api/transporte/permissionario-van',
    fetcher,
  )
  const permissionarios = PermissionarioVanMapper(data?.permissionariosVan)

  return (
    <DataTable data={permissionarios} columns={columns} isLoading={isLoading} />
  )
}

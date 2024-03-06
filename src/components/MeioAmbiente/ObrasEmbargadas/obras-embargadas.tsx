'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { EmbargoedWorksMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function ObrasEmbargadasComp() {
  const { data, isLoading } = useSWR(
    '/api/meio-ambiente/obras-embargadas',
    fetcher,
  )
  const embargoedsWorks = EmbargoedWorksMapper(data?.embargoedWorks)

  return (
    <DataTable data={embargoedsWorks} columns={columns} isLoading={isLoading} />
  )
}

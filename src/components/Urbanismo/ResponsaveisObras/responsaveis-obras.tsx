'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { ManegersMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function ResponsaveisObrasComp() {
  const { data, isLoading } = useSWR('/api/urbanismo/responsavel', fetcher)
  const managers = ManegersMapper(data?.urbanismoManagers)

  return <DataTable data={managers} columns={columns} isLoading={isLoading} />
}

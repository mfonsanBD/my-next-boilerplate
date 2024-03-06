'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { IPTUMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function FazendariaIPTUComp() {
  const { data, isLoading } = useSWR('/api/fazendaria/iptu', fetcher)
  const iptusList = IPTUMapper(data?.iptus)

  return <DataTable data={iptusList} columns={columns} isLoading={isLoading} />
}

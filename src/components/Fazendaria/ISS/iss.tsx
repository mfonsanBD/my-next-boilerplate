'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { ISSMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function FazendariaISSComp() {
  const { data, isLoading } = useSWR('/api/fazendaria/iss', fetcher)
  const issList = ISSMapper(data?.iss)

  return <DataTable data={issList} columns={columns} isLoading={isLoading} />
}

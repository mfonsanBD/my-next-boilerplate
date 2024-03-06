'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { WorksInProgressMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function ObrasEmExecucaoComp() {
  const { data, isLoading } = useSWR(
    '/api/urbanismo/obras-em-execucao',
    fetcher,
  )
  const worksInProgress = WorksInProgressMapper(data?.inProgress)

  return (
    <DataTable data={worksInProgress} columns={columns} isLoading={isLoading} />
  )
}

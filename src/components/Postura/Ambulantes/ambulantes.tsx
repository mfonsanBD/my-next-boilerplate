'use client'

import { DataTable } from './data-table'
import { columns } from './columns'
import useSWR from 'swr'
import axios from 'axios'
import { AmbulantesMapper } from '@/utils/mappers'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function AmbulantesComp() {
  const { data, isLoading } = useSWR('/api/postura/ambulantes', fetcher)
  const ambulantes = AmbulantesMapper(data?.ambulantes)

  return (
    <div className="bg-white p-4 sm:p-10 rounded-lg">
      <DataTable data={ambulantes} columns={columns} isLoading={isLoading} />
    </div>
  )
}

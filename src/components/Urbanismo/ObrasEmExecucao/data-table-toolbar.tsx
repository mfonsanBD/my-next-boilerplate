'use client'

import { Table } from '@tanstack/react-table'

import { Input } from '@/components/ui/input'

import { X } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar pelo número do auto de infração..."
          value={
            (table
              .getColumn('numeroAutoInfracao')
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(event: any) =>
            table
              .getColumn('numeroAutoInfracao')
              ?.setFilterValue(event.target.value)
          }
          className="h-10 w-full lg:w-[250px]"
        />

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-12 px-2 lg:px-3"
          >
            Limpar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}

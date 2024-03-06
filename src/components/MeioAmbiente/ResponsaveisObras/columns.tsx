'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Responsaveis } from './schema'

export const columns: ColumnDef<Responsaveis>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('nome')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'documento',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CPF/CNPJ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('documento')}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('email')}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'telefone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Telefone" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('telefone')}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    id: 'acoes',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]

'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { IPTU } from './schema'

export const columns: ColumnDef<IPTU>[] = [
  {
    accessorKey: 'nomeEmpresarial',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome da Empresa" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('nomeEmpresarial')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'cnpj',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CNPJ" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('cnpj')}
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

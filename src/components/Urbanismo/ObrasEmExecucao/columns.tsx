'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { WorkInProgress } from './schema'
import Link from 'next/link'
import { DownloadSimple } from '@phosphor-icons/react'

export const columns: ColumnDef<WorkInProgress>[] = [
  {
    accessorKey: 'numeroAutoInfracao',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="N° Auto de Infração
      "
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('numeroAutoInfracao')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'fileAutoInfracao',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cópia Auto de Infração" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link
              href={row.getValue('fileAutoInfracao')}
              download="download"
              target="_blank"
              className="w-10 h-10 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center rounded"
            >
              <DownloadSimple size={24} className="text-blue-600" />
            </Link>
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'numeroIntimacao',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="N° Intimação
      "
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('numeroIntimacao')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'fileIntimacao',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cópia Intimação" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <Link
              href={row.getValue('fileIntimacao')}
              download="download"
              target="_blank"
              className="w-10 h-10 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center rounded"
            >
              <DownloadSimple size={24} className="text-blue-600" />
            </Link>
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'responsavel',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Responsável" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('responsavel')}
          </span>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'telefone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Contato do Responsável" />
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
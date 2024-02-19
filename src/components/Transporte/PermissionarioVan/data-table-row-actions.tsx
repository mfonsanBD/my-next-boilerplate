'use client'

import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Circle, CircleNotch, DotsThreeVertical } from '@phosphor-icons/react'
import { useCallback, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import axios from 'axios'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import InputText from '@/components/InputText/InputText'
import { permissionarios } from './schema'
import clsx from 'clsx'

const schema = z.object({
  tema: z.string().nonempty('O tema é obrigatório.'),
  data: z.string().nonempty('A data é obrigatória.'),
})

type FormProps = z.infer<typeof schema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

type SelectedData = z.infer<typeof permissionarios>

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [openEdit, setOpenEdit] = useState(false)
  const [selectedToEdit, setSelectedToEdit] = useState<SelectedData | null>(
    null,
  )

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<SelectedData | null>(
    null,
  )

  const [openView, setOpenView] = useState(false)

  const permissionario = permissionarios.parse(row.original)

  const handleEditDialog = (permissionario: SelectedData) => {
    setSelectedToEdit(permissionario)
    setOpenEdit(true)
  }

  const handleDeleteDialog = (permissionario: SelectedData) => {
    setSelectedToDelete(permissionario)
    setOpenDelete(true)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)
  const onSubmit = useCallback(
    async (data: any) => {
      setLoading(true)

      const inputDate = new Date(data.data)
      const newDate = new Date(
        inputDate.getTime() - inputDate.getTimezoneOffset() * 60000,
      )

      await axios
        .patch('/api/assemblies', {
          id: selectedToEdit?.id,
          theme: data.tema,
          date: newDate.toISOString(),
        })
        .then((response) => {
          setOpenEdit(false)
          toast.success(response.data.message)
          mutate('/api/assemblies')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })

      setLoading(false)
    },
    [selectedToEdit],
  )

  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleDelete = useCallback(async (data: any) => {
    setLoadingDelete(true)

    await axios
      .delete('/api/postura/ambulantes', { data: { id: data } })
      .then((response) => {
        setOpenDelete(false)
        toast.success(response.data.message)
        mutate('/api/postura/ambulantes')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })

    setLoadingDelete(false)
  }, [])

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <DotsThreeVertical className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpenView(true)}
          >
            Visualizar
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleEditDialog(permissionario)}
          >
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleDeleteDialog(permissionario)}
          >
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={openEdit}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setSelectedToEdit(null)
          setOpenEdit(false)
        }}
      >
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Alterar Assembléia: {selectedToEdit?.nome}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <Controller
                name="tema"
                control={control}
                defaultValue={selectedToEdit?.nome}
                render={({ field: { onChange, value } }) => (
                  <InputText
                    label="Tema"
                    labelFor="tema"
                    value={value}
                    placeholder="Ex.: Assembléia extraordinária"
                    isRequired
                    onChange={onChange}
                    disabled={loading}
                    isDisabled={loading}
                  />
                )}
              />

              {errors.tema && (
                <small className="text-red-500">{errors.tema.message}</small>
              )}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <CircleNotch size={24} className="animate-spin" />
                  </div>
                ) : (
                  'Alterar'
                )}
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={openDelete}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setSelectedToDelete(null)
          setOpenDelete(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você está excluindo um ambulante!
            </AlertDialogTitle>

            <AlertDialogDescription>
              O ambulante{' '}
              <span className="font-medium text-red-600">
                {selectedToDelete?.nome}
              </span>{' '}
              está sendo excluído, você tem certeza que deseja excluí-lo?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              type="button"
              variant="destructive"
              disabled={loadingDelete}
              onClick={() => handleDelete(selectedToDelete?.id)}
            >
              {loadingDelete ? (
                <div className="flex items-center gap-2">
                  <CircleNotch size={24} className="animate-spin" />
                </div>
              ) : (
                'Excluir'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={openView}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setOpenView(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-4 text-gray-900">
                {permissionario.nome}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-4 text-gray-500">
                Todos os dados do(a) permissionário(a).
              </p>
              <small
                className={clsx(
                  'flex items-center justify-center sm:justify-start mt-1 gap-1 capitalize',
                  {
                    'text-emerald-500': permissionario.status === 'ativo',
                    'text-blue-500': permissionario.status === 'pendente',
                    'text-red-500': permissionario.status === 'inativo',
                  },
                )}
              >
                <Circle weight="fill" size={8} />
                {permissionario.status}
              </small>
            </div>
          </AlertDialogHeader>

          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Nome Completo
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.nome}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  CPF
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.cpf}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  E-mail
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.email}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Telefone
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.phone}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Endereço
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.place}
                  {permissionario.number && `, ${permissionario.number}`}
                  {permissionario.complement &&
                    ` - ${permissionario.complement}`}
                  {` - ${permissionario.neighborhood}`}
                  {` - ${permissionario.city}`}
                  {` - ${permissionario.cep}`}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Tipo de Modal
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.modal}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Anotações
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {permissionario.notes}
                </dd>
              </div>
            </dl>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Fechar</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

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

import { CircleNotch, DotsThreeVertical } from '@phosphor-icons/react'
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
import { ambulantes } from './schema'
import { toast } from 'react-toastify'
import InputText from '@/components/InputText/InputText'

const schema = z.object({
  tema: z.string().nonempty('O tema é obrigatório.'),
  data: z.string().nonempty('A data é obrigatória.'),
})

type FormProps = z.infer<typeof schema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

type SelectedData = z.infer<typeof ambulantes>

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

  const ambulante = ambulantes.parse(row.original)

  const handleEditDialog = (ambulante: SelectedData) => {
    setSelectedToEdit(ambulante)
    setOpenEdit(true)
  }

  const handleDeleteDialog = (ambulante: SelectedData) => {
    setSelectedToDelete(ambulante)
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
      .delete('/api/assemblies', { data: { id: data } })
      .then((response) => {
        setOpenDelete(false)
        toast.success(response.data.message)
        mutate('/api/assemblies')
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
          <DropdownMenuItem onClick={() => handleEditDialog(ambulante)}>
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => handleDeleteDialog(ambulante)}>
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
              Você está excluindo uma assembléia!
            </AlertDialogTitle>

            <AlertDialogDescription>
              A assembléia{' '}
              <span className="font-medium text-red-600">
                {selectedToDelete?.nome}
              </span>{' '}
              está sendo excluída, você tem certeza que deseja excluí-la?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button
              type="button"
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
    </>
  )
}
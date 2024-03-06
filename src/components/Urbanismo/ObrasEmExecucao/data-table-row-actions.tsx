/* eslint-disable no-unused-vars */
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

import {
  CircleNotch,
  DotsThreeVertical,
  DownloadSimple,
} from '@phosphor-icons/react'
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
import useSWR, { mutate } from 'swr'
import { toast } from 'react-toastify'
import InputText from '@/components/InputText/InputText'
import { workinprogress } from './schema'
import clsx from 'clsx'
import { ScrollArea } from '@/components/ui/scroll-area'
import InputWithMask from '@/components/InputWithMask/InputWithMask'
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown'
import { Textarea } from '@/components/ui/textarea'
import { SelectMapper } from '@/utils/mappers'
import Link from 'next/link'
import { ChangeFileToBase64 } from '@/utils/helpers'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const schema = z.object({
  constructionManagerId: z
    .string()
    .nonempty('O campo Responsável da Obra é obrigatório.'),
  embargoNumber: z
    .string()
    .nonempty('O campo Número do Auto de Embargo é obrigatório.'),
  cep: z.string().nonempty('O campo CEP é obrigatório.'),
  place: z.string().nonempty('O campo Logradouro é obrigatório.'),
  complement: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().nonempty('O campo Bairro é obrigatório.'),
  city: z.string().nonempty('O campo Cidade é obrigatório.'),
  file: z.any().optional(),
})

type FormProps = z.infer<typeof schema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

type SelectedData = z.infer<typeof workinprogress>

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { data } = useSWR('/api/urbanismo/responsavel', fetcher)
  const managers = SelectMapper(data?.meioAmbienteManagers)

  const [openEdit, setOpenEdit] = useState(false)
  const [selectedToEdit, setSelectedToEdit] = useState<SelectedData | null>(
    null,
  )

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedToDelete, setSelectedToDelete] = useState<SelectedData | null>(
    null,
  )

  const [openView, setOpenView] = useState(false)

  const emExecucao = workinprogress.parse(row.original)

  const handleEditDialog = (embargo: SelectedData) => {
    setSelectedToEdit(embargo)
    setOpenEdit(true)
  }

  const handleDeleteDialog = (embargo: SelectedData) => {
    setSelectedToDelete(embargo)
    setOpenDelete(true)
  }

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)
  const onSubmit = useCallback(
    async (data: any) => {
      setLoading(true)

      let newData: any = { ...data, id: emExecucao.id }

      if (data.number === '') {
        const { number: noNumber, ...rest } = newData
        newData = rest
      } else {
        newData = {
          ...newData,
          number: newData.number.trim(),
        }
      }

      if (data.complement === '') {
        const { complement: noComplement, ...rest } = newData
        newData = rest
      }

      let allData: any

      if (data.file[0]) {
        await axios
          .post('/api/upload-file', {
            file: await ChangeFileToBase64(data.file[0]),
          })
          .then(
            (result) =>
              (allData = {
                ...newData,
                embargoFile: result?.data,
              }),
          )
      } else {
        allData = {
          ...newData,
          embargoFile: '',
        }
      }

      const { file: noFile, ...rest } = allData

      await axios
        .patch('/api/meio-ambiente/obras-embargadas', rest)
        .then((response) => {
          setOpenEdit(false)
          toast.success(response.data.message)
          mutate('/api/meio-ambiente/obras-embargadas')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })

      setLoading(false)
    },
    [emExecucao],
  )

  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleDelete = useCallback(async (data: any) => {
    setLoadingDelete(true)

    await axios
      .delete('/api/urbanismo/obras-em-execucao', { data: { id: data } })
      .then((response) => {
        setOpenDelete(false)
        toast.success(response.data.message)
        mutate('/api/urbanismo/obras-em-execucao')
      })
      .catch((error) => {
        toast.error(error.response.data.message)
      })

    setLoadingDelete(false)
  }, [])

  const handleGetAddress = async () => {
    setLoading(true)
    const cep = getValues('cep')

    if (!cep) {
      setError('cep', { message: 'O campo CEP é obrigatório.' })
      setLoading(false)
      return
    } else {
      clearErrors('cep')
    }

    if (!cep.includes('_')) {
      await axios
        .get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          setLoading(false)

          setValue('place', response.data.logradouro)
          setValue('neighborhood', response.data.bairro)
          setValue('city', response.data.localidade)
        })
    } else {
      setError('cep', { message: 'O campo CEP precisa ter 9 caracteres.' })
      setLoading(false)
      return
    }
  }

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
            onClick={() => handleEditDialog(emExecucao)}
          >
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleDeleteDialog(emExecucao)}
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
            <AlertDialogTitle>Alterar Permissionário</AlertDialogTitle>
          </AlertDialogHeader>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="h-[600px] sm:h-[500px] 2xl:h-fit w-full">
              <div className="space-y-4 pr-3">
                <div className="grid grid-cols-1 lg:grid-cols-4 items-end gap-4">
                  <div className="sm:col-span-3">
                    <Controller
                      name="cep"
                      control={control}
                      defaultValue={selectedToEdit?.cep as string}
                      render={({ field }) => (
                        <InputWithMask
                          format="#####-###"
                          mask="_"
                          label="CEP"
                          labelFor="cep"
                          placeholder="Ex.: 00000-000"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.cep && (
                      <small className="text-red-500">
                        {errors.cep.message}
                      </small>
                    )}
                  </div>

                  <div
                    className={clsx('sm:col-span-1', { 'mb-6': errors.cep })}
                  >
                    <Button
                      type="button"
                      className="w-full"
                      disabled={loading}
                      onClick={() => handleGetAddress()}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <CircleNotch size={24} className="animate-spin" />
                        </div>
                      ) : (
                        'Buscar CEP'
                      )}
                    </Button>
                  </div>

                  <div className="col-span-full">
                    <Controller
                      name="place"
                      control={control}
                      defaultValue={selectedToEdit?.place as string}
                      render={({ field }) => (
                        <InputText
                          label="Logradouro"
                          labelFor="place"
                          placeholder="Ex.: Rua das Pedras"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.place && (
                      <small className="text-red-500">
                        {errors.place.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <Controller
                      name="number"
                      control={control}
                      defaultValue={(selectedToEdit?.number as string) || ''}
                      render={({ field }) => (
                        <InputWithMask
                          format="#######"
                          label="Número"
                          labelFor="number"
                          placeholder="Ex.: 0000000"
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Controller
                      name="complement"
                      control={control}
                      defaultValue={
                        (selectedToEdit?.complement as string) || ''
                      }
                      render={({ field }) => (
                        <InputText
                          label="Complemento"
                          labelFor="complement"
                          placeholder="Ex.: próximo ao Chez Michou"
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="neighborhood"
                      control={control}
                      defaultValue={selectedToEdit?.neighborhood as string}
                      render={({ field }) => (
                        <InputText
                          label="Bairro"
                          labelFor="neighborhood"
                          placeholder="Ex.: Centro"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.neighborhood && (
                      <small className="text-red-500">
                        {errors.neighborhood.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="city"
                      control={control}
                      defaultValue={selectedToEdit?.city as string}
                      render={({ field }) => (
                        <InputText
                          label="Cidade"
                          labelFor="city"
                          placeholder="Ex.: Armação dos Búzios"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.city && (
                      <small className="text-red-500">
                        {errors.city.message}
                      </small>
                    )}
                  </div>

                  <div className="col-span-full">
                    <Controller
                      name="constructionManagerId"
                      control={control}
                      defaultValue={selectedToEdit?.responsavelId as string}
                      render={({ field: { onChange, value } }) => (
                        <SelectDropdown
                          valueDf={value}
                          itemSelected={onChange}
                          isRequired
                          name="responsável da obra"
                          label="Responsável da Obra"
                          labelFor="constructionManagerId"
                          items={managers}
                          isDisabled={isSubmitting}
                        />
                      )}
                    />

                    {errors.constructionManagerId && (
                      <small className="text-red-500">
                        {errors.constructionManagerId.message}
                      </small>
                    )}
                  </div>

                  <div className="col-span-full">
                    <Controller
                      name="embargoNumber"
                      control={control}
                      defaultValue={
                        selectedToEdit?.numeroAutoInfracao as string
                      }
                      render={({ field }) => (
                        <InputText
                          label="Número do Auto de Embargo"
                          labelFor="embargoNumber"
                          placeholder="Ex.: 00000000000"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.embargoNumber && (
                      <small className="text-red-500">
                        {errors.embargoNumber.message}
                      </small>
                    )}
                  </div>

                  <div className="col-span-full">
                    <Label
                      htmlFor="embargoedFile"
                      className={clsx(
                        'focus:outline-none focus-visible:ring-0',
                        {
                          'opacity-20': isSubmitting,
                        },
                      )}
                    >
                      Cópia do Autor de Embargo:
                    </Label>

                    <Input
                      id="embargoedFile"
                      type="file"
                      {...register('file')}
                      className="mt-1 focus:outline-none focus-visible:ring-0 py-3 h-fit cursor-pointer border-zinc-300"
                      accept="application/pdf"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel
                    disabled={isSubmitting}
                    className="focus:outline-none focus-visible:ring-0"
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <CircleNotch size={24} className="animate-spin" />
                      </div>
                    ) : (
                      'Adicionar'
                    )}
                  </Button>
                </AlertDialogFooter>
              </div>
            </ScrollArea>
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
              Você está excluindo uma obra em execução!
            </AlertDialogTitle>

            <AlertDialogDescription>
              A obra{' '}
              <span className="font-medium text-red-600">
                {selectedToDelete?.numeroAutoInfracao}
              </span>{' '}
              está sendo excluída. Você tem certeza que deseja fazer isso?
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
                Obra Em Execução: {emExecucao.numeroAutoInfracao}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-4 text-gray-500">
                Todos os dados da obra.
              </p>
            </div>
          </AlertDialogHeader>

          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  N° Auto de Infração
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {emExecucao.numeroAutoInfracao}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Cópia Auto de Infração
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <Link
                    href={emExecucao.fileAutoInfracao}
                    download="download"
                    target="_blank"
                    className="w-10 h-10 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center rounded"
                  >
                    <DownloadSimple size={24} className="text-blue-600" />
                  </Link>
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  N° da Intimação
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {emExecucao.numeroIntimacao}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Cópia da Intimação
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <Link
                    href={emExecucao.fileIntimacao}
                    download="download"
                    target="_blank"
                    className="w-10 h-10 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center rounded"
                  >
                    <DownloadSimple size={24} className="text-blue-600" />
                  </Link>
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Responsável
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {emExecucao.responsavel}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Telefone do Responsável
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {emExecucao.telefone}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Endereço da Obra
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {emExecucao.place}
                  {emExecucao.number && `, ${emExecucao.number}`}
                  {emExecucao.complement && ` - ${emExecucao.complement}`}
                  {` - ${emExecucao.neighborhood}`}
                  {` - ${emExecucao.city}`}
                  {` - ${emExecucao.cep}`}
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

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
import { toast } from 'react-toastify'
import InputText from '@/components/InputText/InputText'
import { responsaveis } from './schema'
import clsx from 'clsx'
import { ScrollArea } from '@/components/ui/scroll-area'
import InputWithMask from '@/components/InputWithMask/InputWithMask'
import InputFormatCPFCNPJ from '@/components/InputFormatCpfcnpj/InputFormatCpfcnpj'
import InputFormatPhone from '@/components/InputFormatPhone/InputFormatPhone'

const schema = z.object({
  name: z.string().nonempty('O campo Nome Completo é obrigatório.'),
  document: z.string().nonempty('O campo CPF/CNPJ é obrigatório.'),
  cep: z.string().nonempty('O campo CEP é obrigatório.'),
  place: z.string().nonempty('O campo Logradouro é obrigatório.'),
  complement: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().nonempty('O campo Bairro é obrigatório.'),
  city: z.string().nonempty('O campo Cidade é obrigatório.'),
  phone: z.string().nonempty('O campo Telefone é obrigatório'),
  email: z
    .string()
    .nonempty('O campo e-mail é obrigatório.')
    .email('Informe um e-mail válido.'),
})

type FormProps = z.infer<typeof schema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

type SelectedData = z.infer<typeof responsaveis>

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

  const responsavel = responsaveis.parse(row.original)

  const handleEditDialog = (responsavel: SelectedData) => {
    setSelectedToEdit(responsavel)
    setOpenEdit(true)
  }

  const handleDeleteDialog = (responsavel: SelectedData) => {
    setSelectedToDelete(responsavel)
    setOpenDelete(true)
  }

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)
  const onSubmit = useCallback(
    async (data: any) => {
      setLoading(true)

      let newData: any = data

      if (data.number === '') {
        const { number: noNumber, ...rest } = newData
        newData = rest
      } else {
        newData = {
          ...newData,
          number: data.number.trim(),
        }
      }

      if (data.complement === '') {
        const { complement: noComplement, ...rest } = newData
        newData = rest
      }

      const allData = {
        ...newData,
        name: newData?.name.toUpperCase(),
        id: responsavel.id,
      }

      await axios
        .patch('/api/urbanismo/responsavel', allData)
        .then((response) => {
          setOpenEdit(false)
          toast.success(response.data.message)
          mutate('/api/urbanismo/responsavel')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })

      setLoading(false)
    },
    [responsavel],
  )

  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleDelete = useCallback(async (data: any) => {
    setLoadingDelete(true)

    await axios
      .delete('/api/urbanismo/responsavel', {
        data: { id: data },
      })
      .then((response) => {
        setOpenDelete(false)
        toast.success(response.data.message)
        mutate('/api/urbanismo/responsavel')
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

  const [docType, setDocType] = useState(
    responsavel.documento.length === 14 ? 'cpf' : 'cnpj',
  )
  const handleDocType = (value: string) => {
    setDocType(value)
  }

  const [phoneType, setPhoneType] = useState(
    responsavel.telefone.length === 14 ? 'fixo' : 'celular',
  )
  const handlePhoneType = (value: string) => {
    setPhoneType(value)
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
            onClick={() => handleEditDialog(responsavel)}
          >
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => handleDeleteDialog(responsavel)}
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
                  <div className="sm:col-span-2">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue={selectedToEdit?.nome || ''}
                      render={({ field }) => (
                        <InputText
                          label="Nome Completo"
                          labelFor="name"
                          placeholder="Ex.: João da Silva"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.name && (
                      <small className="text-red-500">
                        {errors.name.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="document"
                      control={control}
                      defaultValue={selectedToEdit?.documento || ''}
                      render={({ field }) => (
                        <InputFormatCPFCNPJ
                          defaultDocumentValue={
                            responsavel.documento.length === 14 ? 'cpf' : 'cnpj'
                          }
                          format={
                            docType === 'cnpj'
                              ? '##.###.###/####-##'
                              : '###.###.###-##'
                          }
                          mask="_"
                          labelFor="document"
                          placeholder={
                            docType === 'cnpj'
                              ? 'Ex.: 00.000.000/0000-00'
                              : 'Ex.: 000.000.000-00'
                          }
                          isRequired
                          docType={(v: string) => handleDocType(v)}
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.document && (
                      <small className="text-red-500">
                        {errors.document.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <Controller
                      name="cep"
                      control={control}
                      defaultValue={selectedToEdit?.cep || ''}
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
                      defaultValue={selectedToEdit?.place || ''}
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
                      defaultValue={selectedToEdit?.number}
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
                      defaultValue={selectedToEdit?.complement}
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
                      defaultValue={selectedToEdit?.neighborhood || ''}
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
                      defaultValue={selectedToEdit?.city || ''}
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

                  <div className="sm:col-span-2">
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={selectedToEdit?.email || ''}
                      render={({ field }) => (
                        <InputText
                          label="E-mail"
                          labelFor="email"
                          placeholder="Ex.: joaodasilva@gmail.com"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.email && (
                      <small className="text-red-500">
                        {errors.email.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue={selectedToEdit?.telefone || ''}
                      render={({ field }) => (
                        <InputFormatPhone
                          defaultPhoneValue={
                            responsavel.telefone.length === 14
                              ? 'fixo'
                              : 'celular'
                          }
                          format={
                            phoneType === 'celular'
                              ? '(##) # ####-####'
                              : '(##) ####-####'
                          }
                          mask="_"
                          labelFor="phone"
                          placeholder={
                            phoneType === 'celular'
                              ? 'Ex.: (21) 9 0000-0000'
                              : 'Ex.: (21) 0000-0000'
                          }
                          isRequired
                          phoneType={(v: string) => handlePhoneType(v)}
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.phone && (
                      <small className="text-red-500">
                        {errors.phone.message}
                      </small>
                    )}
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isSubmitting}>
                    Cancelar
                  </AlertDialogCancel>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <CircleNotch size={24} className="animate-spin" />
                      </div>
                    ) : (
                      'Alterar'
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
              Você está excluindo um responsável!
            </AlertDialogTitle>

            <AlertDialogDescription>
              O responsável{' '}
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
                {responsavel.nome}
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-4 text-gray-500">
                Todos os dados do(a) responsável.
              </p>
            </div>
          </AlertDialogHeader>

          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Nome Completo
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {responsavel.nome}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  CPF/CNPJ
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {responsavel.documento}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  E-mail
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {responsavel.email}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Telefone
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {responsavel.telefone}
                </dd>
              </div>

              <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-4 sm:leading-6 text-gray-900">
                  Endereço
                </dt>
                <dd className="mt-1 text-xs sm:text-sm leading-4 sm:leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {responsavel.place}
                  {responsavel.number && `, ${responsavel.number}`}
                  {responsavel.complement && ` - ${responsavel.complement}`}
                  {` - ${responsavel.neighborhood}`}
                  {` - ${responsavel.city}`}
                  {` - ${responsavel.cep}`}
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

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
import useSWR, { mutate } from 'swr'
import { toast } from 'react-toastify'
import InputText from '@/components/InputText/InputText'
import { permissionarios } from './schema'
import clsx from 'clsx'
import { ScrollArea } from '@/components/ui/scroll-area'
import InputWithMask from '@/components/InputWithMask/InputWithMask'
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown'
import { Textarea } from '@/components/ui/textarea'
import { SelectMapper } from '@/utils/mappers'

const schema = z.object({
  name: z.string().nonempty('O campo Nome Completo é obrigatório.'),
  cpf: z.string().nonempty('O campo CPF é obrigatório.'),
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
  modalType: z.string().nonempty('O campo Tipo de Modal é obrigatório'),
  notes: z.string().optional(),
})

type FormProps = z.infer<typeof schema>

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

type SelectedData = z.infer<typeof permissionarios>

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { data } = useSWR('/api/modaltype', fetcher)
  const types = SelectMapper(data?.modalTypes)

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

      const newdata = {
        ...data,
        name: data.name.toUpperCase(),
        number: data.number ? data.number.trim() : null,
        complement: data.complement ? data.complement.trim() : null,
        notes: data.notes ? data.notes.trim() : null,
        modalTypeId: data.modalType,
        id: permissionario.id,
      }
      // eslint-disable-next-line no-unused-vars
      const { modalType: newModalType, ...rest } = newdata

      await axios
        .patch('/api/transporte/permissionario-van', rest)
        .then((response) => {
          setOpenEdit(false)
          toast.success(response.data.message)
          mutate('/api/transporte/permissionario-van')
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })

      setLoading(false)
    },
    [permissionario],
  )

  const [loadingDelete, setLoadingDelete] = useState(false)
  const handleDelete = useCallback(async (data: any) => {
    setLoadingDelete(true)

    await axios
      .delete('/api/transporte/permissionario-van', { data: { id: data } })
      .then((response) => {
        setOpenDelete(false)
        toast.success(response.data.message)
        mutate('/api/transporte/permissionario-van')
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
                      name="cpf"
                      control={control}
                      defaultValue={selectedToEdit?.cpf || ''}
                      render={({ field }) => (
                        <InputWithMask
                          format="###.###.###-##"
                          mask="_"
                          label="CPF"
                          labelFor="cpf"
                          placeholder="Ex.: 000.000.000-00"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.cpf && (
                      <small className="text-red-500">
                        {errors.cpf.message}
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
                      defaultValue={selectedToEdit?.number || ''}
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
                      defaultValue={selectedToEdit?.complement || ''}
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
                      defaultValue={selectedToEdit?.phone || ''}
                      render={({ field }) => (
                        <InputWithMask
                          format="(##) #####-####"
                          mask="_"
                          label="Telefone"
                          labelFor="phone"
                          placeholder="Ex.: (22) 90000-0000"
                          isRequired
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

                  <div className="col-span-full">
                    <Controller
                      name="modalType"
                      control={control}
                      defaultValue={selectedToEdit?.modalId || ''}
                      render={({ field: { onChange, value } }) => (
                        <SelectDropdown
                          itemSelected={onChange}
                          isRequired
                          name="Tipo de Modal"
                          label="Tipo de Modal"
                          labelFor="modalType"
                          items={types}
                          isDisabled={isSubmitting}
                          valueDf={value}
                        />
                      )}
                    />

                    {errors.modalType && (
                      <small className="text-red-500">
                        {errors.modalType.message}
                      </small>
                    )}
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="notes"
                      className={clsx(
                        'block text-sm font-medium leading-6 text-gray-900',
                        {
                          'opacity-20': isSubmitting,
                        },
                      )}
                    >
                      Anotações:
                    </label>

                    <div className="mt-1">
                      <Controller
                        name="notes"
                        control={control}
                        defaultValue={selectedToEdit?.notes || ''}
                        render={({ field }) => (
                          <Textarea
                            placeholder="Digite uma anotação..."
                            className="placeholder:text-zinc-400"
                            disabled={isSubmitting}
                            {...field}
                          />
                        )}
                      />
                    </div>
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
              Você está excluindo um permissionário!
            </AlertDialogTitle>

            <AlertDialogDescription>
              O permissionário{' '}
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

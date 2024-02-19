'use client'

import InputText from '@/components/InputText/InputText'
import InputWithMask from '@/components/InputWithMask/InputWithMask'
import SelectDropdown from '@/components/SelectDropdown/SelectDropdown'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { SelectMapper } from '@/utils/mappers'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch } from '@phosphor-icons/react'
import axios from 'axios'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'
import useSWR, { mutate } from 'swr'

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

export type AmbulanteFormProps = z.infer<typeof schema>

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function AddButton() {
  const { data } = useSWR('/api/modaltype', fetcher)
  const types = SelectMapper(data?.modalTypes)

  const {
    getValues,
    setValue,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AmbulanteFormProps>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const onSubmit = useCallback(
    async (data: AmbulanteFormProps) => {
      const newdata = {
        ...data,
        name: data.name.toUpperCase(),
        number: data.number ? data.number.trim() : null,
        complement: data.complement ? data.complement.trim() : null,
        notes: data.notes ? data.notes.trim() : null,
        modalTypeId: data.modalType,
      }
      // eslint-disable-next-line no-unused-vars
      const { modalType: newModalType, ...rest } = newdata

      await axios
        .post('/api/transporte/permissionario-van', rest)
        .then((response) => {
          setOpen(false)
          reset()
          toast.success(response.data.message)
          mutate('/api/transporte/permissionario-van')
        })
        .catch((error) => {
          error.response.data.errors.map(({ message }: { message: string }) => {
            toast.error(message)
          })
        })
    },
    [reset],
  )

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
      <Button onClick={() => setOpen(true)}>Adicionar Permissionário</Button>

      <AlertDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return
          setOpen(false)
          reset()
        }}
      >
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar Permissionário</AlertDialogTitle>
          </AlertDialogHeader>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="h-[600px] sm:h-[500px] 2xl:h-fit w-full">
              <div className="space-y-4 pr-3">
                <div className="grid grid-cols-1 lg:grid-cols-4 items-end gap-4">
                  <div className="sm:col-span-2">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
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
                      defaultValue=""
                      render={({ field: { onChange } }) => (
                        <SelectDropdown
                          itemSelected={onChange}
                          isRequired
                          name="Tipo de Modal"
                          label="Tipo de Modal"
                          labelFor="modalType"
                          items={types}
                          isDisabled={isSubmitting}
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
                        defaultValue=""
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
                      'Adicionar'
                    )}
                  </Button>
                </AlertDialogFooter>
              </div>
            </ScrollArea>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

/* eslint-disable no-unused-vars */
'use client'

import InputText from '@/components/InputText/InputText'
import InputWithMask from '@/components/InputWithMask/InputWithMask'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch } from '@phosphor-icons/react'
import axios from 'axios'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { mutate } from 'swr'
import InputFormatPhone from '@/components/InputFormatPhone/InputFormatPhone'

const schema = z.object({
  corporateReason: z.string().nonempty('O campo Razão Social é obrigatório.'),
  businessName: z.string().nonempty('O campo Nome Empresarial é obrigatório.'),
  cnpj: z.string().nonempty('O campo CNPJ é obrigatório.'),
  phone: z.string().nonempty('O campo Telefone é obrigatório'),
  email: z
    .string()
    .nonempty('O campo e-mail é obrigatório.')
    .email('Informe um e-mail válido.'),
  cep: z.string().nonempty('O campo CEP é obrigatório.'),
  place: z.string().nonempty('O campo Logradouro é obrigatório.'),
  complement: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().nonempty('O campo Bairro é obrigatório.'),
  city: z.string().nonempty('O campo Cidade é obrigatório.'),
})

export type EmbargoedWorksFormProps = z.infer<typeof schema>

export function AddButton() {
  const {
    getValues,
    setValue,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmbargoedWorksFormProps>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const onSubmit = useCallback(
    async (data: EmbargoedWorksFormProps) => {
      let newData: any = { ...data, number: data.number?.trim() }

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

      await axios
        .post('/api/fazendaria/iptu', newData)
        .then((response) => {
          setOpen(false)
          reset()
          toast.success(response.data.message)
          mutate('/api/fazendaria/iptu')
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

  const [phoneType, setPhoneType] = useState('celular')
  const handlePhoneType = (value: string) => {
    setPhoneType(value)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Adicionar Imóvel</Button>

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
            <AlertDialogTitle>Adicionar Imóvel</AlertDialogTitle>
          </AlertDialogHeader>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="h-[600px] sm:h-[500px] 2xl:h-fit w-full">
              <div className="space-y-4 pr-3">
                <div className="grid grid-cols-1 lg:grid-cols-4 items-end gap-4">
                  <div className="sm:col-span-full">
                    <Controller
                      name="corporateReason"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputText
                          label="Razão Social"
                          labelFor="corporateReason"
                          placeholder="Ex.: Hotel de Búzios LTDA"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.corporateReason && (
                      <small className="text-red-500">
                        {errors.corporateReason.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="businessName"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputText
                          label="Nome Empresarial"
                          labelFor="businessName"
                          placeholder="Ex.: Hotel de Búzios"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.businessName && (
                      <small className="text-red-500">
                        {errors.businessName.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="cnpj"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputWithMask
                          format="##.###.###/####-##"
                          mask="_"
                          label="CNPJ"
                          labelFor="cnpj"
                          placeholder="Ex.: 00.000.000/0000-00"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.cnpj && (
                      <small className="text-red-500">
                        {errors.cnpj.message}
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
                          type="email"
                          label="E-mail"
                          labelFor="email"
                          placeholder="Ex.: hoteldebuzios@gmail.com"
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
                        <InputFormatPhone
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

                  <div className="sm:col-span-full">
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

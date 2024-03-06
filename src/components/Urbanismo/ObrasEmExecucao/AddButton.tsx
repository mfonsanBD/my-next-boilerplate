/* eslint-disable no-unused-vars */
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChangeFileToBase64 } from '@/utils/helpers'

const MAX_FILE_SIZE = 2097152
const ACCEPTED_IMAGE_TYPES = ['application/pdf']

const schema = z.object({
  constructionManagerId: z
    .string()
    .nonempty('O campo Responsável da Obra é obrigatório.'),
  infractionNoticeNumber: z
    .string()
    .nonempty('O campo Número do Auto de Infração é obrigatório.'),
  intimationNumber: z
    .string()
    .nonempty('O campo Número da Intimação é obrigatório.'),
  cep: z.string().nonempty('O campo CEP é obrigatório.'),
  place: z.string().nonempty('O campo Logradouro é obrigatório.'),
  complement: z.string().optional(),
  number: z.string().optional(),
  neighborhood: z.string().nonempty('O campo Bairro é obrigatório.'),
  city: z.string().nonempty('O campo Cidade é obrigatório.'),
  infractionNoticeFile: z
    .any()
    .refine(
      (files) => files?.length === 1,
      'A Cópia do Auto de Infração é obrigatório.',
    )
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      `A Cópia do Auto de Infração deve conter no máximo 2MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'A Cópia do Auto de Infração precisa ser um aquivo .pdf',
    ),
  intimationFile: z
    .any()
    .refine(
      (files) => files?.length === 1,
      'A Cópia da Intimação é obrigatório.',
    )
    .refine(
      (files) => files?.[0]?.size < MAX_FILE_SIZE,
      `A Cópia da Intimação deve conter no máximo 2MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'A Cópia da Intimação precisa ser um aquivo .pdf',
    ),
})

export type EmbargoedWorksFormProps = z.infer<typeof schema>

const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export function AddButton() {
  const { data } = useSWR('/api/urbanismo/responsavel', fetcher)
  const managers = SelectMapper(data?.urbanismoManagers)

  const {
    getValues,
    setValue,
    handleSubmit,
    control,
    setError,
    clearErrors,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EmbargoedWorksFormProps>({
    resolver: zodResolver(schema),
  })

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)

  const onSubmit = useCallback(
    async (data: EmbargoedWorksFormProps) => {
      let newData: any = data

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

      let allData: any = newData

      await axios
        .post('/api/upload-file', {
          file: await ChangeFileToBase64(data.infractionNoticeFile[0]),
        })
        .then(
          (result) =>
            (allData = {
              ...allData,
              infractionNoticeFile: result?.data as string,
            }),
        )

      await axios
        .post('/api/upload-file', {
          file: await ChangeFileToBase64(data.intimationFile[0]),
        })
        .then(
          (result) =>
            (allData = {
              ...allData,
              intimationFile: result?.data as string,
            }),
        )

      await axios
        .post('/api/urbanismo/obras-em-execucao', allData)
        .then((response) => {
          setOpen(false)
          reset()
          toast.success(response.data.message)
          mutate('/api/urbanismo/obras-em-execucao')
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
      <Button onClick={() => setOpen(true)}>Adicionar Obra</Button>

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
            <AlertDialogTitle>Adicionar Obra Em Execução</AlertDialogTitle>
          </AlertDialogHeader>

          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <ScrollArea className="h-[600px] sm:h-[500px] 2xl:h-fit w-full">
              <div className="space-y-4 pr-3">
                <div className="grid grid-cols-1 lg:grid-cols-4 items-start gap-4">
                  <div className="col-span-full">
                    <Controller
                      name="constructionManagerId"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange } }) => (
                        <SelectDropdown
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

                  <div className="sm:col-span-2">
                    <Controller
                      name="infractionNoticeNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputText
                          label="Número do Auto de Infração"
                          labelFor="infractionNoticeNumber"
                          placeholder="Ex.: 00000000000"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.infractionNoticeNumber && (
                      <small className="text-red-500">
                        {errors.infractionNoticeNumber.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="infractionNoticeFile"
                      className={clsx({
                        'opacity-20': isSubmitting,
                      })}
                    >
                      Cópia do Auto de Infração:{' '}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input
                      id="infractionNoticeFile"
                      type="file"
                      disabled={isSubmitting}
                      {...register('infractionNoticeFile')}
                      className="mt-1 focus:outline-none focus-visible:ring-0 py-3 h-fit cursor-pointer border-zinc-300"
                      accept="application/pdf"
                    />

                    {errors.infractionNoticeFile && (
                      <small className="text-red-500">
                        {errors.infractionNoticeFile.message?.toString()}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Controller
                      name="intimationNumber"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <InputText
                          label="Número da Intimação"
                          labelFor="intimationNumber"
                          placeholder="Ex.: 00000000000"
                          isRequired
                          disabled={isSubmitting}
                          isDisabled={isSubmitting}
                          {...field}
                        />
                      )}
                    />

                    {errors.intimationNumber && (
                      <small className="text-red-500">
                        {errors.intimationNumber.message}
                      </small>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <Label
                      htmlFor="intimationFile"
                      className={clsx({
                        'opacity-20': isSubmitting,
                      })}
                    >
                      Cópia da Intimação:{' '}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Input
                      id="intimationFile"
                      type="file"
                      disabled={isSubmitting}
                      {...register('intimationFile')}
                      className="mt-1 focus:outline-none focus-visible:ring-0 py-3 h-fit cursor-pointer border-zinc-300"
                      accept="application/pdf"
                    />

                    {errors.intimationFile && (
                      <small className="text-red-500">
                        {errors.intimationFile.message?.toString()}
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

                  <div className="sm:col-span-1">
                    <Button
                      type="button"
                      className="w-full py-6"
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

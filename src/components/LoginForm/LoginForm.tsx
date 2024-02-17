'use client'

import * as z from 'zod'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleNotch, EnvelopeSimple } from '@phosphor-icons/react'

// import Logo from '../Logo/Logo'
import { Button } from '../ui/button'
import InputText from '../InputText/InputText'
import InputPassword from '../InputPassword/InputPassword'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'

const schema = z.object({
  email: z
    .string()
    .nonempty('O e-mail é obrigatório.')
    .email('Formato de e-mail inválido.'),
  password: z.string().nonempty('A senha é obrigatória.'),
})

type SignInFormProps = z.infer<typeof schema>

export default function LoginForm() {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormProps>({
    resolver: zodResolver(schema),
  })

  const handleSignIn = useCallback(
    async (data: any) => {
      const result = await signIn('credentials', { ...data, redirect: false })

      if (result?.error) {
        toast.error(result?.error)
      } else {
        reset()
        router.replace('/painel-controle')
      }
    },
    [reset, router],
  )
  return (
    <div className="w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
        {/* <Logo color="colorized" /> */}

        <div className="mt-10 space-y-1">
          <h2 className="text-center text-3xl font-extrabold leading-6 tracking-tight text-slate-900">
            Entre na sua Conta
          </h2>
          <p className="text-slate-600">
            Identifique-se para utilizar o sistema
          </p>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="w-full space-y-6"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <div className="w-full">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <InputText
                  value={value}
                  type="email"
                  label="E-mail"
                  labelFor="email"
                  placeholder="Ex.: joaodasilva@gmail.com"
                  isRequired
                  onChange={onChange}
                  disabled={isSubmitting}
                  isDisabled={isSubmitting}
                  icon={<EnvelopeSimple size={20} />}
                />
              )}
            />

            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>

          <div className="w-full">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value } }) => (
                <InputPassword
                  value={value}
                  label="Senha"
                  labelFor="password"
                  placeholder="***********"
                  isRequired
                  onChange={onChange}
                  disabled={isSubmitting}
                  isDisabled={isSubmitting}
                  loginPage
                />
              )}
            />

            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>

          <Button
            className="w-full text-white"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <CircleNotch size={24} className="animate-spin" />
                <p>Aguarde um momento</p>
              </div>
            ) : (
              'Acessar'
            )}
          </Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não é associado?{' '}
          <Link
            href="/cadastro"
            className="font-medium leading-6 text-primary hover:text-blue-900"
          >
            Cadastre-se agora
          </Link>
        </p>
      </div>
    </div>
  )
}

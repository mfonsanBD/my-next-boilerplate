'use client'

import { EnvelopeSimple } from '@phosphor-icons/react'
import InputText from '../InputText/InputText'
import Logo from '../Logo'
import InputPassword from '../InputPassword/InputPassword'
import { Button } from '../ui/button'

export default function LoginForm() {
  return (
    <div className="w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
        <Logo color="colorized" />

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
        <form className="w-full space-y-6">
          <InputText
            type="email"
            label="E-mail"
            labelFor="email"
            isRequired
            icon={<EnvelopeSimple size={20} />}
          />
          <InputPassword label="Senha" labelFor="senha" isRequired loginPage />
          <Button className="w-full text-white">Acessar</Button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Não é associado?{' '}
          <a
            href="/cadastro"
            className="font-semibold leading-6 text-primary hover:text-blue-900"
          >
            Cadastre-se agora
          </a>
        </p>
      </div>
    </div>
  )
}

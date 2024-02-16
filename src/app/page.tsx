import InputPassword from '@/components/InputPassword'
import InputText from '@/components/InputText'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="h-screen px-6 py-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center">
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
          <form className="space-y-6">
            <InputText
              type="email"
              label="E-mail"
              labelFor="email"
              isRequired
            />
            <InputPassword
              label="Senha"
              labelFor="senha"
              isRequired
              loginPage
            />
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

      <div className="w-full h-full bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl items-center justify-center hidden md:flex">
        <div className="w-[500px] relative flex items-center justify-center">
          <Logo size="3xl" />
          <div className="w-full h-28 absolute -bottom-20 bg-gradient-to-r from-blue-900/60 to-blue-950/60 border border-white/5 backdrop-blur-sm rounded-lg flex items-center justify-center uppercase font-extrabold text-3xl text-white">
            Associação dos fiscais
            <br />
            de Armação dos Búzios
          </div>
        </div>
      </div>
    </div>
  )
}

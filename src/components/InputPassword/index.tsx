'use client'

import { Eye, EyeClosed, Lock } from '@phosphor-icons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { InputHTMLAttributes, useState } from 'react'

type InputPasswordProps = {
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
  loginPage?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function InputPassword({
  label,
  labelFor,
  isRequired,
  isDisabled,
  loginPage = false,
  ...props
}: InputPasswordProps) {
  const [isHidden, setIsHidden] = useState(true)

  const handleTooglePasswordVisibility = () => {
    setIsHidden(!isHidden)
  }
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <label
          htmlFor={labelFor}
          className={clsx('block text-sm font-medium leading-6 text-gray-900', {
            'opacity-20': isDisabled,
          })}
        >
          {label}: {isRequired && <span className="text-red-500">*</span>}
        </label>

        {loginPage && (
          <Link
            href="/esqueci-minha-senha"
            className="text-sm font-semibold text-primary hover:text-blue-900"
          >
            esqueci minha senha
          </Link>
        )}
      </div>

      <div className="mt-1 relative flex items-center justify-end">
        {!isHidden ? (
          <Eye
            size={20}
            className="absolute right-4 cursor-pointer fill-zinc-400"
            onClick={handleTooglePasswordVisibility}
          />
        ) : (
          <EyeClosed
            size={20}
            className="absolute right-4 cursor-pointer fill-zinc-400"
            onClick={handleTooglePasswordVisibility}
          />
        )}

        <Lock size={20} className="absolute left-4 fill-zinc-400" />

        <input
          id={labelFor}
          disabled={isDisabled}
          type={isHidden ? 'password' : 'text'}
          autoComplete={labelFor}
          className="block w-full rounded-md border border-zinc-300 py-3 px-12 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20"
          {...props}
        />
      </div>
    </div>
  )
}

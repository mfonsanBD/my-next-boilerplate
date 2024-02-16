import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

type InputTextProps = {
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function InputText({
  label,
  labelFor,
  isRequired,
  isDisabled,
  ...props
}: InputTextProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={labelFor}
        className={clsx('block text-sm font-medium leading-6 text-gray-900', {
          'opacity-20': isDisabled,
        })}
      >
        {label}: {isRequired && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-1">
        <input
          id={labelFor}
          disabled={isDisabled}
          autoComplete={labelFor}
          className="block w-full rounded-md border border-zinc-300 py-3 px-4 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20"
          {...props}
        />
      </div>
    </div>
  )
}

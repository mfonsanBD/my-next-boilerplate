import { Eye, EyeClosed } from '@phosphor-icons/react'
import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'

type InputPasswordProps = {
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function InputPassword({
  label,
  labelFor,
  isRequired,
  isDisabled,
  ...props
}: InputPasswordProps) {
  const [isHidden, setIsHidden] = useState(true)

  const handleTooglePasswordVisibility = () => {
    setIsHidden(!isHidden)
  }
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

      <div className="mt-1 relative flex items-center justify-end">
        {!isHidden ? (
          <Eye
            size={20}
            className="absolute mr-4 cursor-pointer fill-zinc-400"
            onClick={handleTooglePasswordVisibility}
          />
        ) : (
          <EyeClosed
            size={20}
            className="absolute mr-4 cursor-pointer fill-zinc-400"
            onClick={handleTooglePasswordVisibility}
          />
        )}

        <input
          id={labelFor}
          disabled={isDisabled}
          type={isHidden ? 'password' : 'text'}
          autoComplete={labelFor}
          className="block w-full rounded-md border border-zinc-300 py-3 pl-4 pr-12 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20"
          {...props}
        />
      </div>
    </div>
  )
}

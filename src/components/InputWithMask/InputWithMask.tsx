'use client'

import { PatternFormat, PatternFormatProps } from 'react-number-format'
import clsx from 'clsx'
import { Input } from '../ui/input'
import { IconProps } from '@phosphor-icons/react'

type InputWithMaskProps = {
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
  icon?: IconProps
} & PatternFormatProps

export default function InputWithMask({
  label,
  labelFor,
  isRequired,
  isDisabled,
  icon,
  ...props
}: InputWithMaskProps) {
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
        <div className="absolute left-4 text-zinc-400">
          {!!icon && <>{icon}</>}
        </div>

        <PatternFormat
          id={labelFor}
          disabled={isDisabled}
          autoComplete={labelFor}
          {...props}
          customInput={Input}
          className="block w-full rounded-md border border-zinc-300 py-6 px-12 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  )
}

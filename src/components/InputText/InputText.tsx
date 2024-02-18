'use client'

import { IconProps } from '@phosphor-icons/react'
import clsx from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'

type InputTextProps = {
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
  icon?: IconProps
} & InputHTMLAttributes<HTMLInputElement>

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  function InputText(
    { label, labelFor, isRequired, isDisabled, icon, ...props }: InputTextProps,
    ref,
  ) {
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
          {!!icon && (
            <div className="absolute left-4 text-zinc-400">
              <>{icon}</>
            </div>
          )}

          <input
            id={labelFor}
            ref={ref}
            disabled={isDisabled}
            autoComplete={labelFor}
            className={clsx(
              'block w-full rounded-md border border-zinc-300 py-3 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20 focus-visible:ring-0',
              {
                'px-12': !!icon,
                'px-4': !icon,
              },
            )}
            {...props}
          />
        </div>
      </div>
    )
  },
)

export default InputText

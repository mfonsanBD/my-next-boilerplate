'use client'

import { PatternFormat, PatternFormatProps } from 'react-number-format'
import clsx from 'clsx'
import { Input } from '../ui/input'
import { IconProps } from '@phosphor-icons/react'
import { forwardRef } from 'react'

type InputWithMaskProps = {
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
  icon?: IconProps
} & PatternFormatProps

const InputWithMask = forwardRef<PatternFormatProps, InputWithMaskProps>(
  function InputWithMask(
    {
      label,
      labelFor,
      isRequired,
      isDisabled,
      icon,
      ...props
    }: InputWithMaskProps,
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

          <PatternFormat
            id={labelFor}
            getInputRef={ref}
            disabled={isDisabled}
            autoComplete={labelFor}
            customInput={Input}
            className={clsx(
              'block w-full rounded-md border border-zinc-300 py-6 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20 focus-visible:ring-0 focus-visible:ring-offset-0',
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

export default InputWithMask

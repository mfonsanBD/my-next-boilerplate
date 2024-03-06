/* eslint-disable no-unused-vars */
'use client'

import { PatternFormat, PatternFormatProps } from 'react-number-format'
import { Input } from '../ui/input'
import { forwardRef, useState } from 'react'

type InputFormatPhoneProps = {
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
  phoneType: (value: string) => void
  defaultPhoneValue?: string
} & PatternFormatProps

const InputFormatPhone = forwardRef<PatternFormatProps, InputFormatPhoneProps>(
  function InputFormatPhone(
    {
      labelFor,
      isRequired = false,
      isDisabled = false,
      phoneType,
      defaultPhoneValue = '',
      ...props
    }: InputFormatPhoneProps,
    ref,
  ) {
    const [selectedOption, setSelectedOption] = useState<string>(
      defaultPhoneValue || 'celular',
    )
    const handleOptionChange = (option: string) => {
      setSelectedOption(option)
      phoneType(option)
    }

    return (
      <div className="w-full">
        <div className="flex items-center gap-1">
          <div className="relative flex gap-x-4">
            <div className="flex items-center gap-x-2">
              <input
                id="celular"
                name="phone"
                type="radio"
                checked={selectedOption === 'celular'}
                onChange={() => handleOptionChange('celular')}
                className="h-4 w-4 border-gray-300 text-blue-700 focus:ring-0 focus:ring-offset-0"
              />
              <label
                htmlFor="celular"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Celular
              </label>
            </div>

            <div className="flex items-center gap-x-2">
              <input
                id="fixo"
                name="phone"
                type="radio"
                checked={selectedOption === 'fixo'}
                onChange={() => handleOptionChange('fixo')}
                className="h-4 w-4 border-gray-300 text-blue-700 focus:ring-0 focus:ring-offset-0"
              />
              <label
                htmlFor="fixo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fixo
              </label>
            </div>
          </div>
          {isRequired && <span className="text-red-500">*</span>}
        </div>

        <div className="mt-1 relative flex items-center justify-end">
          <PatternFormat
            id={labelFor}
            getInputRef={ref}
            disabled={isDisabled}
            autoComplete={labelFor}
            customInput={Input}
            {...props}
            className="block w-full rounded-md border border-zinc-300 py-6 text-zinc-900 placeholder:text-zinc-400 outline-none sm:text-sm sm:leading-6 focus:outline-none focus:ring-0 focus:border-zinc-300 disabled:opacity-20 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
    )
  },
)

export default InputFormatPhone

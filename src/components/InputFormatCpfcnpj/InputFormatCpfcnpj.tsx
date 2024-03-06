/* eslint-disable no-unused-vars */
'use client'

import { PatternFormat, PatternFormatProps } from 'react-number-format'
import { Input } from '../ui/input'
import { forwardRef, useState } from 'react'

type InputFormatCPFCNPJProps = {
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
  docType: (value: string) => void
  defaultDocumentValue?: string
} & PatternFormatProps

const InputFormatCPFCNPJ = forwardRef<
  PatternFormatProps,
  InputFormatCPFCNPJProps
>(function InputFormatCPFCNPJ(
  {
    labelFor,
    isRequired = false,
    isDisabled = false,
    docType,
    defaultDocumentValue = '',
    ...props
  }: InputFormatCPFCNPJProps,
  ref,
) {
  const [selectedOption, setSelectedOption] = useState<string>(
    defaultDocumentValue || 'cpf',
  )
  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
    docType(option)
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-1">
        <div className="relative flex gap-x-4">
          <div className="flex items-center gap-x-2">
            <input
              id="cpf"
              name="doc-type"
              type="radio"
              checked={selectedOption === 'cpf'}
              onChange={() => handleOptionChange('cpf')}
              className="h-4 w-4 border-gray-300 text-blue-700 focus:ring-0 focus:ring-offset-0"
            />
            <label
              htmlFor="cpf"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CPF
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <input
              id="cnpj"
              name="doc-type"
              type="radio"
              checked={selectedOption === 'cnpj'}
              onChange={() => handleOptionChange('cnpj')}
              className="h-4 w-4 border-gray-300 text-blue-700 focus:ring-0 focus:ring-offset-0"
            />
            <label
              htmlFor="cnpj"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              CNPJ
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
})

export default InputFormatCPFCNPJ

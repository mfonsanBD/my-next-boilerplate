'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { ScrollArea } from '../ui/scroll-area'
import clsx from 'clsx'

interface SelectData {
  value: string
  label: string
}

export interface SelectDropdownProps {
  // eslint-disable-next-line no-unused-vars
  itemSelected: (value: any) => void
  items?: SelectData[]
  valueDf?: string
  name: string
  label: string
  labelFor: string
  isRequired?: boolean
  isDisabled?: boolean
}

export default function SelectDropdown({
  itemSelected,
  items = [],
  valueDf = '',
  name,
  label,
  labelFor,
  isRequired,
  isDisabled,
}: SelectDropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const handleChangeValue = (value: string) => {
    setValue(value)
    itemSelected(value)
  }
  return (
    <div>
      <label
        htmlFor={labelFor}
        className={clsx(
          'block text-sm font-medium leading-6 text-gray-900 mb-1',
          {
            'opacity-20': isDisabled,
          },
        )}
      >
        {label}: {isRequired && <span className="text-red-500">*</span>}
      </label>

      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger
          asChild
          className={clsx({
            'opacity-20 pointer-events-none': isDisabled,
          })}
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={isDisabled}
            className={clsx(
              'w-full justify-between py-6 font-normal border-zinc-300',
              { 'text-zinc-400': !value },
              { 'text-zinc-600': value },
            )}
          >
            {valueDf
              ? items.find((item) => item.value === valueDf)?.label
              : value
                ? items.find((item) => item.value === value)?.label
                : 'Selecione uma opção...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandInput
              className="outline-none focus:outline-none focus:ring-0 focus:ring-transparent focus:border-none"
              placeholder={`Buscar ${name}...`}
            />
            <CommandEmpty>Nenhum(a) {name} encontrado.</CommandEmpty>
            <CommandGroup>
              <ScrollArea
                className={clsx('w-full', {
                  'h-fit': items.length <= 10,
                  'h-52': items.length > 10,
                })}
              >
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue: string) => {
                      handleChangeValue(
                        currentValue === value ? '' : currentValue,
                      )
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === item.value ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

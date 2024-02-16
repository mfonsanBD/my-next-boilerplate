import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { List, X } from '@phosphor-icons/react'
import Logo from '../Logo'

import UserDropdown from '../UserDropdown'

const navigation = [
  { name: 'Painel de Controle', href: '/painel-controle', current: true },
  { name: 'Postura', href: '/postura', current: false },
  { name: 'Transporte', href: '/transporte', current: false },
  { name: 'Meio Ambiente', href: '/meio-ambiente', current: false },
  { name: 'Urbanismo', href: '/urbanismo', current: false },
  {
    name: 'Vigilância Sanitária',
    href: '/vigilancia-sanitaria',
    current: false,
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-blue-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex py-4 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-800 hover:text-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <List className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Logo size="small" />
                </div>

                <div className="hidden sm:ml-10 sm:flex items-center">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-blue-950 text-white'
                            : 'text-gray-300 hover:bg-blue-800 hover:text-white',
                          'rounded-md px-4 py-2 text-sm font-medium',
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <UserDropdown />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-blue-950 text-white'
                      : 'text-gray-300 hover:bg-blue-800 hover:text-white',
                    'block rounded-md px-3 py-3 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

'use client'

import { Dialog, Popover, Transition } from '@headlessui/react'
import { List, X } from '@phosphor-icons/react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useState } from 'react'

interface Items {
  label: string
  url: string
}

const menuItems: Items[] = [
  { label: 'Obras em Execução', url: '/urbanismo/obras-em-execucao' },
  { label: 'Responsáveis de Obras', url: '/urbanismo/responsaveis-obras' },
]

export function UrbanismoNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {menuItems.map((page) => (
                    <div key={page.label} className="flow-root">
                      <a
                        href={page.url}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.label}
                      </a>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex pt-6 items-center">
              <button
                type="button"
                className="relative mb-4 lg:mt-0 flex items-center gap-2 rounded-md bg-white text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <div>
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open menu</span>
                  <List className="h-6 w-6" aria-hidden="true" />
                </div>

                <p>Menu Urbanismo</p>
              </button>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:block lg:self-stretch">
                <div className="flex items-center justify-start flex-wrap h-full gap-4">
                  {menuItems.map((page) => (
                    <div key={page.label}>
                      <Link
                        href={page.url}
                        className={clsx(
                          'flex items-center justify-center text-sm font-medium pb-2',
                          {
                            'text-gray-400 hover:text-blue-600 border-b-4 border-b-white':
                              !pathname.includes(page.url),
                            'text-blue-600 border-b-4 border-b-blue-600':
                              pathname.includes(page.url),
                          },
                        )}
                      >
                        {page.label}
                      </Link>
                    </div>
                  ))}
                </div>
              </Popover.Group>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

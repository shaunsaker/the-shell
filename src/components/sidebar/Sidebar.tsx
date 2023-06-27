import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, Cog6ToothIcon, HomeModernIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import { Fragment, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { routes } from '../../routes'
import { Backdrop } from '../backdrop/Backdrop'
import { Logo } from '../logo/Logo'

type NavigationItem = {
  name: string
  href: string
  icon: any
  isActive: (pathname: string) => boolean
}

const navigation: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: HomeModernIcon,
    isActive: (pathname: string) => pathname === routes.dashboard,
  },
  {
    name: 'Settings',
    href: routes.settings,
    icon: Cog6ToothIcon,
    isActive: (pathname: string) => pathname.startsWith(routes.settings),
  },
]

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-tremor-brand px-6 dark:bg-dark-tremor-brand">
      <div className="flex h-16 shrink-0 items-center">
        <Logo className="fill-tremor-brand-inverted dark:fill-dark-tremor-brand-inverted" />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-1 flex-col space-y-1">
          {navigation.map(item => (
            <li key={item.name}>
              <Link
                to={item.href}
                className={twMerge(
                  item.isActive(location.pathname)
                    ? 'bg-tremor-brand-emphasis text-tremor-brand-inverted dark:bg-dark-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted'
                    : 'text-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted dark:hover:bg-dark-tremor-brand-emphasis',
                  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors'
                )}
              >
                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile menu */}
      <Button
        variant="light"
        color="gray"
        className="fixed left-0 top-0 -m-2.5 p-7 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>

        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </Button>

      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Backdrop />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <Button
                      variant="light"
                      className="-m-2.5 p-2.5 text-white hover:text-gray-300"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>

                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Button>
                  </div>
                </Transition.Child>

                {sidebar}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col">{sidebar}</div>
    </>
  )
}

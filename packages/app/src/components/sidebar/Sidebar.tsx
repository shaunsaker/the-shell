import { Dialog } from '@headlessui/react'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import app from '../../../../common/app.json'
import { useLink } from '../../utils/useLink'
import { useSidebarOpen } from '../../utils/useSidebarOpen'
import { Backdrop } from '../backdrop/Backdrop'
import { Logo } from '../logo/Logo'

export type NavigationItem = {
  name: string
  href: string
  icon: any
  isActive: boolean
}

type Props = {
  items: NavigationItem[]
  onClick?: (href: string) => void
}

export const Sidebar = ({ items, onClick }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()
  const link = useLink()

  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-tremor-brand px-6 dark:bg-dark-tremor-brand">
      <div className="flex h-16 shrink-0 items-center">
        <Logo className="fill-tremor-brand-inverted dark:fill-dark-tremor-brand-inverted" />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-col space-y-1 pb-4">
          {items.map(item => {
            return (
              <li key={item.name}>
                <Button
                  icon={item.icon}
                  className={twMerge(
                    item.isActive
                      ? 'bg-tremor-brand-emphasis text-tremor-brand-inverted dark:bg-dark-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted'
                      : 'text-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted dark:hover:bg-dark-tremor-brand-emphasis',
                    'w-full justify-start border-none shadow-none',
                  )}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!item.isActive && onClick) {
                      onClick(item.href)
                    }
                  }}
                >
                  {item.name}
                </Button>
              </li>
            )
          })}

          <li>
            <Button
              icon={QuestionMarkCircleIcon}
              className={twMerge(
                'text-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted dark:hover:bg-dark-tremor-brand-emphasis',
                'w-full justify-start border-none shadow-none',
              )}
              onClick={() => {
                link(`mailto:${app.supportEmail}`, '_blank')
              }}
            >
              Support
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      <AnimatePresence>
        <Dialog as="div" open={sidebarOpen} className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Backdrop />
          </motion.div>

          <div className="fixed inset-0 flex">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, transform: 'translateX(-100%)' }}
              animate={{ opacity: 1, transform: 'translateX(0%)' }}
              exit={{ opacity: 0, transform: 'translateX(-100%)' }}
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
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

                {sidebar}
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      </AnimatePresence>

      <div className="hidden shrink-0 lg:flex lg:w-72 lg:flex-col">{sidebar}</div>
    </>
  )
}

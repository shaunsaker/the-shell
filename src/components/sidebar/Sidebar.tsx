import { Dialog } from '@headlessui/react'
import { Cog6ToothIcon, HomeModernIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import app from '../../../app.json'
import { useSubscription } from '../../hooks/subscription/useSubscription'
import { useLink } from '../../hooks/utils/useLink'
import { useSidebarOpen } from '../../hooks/utils/useSidebarOpen'
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
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()
  const location = useLocation()
  const navigate = useNavigate()
  const link = useLink()
  const { data: subscription } = useSubscription()

  const sidebar = (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-tremor-brand px-6 dark:bg-dark-tremor-brand">
      <div className="flex h-16 shrink-0 items-center">
        <Logo className="fill-tremor-brand-inverted dark:fill-dark-tremor-brand-inverted" />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-col space-y-1">
          {navigation.map(item => {
            const disabled = item.href === routes.dashboard && !subscription // TODO: SS when we introduce features, disable the Dashboard if there is no subscription

            return (
              <li key={item.name}>
                <Button
                  icon={item.icon}
                  disabled={disabled}
                  className={twMerge(
                    item.isActive(location.pathname)
                      ? 'bg-tremor-brand-emphasis text-tremor-brand-inverted dark:bg-dark-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted'
                      : 'text-tremor-brand-inverted hover:bg-tremor-brand-emphasis dark:text-dark-tremor-brand-inverted dark:hover:bg-dark-tremor-brand-emphasis',
                    'w-full justify-start border-none shadow-none'
                  )}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!item.isActive(location.pathname)) {
                      navigate(item.href)
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
                'w-full justify-start border-none shadow-none'
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
              className="flex w-full flex-col"
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

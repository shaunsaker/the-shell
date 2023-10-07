import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { twMerge } from 'tailwind-merge'

import { useSidebarOpen } from '@/sidebar/hooks/useSidebarOpen'
import { NavigationItem } from '@/types'
import { useKeyPress } from '@/utils/useKeyPress'
import { useLink } from '@/utils/useLink'
import { useOutsideClick } from '@/utils/useOutsideClick'

import app from '../../../../config/app.json'
import { Backdrop } from '../backdrop/Backdrop'
import { Button } from '../button/Button'
import { Logo } from '../logo/Logo'

type Props = {
  items: NavigationItem[]
  onClick?: (href: string) => void
}

export const Sidebar = ({ items, onClick }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useSidebarOpen()
  const link = useLink()

  useOutsideClick(ref, () => {
    if (sidebarOpen) {
      setSidebarOpen(false)
    }
  })

  useKeyPress('Escape', () => {
    if (sidebarOpen) {
      setSidebarOpen(false)
    }
  })

  const sidebar = (
    <div ref={ref} className="bg-theme-brand dark:bg-dark-theme-brand flex grow flex-col gap-y-6 overflow-y-auto p-6">
      <div className="flex items-center">
        <Logo className="fill-theme-brand-inverted dark:fill-dark-theme-brand-inverted" />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-col space-y-1 pb-4">
          {items.map(item => {
            return (
              <li key={item.name}>
                <Button
                  icon={item.icon}
                  className={twMerge(
                    'w-full justify-start border-none shadow-none outline-offset-0',
                    item.active
                      ? 'bg-theme-brand-emphasis text-theme-brand-inverted dark:bg-dark-theme-brand-emphasis dark:text-dark-theme-brand-inverted'
                      : 'text-theme-brand-inverted hover:bg-theme-brand-emphasis dark:text-dark-theme-brand-inverted dark:hover:bg-dark-theme-brand-emphasis',
                  )}
                  disabled={item.disabled}
                  onClick={() => {
                    // navigate to the route if we're not already on that route
                    if (!item.active && onClick) {
                      onClick(item.href)

                      if (sidebarOpen) {
                        // close the Sidebar
                        setSidebarOpen(false)
                      }
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
              icon={<QuestionMarkCircleIcon />}
              className={twMerge(
                'text-theme-brand-inverted hover:bg-theme-brand-emphasis dark:text-dark-theme-brand-inverted dark:hover:bg-dark-theme-brand-emphasis',
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
        {sidebarOpen && (
          <div className="relative z-50 lg:hidden">
            <Backdrop />

            <div className="fixed inset-0 flex">
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0, transform: 'translateX(-100%)' }}
                animate={{ opacity: 1, transform: 'translateX(0%)' }}
                exit={{ opacity: 0, transform: 'translateX(-100%)' }}
              >
                <div className="relative mr-16 flex w-full max-w-xs flex-1">
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
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <div className="hidden shrink-0 lg:flex lg:w-72 lg:flex-col">{sidebar}</div>
    </>
  )
}

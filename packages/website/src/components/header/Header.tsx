'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar, Logo, Popover, Sidebar } from 'components'
import { useRouter } from 'next/navigation'
import React, { ComponentProps, ReactElement, useState } from 'react'

import { routes } from '@/routes'

type NavigationItem = ComponentProps<typeof Sidebar>['items'][0]

const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: 'Features',
    href: routes.features,
  },
  {
    name: 'Testimonials',
    href: routes.testimonials,
  },
  {
    name: 'Pricing',
    href: routes.pricing,
  },
]

const SIGN_IN_NAVIGATION_ITEM: NavigationItem = {
  name: 'Sign in',
  href: process.env.NEXT_PUBLIC_APP_SIGN_IN_URL,
}

export const Header = (): ReactElement => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Headerbar>
        <Button
          className="-ml-3 lg:hidden"
          variant="lightNeutral"
          onClick={() => {
            setSidebarOpen(true)
          }}
        >
          <Bars3Icon className="h-6 w-6" />
        </Button>

        <button className="mr-4 flex items-center">
          <Logo />
        </button>

        <div className="hidden items-center gap-x-2 lg:flex">
          {NAVIGATION_ITEMS.map((link) => (
            <Button
              key={link.href}
              variant="lightNeutral"
              onClick={() => {
                router.push(link.href)
              }}
            >
              {link.name}
            </Button>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-2">
          <div className="hidden lg:block">
            <Button
              variant="lightNeutral"
              onClick={() => {
                router.push(SIGN_IN_NAVIGATION_ITEM.href)
              }}
            >
              {SIGN_IN_NAVIGATION_ITEM.name}
            </Button>
          </div>

          <Button
            onClick={() => {
              router.push(process.env.NEXT_PUBLIC_APP_SIGN_UP_URL)
            }}
          >
            Get started today
          </Button>
        </div>
      </Headerbar>

      <div className="lg:hidden">
        <Popover
          open={sidebarOpen}
          onClose={() => {
            setSidebarOpen(false)
          }}
        >
          <Sidebar
            items={[...NAVIGATION_ITEMS, SIGN_IN_NAVIGATION_ITEM]}
            onItemClick={(href) => {
              router.push(href)

              setSidebarOpen(false)
            }}
          />
        </Popover>
      </div>
    </>
  )
}

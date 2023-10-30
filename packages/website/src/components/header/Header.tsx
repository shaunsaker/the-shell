'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar, Logo, Popover, Sidebar } from 'components'
import { useRouter } from 'next/navigation'
import React, { ComponentProps, ComponentPropsWithoutRef, useState } from 'react'
import { useLink } from 'utils'

import { PRIMARY_ACTION_LINK, PRIMARY_ACTION_TEXT, SECONDARY_ACTION_LINK, SECONDARY_ACTION_TEXT } from '@/constants'
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
  {
    name: 'Blog',
    href: routes.blog,
  },
]

const SECONDARY_ACTION: NavigationItem = {
  name: SECONDARY_ACTION_TEXT,
  href: SECONDARY_ACTION_LINK,
}

type Props = ComponentPropsWithoutRef<'header'>

export const Header = ({ ...props }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()
  const link = useLink()

  return (
    <>
      <Headerbar {...props}>
        <Button
          className="-ml-3 lg:hidden"
          aria-label="Open sidebar"
          variant="lightNeutral"
          onClick={() => {
            setSidebarOpen(true)
          }}
        >
          <Bars3Icon className="h-6 w-6" />
        </Button>

        <Button
          className="-ml-3"
          variant="lightNeutral"
          onClick={() => {
            router.push(routes.home)
          }}
        >
          <Logo />
        </Button>

        <div className="hidden items-center gap-x-2 lg:flex">
          {NAVIGATION_ITEMS.map(link => (
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

        <div className="flex flex-1 items-center justify-end gap-x-2 pr-4 lg:pr-0">
          <div className="hidden lg:block">
            <Button
              variant="secondary"
              onClick={() => {
                link(SECONDARY_ACTION.href, '_blank')
              }}
            >
              {SECONDARY_ACTION.name}
            </Button>
          </div>

          <Button
            onClick={() => {
              link(PRIMARY_ACTION_LINK, '_blank')
            }}
          >
            {PRIMARY_ACTION_TEXT}
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
            items={[...NAVIGATION_ITEMS, SECONDARY_ACTION]}
            onItemClick={href => {
              router.push(href)

              setSidebarOpen(false)
            }}
          />
        </Popover>
      </div>
    </>
  )
}

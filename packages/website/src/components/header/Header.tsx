'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { Button, Headerbar, Logo, Popover, Sidebar } from 'components'
import { app } from 'config'
import { useRouter } from 'next/navigation'
import React, { ComponentProps, ComponentPropsWithoutRef, useState } from 'react'

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

const SIGN_IN_NAVIGATION_ITEM: NavigationItem = {
  name: 'Sign in',
  href: process.env.NEXT_PUBLIC_APP_SIGN_IN_URL,
}

type Props = ComponentPropsWithoutRef<'header'>

export const Header = ({ ...props }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

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
              router.push(app.website.primaryAction.link)
            }}
          >
            {app.website.primaryAction.label}
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

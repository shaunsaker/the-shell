'use client'

import { Bars3Icon } from '@heroicons/react/24/solid'
import { Button, Headerbar, Logo, Popover, Sidebar } from 'components'
import { Logomark } from 'components/src/components/logomark/Logomark'
import { useRouter } from 'next/navigation'
import React, { ComponentPropsWithoutRef, useState } from 'react'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'
import constants from '@/constants.json'
import { routes } from '@/routes'
import { getDynamicNavItems } from '@/routes/getDynamicNavItems'

import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'

const NAVIGATION_ITEMS = getDynamicNavItems()

type Props = ComponentPropsWithoutRef<'header'>

export const Header = ({ ...props }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router = useRouter()

  return (
    <>
      <Headerbar {...props}>
        {NAVIGATION_ITEMS.length ? (
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
        ) : null}

        <Button
          name="Logo"
          className="-ml-3"
          variant="lightNeutral"
          onClick={() => {
            router.push(routes.home)
          }}
        >
          <span className="hidden sm:block">
            <Logo />
          </span>

          <span className="sm:hidden">
            <Logomark />
          </span>
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

        {constants.header.cta && (
          <div className="flex flex-1 items-center justify-end gap-x-2 pr-4 lg:pr-0">
            <PrimaryActionButton name={AnalyticsPrimaryButtonName.Header}>{constants.header.cta}</PrimaryActionButton>
          </div>
        )}
      </Headerbar>

      {NAVIGATION_ITEMS.length ? (
        <div className="lg:hidden">
          <Popover
            open={sidebarOpen}
            onClose={() => {
              setSidebarOpen(false)
            }}
          >
            <Sidebar>
              {NAVIGATION_ITEMS.map(navItem => (
                <Sidebar.Item
                  key={navItem.href}
                  onClick={() => {
                    router.push(navItem.href)

                    if (sidebarOpen) {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  {navItem.name}
                </Sidebar.Item>
              ))}
            </Sidebar>
          </Popover>
        </div>
      ) : null}
    </>
  )
}

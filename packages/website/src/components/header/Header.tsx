'use client'

import { Button, Headerbar, Logo } from 'components'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { routes } from '@/routes'

const NAV_LINKS = [
  {
    label: 'Features',
    href: routes.features,
  },
  {
    label: 'Testimonials',
    href: routes.testimonials,
  },
  {
    label: 'Pricing',
    href: routes.pricing,
  },
]

// TODO: SS mobile menu
export const Header = (): ReactElement => {
  const router = useRouter()

  return (
    <Headerbar>
      <button className="mr-4 flex items-center">
        <Logo />
      </button>

      {NAV_LINKS.map((link) => (
        <Button
          key={link.href}
          variant="lightNeutral"
          onClick={() => {
            router.push(link.href)
          }}
        >
          {link.label}
        </Button>
      ))}

      <div className="flex flex-1 items-center justify-end gap-x-2">
        <Button
          variant="lightNeutral"
          onClick={() => {
            router.push(process.env.NEXT_PUBLIC_APP_SIGN_IN_URL)
          }}
        >
          Sign in
        </Button>

        <Button
          onClick={() => {
            router.push(process.env.NEXT_PUBLIC_APP_SIGN_UP_URL)
          }}
        >
          Get started today
        </Button>
      </div>
    </Headerbar>
  )
}

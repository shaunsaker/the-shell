'use client'

import { Button, Logo, Text } from 'components'
import { useRouter } from 'next/navigation'
import React, { ReactElement } from 'react'

import { routes } from '@/routes'

import { app } from '../../../../config'

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

export const Footer = (): ReactElement => {
  const router = useRouter()

  return (
    <footer className="flex flex-col items-center bg-theme-background-muted px-4 dark:bg-dark-theme-background-muted">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-16">
          <Button
            variant="lightNeutral"
            onClick={() => {
              router.push(routes.home)
            }}
          >
            <Logo />
          </Button>

          <nav className="mt-8 flex items-center">
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
          </nav>
        </div>

        <div className="flex w-full items-center border-t border-theme-border py-10 dark:border-dark-theme-border">
          <Text>
            Copyright &copy; {new Date().getFullYear()} {app.name}. All rights
            reserved.
          </Text>

          <div className="flex flex-1 items-center justify-end">
            {app.social.twitter && (
              <Button variant="lightNeutral">
                <svg aria-hidden="true" className="h-6 w-6 fill-current">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646 4.118 4.118 0 0 0 1.804-2.27 8.224 8.224 0 0 1-2.605.996 4.107 4.107 0 0 0-6.993 3.743 11.65 11.65 0 0 1-8.457-4.287 4.106 4.106 0 0 0 1.27 5.477A4.073 4.073 0 0 1 2.8 9.713v.052a4.105 4.105 0 0 0 3.292 4.022 4.093 4.093 0 0 1-1.853.07 4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 2 18.407a11.615 11.615 0 0 0 6.29 1.84" />
                </svg>
              </Button>
            )}

            {app.social.github && (
              <Button variant="lightNeutral">
                <svg aria-hidden="true" className="h-6 w-6 fill-current">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
              </Button>
            )}

            {app.social.linkedIn && (
              <Button variant="lightNeutral">
                <svg aria-hidden="true" className="h-6 w-6 fill-current">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}

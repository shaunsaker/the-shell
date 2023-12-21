import '@/styles/index.css'

import { Snackbar } from 'components'
import { type Metadata } from 'next'
import React, { ReactNode } from 'react'

import { AppProvider } from '@/components/appProvider/AppProvider'
import { MainLayout } from '@/components/mainLayout/MainLayout'

import { app, tailwindTheme } from '../../../config'

export const metadata: Metadata = {
  // NOTE: the icons and og images are automatically added to the head by Next.js
  title: {
    template: `%s - ${app.name}`,
    default: app.name,
  },
  description: app.description,
  themeColor: tailwindTheme.extend.colors.theme.brand.DEFAULT,
  openGraph: {
    title: app.name,
    description: app.description,
    url: process.env.NEXT_PUBLIC_URL,
    siteName: app.name,
    locale: 'en_US',
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-theme-background dark:bg-dark-theme-background">
        <AppProvider>
          <MainLayout>{children}</MainLayout>

          <Snackbar />
        </AppProvider>
      </body>
    </html>
  )
}

import '@/styles/index.css'

import { type Metadata } from 'next'
import { ReactNode } from 'react'

import { MainLayout } from '@/components/mainLayout/MainLayout'

import { app } from '../../../config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${app.name}`,
    default: `${app.name}`,
  },
  description: `${app.description}`,
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full scroll-smooth font-sans antialiased">
      <body className="h-full bg-theme-background dark:bg-dark-theme-background">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}

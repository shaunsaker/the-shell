import '../globals.css'

import { ReactNode } from 'react'

import { AppProvider } from '../components/appProvider/AppProvider'

type RootLayoutProps = { children: ReactNode }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}

export { metadata } from './metadata'

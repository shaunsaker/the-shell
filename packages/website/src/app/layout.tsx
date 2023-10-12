import '@/styles/index.css'

import { type Metadata } from 'next'

import { app } from '../../../config'

export const metadata: Metadata = {
  title: {
    template: `%s - ${app.displayName}`,
    default: `${app.displayName}`,
  },
  description: `${app.description}`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

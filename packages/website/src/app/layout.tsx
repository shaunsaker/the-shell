import '@/styles/index.css'

import clsx from 'clsx'
import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s - TaxPal',
    default: 'TaxPal - Accounting made simple for small businesses',
  },
  description:
    'Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={clsx('h-full scroll-smooth bg-white antialiased')}
    >
      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}

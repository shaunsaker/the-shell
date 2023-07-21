import { Container, Img, Tailwind, Text } from '@react-email/components'
import dotenv from 'dotenv'
import React, { ReactElement, ReactNode } from 'react'

import app from '../../app.json'
import { tailwindConfig } from '../tailwind.config'

dotenv.config()

const baseUrl = process.env.SITE_URL || ''

type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="bg-tremor-background-muted px-8 py-16 font-sans">
        <Img className="mx-auto mb-8 h-8 w-8" src={`${baseUrl}/icon-512.png`} />

        <Container className="w-full max-w-xl rounded-lg border border-solid border-tremor-border bg-tremor-background p-6 shadow-sm">
          {children}
        </Container>

        <Text className="m-0 mt-8 text-center text-sm text-tremor-content">{app.displayName}</Text>
      </div>
    </Tailwind>
  )
}

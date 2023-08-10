import { Container, Img, Tailwind, Text } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'

import app from '../../common/app.json'
import { tailwindConfig } from '../tailwind.config'
import { Description } from './Description'

// FIXME: localhost port should come from config
const BASE_URL = process.env.CONTEXT !== 'dev' ? process.env.SITE_URL : 'http://localhost:5173'

if (!BASE_URL) {
  throw new Error('BASE_URL is not defined')
}

type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="bg-tremor-background-muted px-8 py-16 font-sans">
        <Img className="mx-auto mb-8 h-8 w-8" src={`${BASE_URL}/icon-512.png`} />

        <Container className="border-tremor-border bg-tremor-background w-full max-w-xl rounded-lg border border-solid p-6 shadow-sm">
          {children}

          <Description>Cheers,</Description>
          <Description>The {app.displayName} team</Description>
        </Container>

        <Text className="text-tremor-content m-0 mt-8 text-center text-sm">{app.displayName}</Text>
      </div>
    </Tailwind>
  )
}

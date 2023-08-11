import { Container, Img, Tailwind, Text } from '@react-email/components'
import React, { ReactElement, ReactNode } from 'react'

import app from '../../common/app.json'
import { tailwindConfig } from '../tailwind.config'
import { getBaseUrl } from '../utils/getBaseUrl'
import { Description } from './Description'

type LayoutProps = {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <Tailwind config={tailwindConfig}>
      <div className="bg-theme-background-muted px-8 py-16 font-sans">
        <Img className="mx-auto mb-8 h-8 w-8" src={`${getBaseUrl()}/icon-512.png`} />

        <Container className="border-theme-border bg-theme-background w-full max-w-xl rounded-lg border border-solid p-6 shadow-sm">
          {children}

          <Description>Cheers,</Description>
          <Description>The {app.displayName} team</Description>
        </Container>

        <Text className="text-theme-content m-0 mt-8 text-center text-sm">{app.displayName}</Text>
      </div>
    </Tailwind>
  )
}

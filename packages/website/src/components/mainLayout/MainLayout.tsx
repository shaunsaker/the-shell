import React, { ReactElement } from 'react'

import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'

type Props = {
  children?: React.ReactNode
}

export const MainLayout = ({ children }: Props): ReactElement => {
  return (
    <>
      <Header className="fixed inset-x-0 top-0 z-20" />

      {children}

      <Footer />
    </>
  )
}

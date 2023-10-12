import React, { ReactElement } from 'react'

import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'

type Props = {
  children?: React.ReactNode
}

export const MainLayout = ({ children }: Props): ReactElement => {
  return (
    <>
      <Header />

      <main className="">{children}</main>

      <Footer />
    </>
  )
}

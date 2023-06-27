import { ReactElement } from 'react'

import { Snackbar } from '../snackbar/Snackbar'

type Props = { children: ReactElement }

export const AppProvider = ({ children }: Props): ReactElement => {
  return (
    <>
      {children}

      <Snackbar />
    </>
  )
}

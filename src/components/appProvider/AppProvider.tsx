import { ReactElement } from 'react'

type Props = { children: ReactElement }

export const AppProvider = ({ children }: Props): ReactElement => {
  return children
}

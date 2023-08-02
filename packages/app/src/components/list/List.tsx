import { List as ListPrimitive } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'

type Props = { children?: ReactNode }

export const List = ({ children }: Props): ReactElement => {
  return <ListPrimitive>{children}</ListPrimitive>
}

export { ListItem } from './ListItem'

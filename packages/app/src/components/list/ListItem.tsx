import { ListItem as ListItemPrimitive } from '@tremor/react'
import React, { ReactElement, ReactNode } from 'react'

type Props = { children?: ReactNode }

export const ListItem = ({ children }: Props): ReactElement => {
  return <ListItemPrimitive>{children}</ListItemPrimitive>
}

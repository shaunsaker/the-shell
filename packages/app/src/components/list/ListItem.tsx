import { ListItem as ListItemPrimitive } from '@tremor/react'
import React, { HTMLAttributes, ReactElement } from 'react'

type Props = HTMLAttributes<HTMLLIElement>

export const ListItem = ({ ...props }: Props): ReactElement => {
  return <ListItemPrimitive {...props} />
}

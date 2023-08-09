import React, { ComponentPropsWithoutRef, ReactElement } from 'react'

type Props = ComponentPropsWithoutRef<'li'>

export const SelectItem = ({ ...props }: Props): ReactElement => {
  return <li {...props} />
}

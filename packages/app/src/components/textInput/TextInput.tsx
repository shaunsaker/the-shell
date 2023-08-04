import { TextInput as TextInputPrimitive } from '@tremor/react'
import React, { ComponentProps, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { Text } from '../text/Text'

type TextInputProps = { label?: string } & ComponentProps<typeof TextInputPrimitive>

export const TextInput = ({ className = '', label, ...props }: TextInputProps): ReactElement => {
  return (
    <div className={twMerge('flex flex-col gap-y-2', className)}>
      {label && <Text>{label}</Text>}

      <TextInputPrimitive {...props} />
    </div>
  )
}

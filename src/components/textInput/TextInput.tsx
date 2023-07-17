import { Text, TextInput as TextInputPrimitive } from '@tremor/react'
import React, { ComponentProps, ReactElement } from 'react'

type TextInputProps = { label?: string } & ComponentProps<typeof TextInputPrimitive>

export const TextInput = ({ className, label, ...props }: TextInputProps): ReactElement => {
  return (
    <div className={className}>
      {label && <Text className="mb-2">{label}</Text>}

      <TextInputPrimitive {...props} />
    </div>
  )
}

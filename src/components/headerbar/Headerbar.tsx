import React, { ReactElement, ReactNode } from 'react'

type HeaderbarProps = {
  children?: ReactNode
}

export const Headerbar = ({ children }: HeaderbarProps): ReactElement => {
  return (
    <div className="flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">{children}</div>
    </div>
  )
}

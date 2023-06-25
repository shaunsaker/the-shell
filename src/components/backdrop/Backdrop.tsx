import React, { forwardRef } from 'react'

export const Backdrop = forwardRef((_, ref: any) => {
  return <div ref={ref} className="fixed inset-0 bg-gray-500/75 transition-opacity" />
})

import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'

export const Backdrop = forwardRef((_, ref: any) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={ref}
      className="bg-tremor-background-emphasis fixed inset-0 opacity-75 transition-opacity"
    />
  )
})

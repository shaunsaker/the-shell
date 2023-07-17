import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

type SkeletonLoaderProps = {
  className?: string
}

export const SkeletonLoader = ({ className }: SkeletonLoaderProps): ReactElement => {
  return (
    <motion.div
      className={twMerge(
        'h-8 w-full rounded-tremor-default bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle',
        className
      )}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 0.5, scale: 0.98 }}
      transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.67 }}
    />
  )
}

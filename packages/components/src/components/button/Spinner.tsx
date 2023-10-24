import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

type SpinnerProps = {
  loading?: boolean
}

export const Spinner = ({ loading }: SpinnerProps) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
            width: '0px',
          }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: '0px' }}
        >
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="fill-transparent opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

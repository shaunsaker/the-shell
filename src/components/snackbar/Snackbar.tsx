import { Text } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { resolveValue, useToaster } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'

export const Snackbar = (): ReactElement => {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause } = handlers

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex flex-col items-center pt-2"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      <AnimatePresence initial={false}>
        {toasts
          .filter(toast => toast.visible)
          .map(toast => {
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -64, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  transition: { delay: 1, duration: 0.2 },
                }}
              >
                <div
                  className={twMerge(
                    'mt-2 max-w-lg rounded px-4 py-2 shadow-lg',
                    toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                  )}
                >
                  <Text className="text-center text-tremor-content-inverted dark:text-dark-tremor-content-inverted">
                    {resolveValue(toast.message, toast)}
                  </Text>
                </div>
              </motion.div>
            )
          })}
      </AnimatePresence>
    </div>
  )
}

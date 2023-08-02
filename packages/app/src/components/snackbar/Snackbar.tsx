import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import { resolveValue, ToastType, useToaster } from 'react-hot-toast'

import { Alert, AlertKind } from '../alert/Alert'

const mapTypeToKind: Record<ToastType, AlertKind> = {
  success: 'success',
  error: 'error',
  loading: 'info',
  blank: 'info',
  custom: 'info',
}

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
                <Alert className="shadow-lg" kind={mapTypeToKind[toast.type]}>
                  {String(resolveValue(toast.message, toast))}
                </Alert>
              </motion.div>
            )
          })}
      </AnimatePresence>
    </div>
  )
}

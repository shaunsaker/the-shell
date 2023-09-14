import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'
import toast, { resolveValue, ToastType, useToaster } from 'react-hot-toast'

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
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center"
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      <AnimatePresence initial={false}>
        {toasts
          .filter(toast => toast.visible)
          .map((toastInstance, index) => {
            const initial = { opacity: 0, y: -64 * (index + 1), scale: 0.9 }

            return (
              <motion.div
                key={toastInstance.id}
                initial={initial}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={initial}
              >
                <Alert
                  className="mt-2 shadow-lg"
                  kind={mapTypeToKind[toastInstance.type]}
                  onClose={() => {
                    toast.dismiss(toastInstance.id)
                  }}
                >
                  {String(resolveValue(toastInstance.message, toastInstance))}
                </Alert>
              </motion.div>
            )
          })}
      </AnimatePresence>
    </div>
  )
}

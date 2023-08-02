import { Dialog as DialogPrimitive } from '@headlessui/react'
import { Button, Title } from '@tremor/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement, ReactNode } from 'react'

import { useKeypress } from '../../utils/useKeyPress'
import { Backdrop } from '../backdrop/Backdrop'
import { Text } from '../text/Text'

type DialogProps = {
  open?: boolean
  title?: string
  description?: string
  confirmText?: string
  confirmDisabled?: boolean
  confirmLoading?: boolean
  confirmIsDangerous?: boolean
  cancelText?: string
  children?: ReactNode
  onConfirmClick?: () => void
  onClose: () => void
}

export const Dialog = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  confirmDisabled,
  confirmLoading,
  confirmIsDangerous,
  cancelText = 'Cancel',
  children,
  onConfirmClick,
  onClose,
}: DialogProps): ReactElement | null => {
  // Handle Enter key as confirm click
  useKeypress('Enter', () => {
    if (!open || confirmDisabled || confirmLoading) {
      return
    }

    if (onConfirmClick) {
      onConfirmClick()
    }
  })

  return (
    <AnimatePresence>
      <DialogPrimitive
        open={open}
        onClose={() => {
          if (!confirmLoading) {
            onClose()
          }
        }}
        className="z-50"
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Backdrop />
        </motion.div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              className="flex w-full justify-center"
              initial={{
                opacity: 0,
                transform: 'translateY(4px)',
                scale: 0.95,
              }}
              animate={{ opacity: 1, transform: 'translateY(0px)', scale: 1 }}
              exit={{ opacity: 0, transform: 'translateY(4px)', scale: 0.95 }}
            >
              <DialogPrimitive.Panel className="relative w-full max-w-lg overflow-hidden rounded-lg bg-tremor-background p-4 text-left shadow-xl dark:bg-dark-tremor-background lg:p-6">
                <div>
                  <DialogPrimitive.Title as={Title}>{title}</DialogPrimitive.Title>

                  <DialogPrimitive.Description className="mb-6 mt-2" as={Text}>
                    {description}
                  </DialogPrimitive.Description>

                  {children}

                  <div className="mt-6 flex justify-end gap-4">
                    <Button color="gray" variant="secondary" disabled={confirmLoading} onClick={onClose}>
                      {cancelText}
                    </Button>

                    <Button
                      color={confirmIsDangerous ? 'red' : undefined}
                      disabled={confirmDisabled}
                      loading={confirmLoading}
                      onClick={onConfirmClick}
                    >
                      {confirmText}
                    </Button>
                  </div>
                </div>
              </DialogPrimitive.Panel>
            </motion.div>
          </div>
        </div>
      </DialogPrimitive>
    </AnimatePresence>
  )
}

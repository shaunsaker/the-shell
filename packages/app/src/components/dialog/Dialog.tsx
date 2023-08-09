import { Dialog as DialogPrimitive } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement, ReactNode } from 'react'

import { useKeypress } from '../../utils/useKeyPress'
import { Backdrop } from '../backdrop/Backdrop'
import { Button } from '../button/Button'
import { Card } from '../card/Card'
import { Heading } from '../heading/Heading'
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
  // TODO: SS enclose button
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
        <Backdrop />

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
              <DialogPrimitive.Panel as={Card} className="max-w-lg flex flex-col gap-y-6">
                <div>
                  <DialogPrimitive.Title as={Heading}>{title}</DialogPrimitive.Title>

                  <DialogPrimitive.Description as={Text} className="mt-1">
                    {description}
                  </DialogPrimitive.Description>
                </div>

                {children}

                <div className="flex justify-end gap-x-4">
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
              </DialogPrimitive.Panel>
            </motion.div>
          </div>
        </div>
      </DialogPrimitive>
    </AnimatePresence>
  )
}

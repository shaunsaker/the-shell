import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement, ReactNode, useRef } from 'react'

import { useKeyPress } from '@/utils/useKeyPress'
import { useOutsideClick } from '@/utils/useOutsideClick'

import app from '../../../../config/app.json'
import { Backdrop } from '../backdrop/Backdrop'
import { Button } from '../button/Button'
import { Card } from '../card/Card'
import { Heading } from '../heading/Heading'
import { Text } from '../text/Text'

type Props = {
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
}: Props): ReactElement | null => {
  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, () => {
    if (open) {
      onClose()
    }
  })

  useKeyPress('Escape', () => {
    if (open) {
      onClose()
    }
  })

  return (
    <AnimatePresence>
      {open && (
        <div className="z-50">
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
                <Card ref={ref} className="flex max-w-lg flex-col gap-y-6">
                  <div>
                    <Heading>{title}</Heading>

                    <Text className="mt-1">{description}</Text>
                  </div>

                  {children}

                  <div className="flex justify-end gap-x-4">
                    <Button color={app.neutralColor} variant="secondary" disabled={confirmLoading} onClick={onClose}>
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
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

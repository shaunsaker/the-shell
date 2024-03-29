import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useRef } from 'react'
import { useKeyPress, useOutsideClick } from 'utils'

import { Backdrop } from '../backdrop/Backdrop'
import { Card } from '../card/Card'
import { HeadingText } from '../headingText/HeadingText'
import { SmallText } from '../smallText/SmallText'

type HeaderProps = {
  title?: string
  description?: string
}

const Header = ({ title, description }: HeaderProps) => {
  return (
    <div className="space-y-2">
      <HeadingText>{title}</HeadingText>

      <SmallText>{description}</SmallText>
    </div>
  )
}

type ActionsProps = {
  children?: ReactNode
}

const Actions = ({ children }: ActionsProps) => {
  return <div className="flex justify-end gap-x-4">{children}</div>
}

export type DialogProps = {
  open?: boolean
  children?: ReactNode
  onClose: () => void
}

const Dialog = ({ open, children, onClose }: DialogProps) => {
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
        <>
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
                  {children}
                </Card>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

Dialog.Header = Header
Dialog.Actions = Actions

export { Dialog }

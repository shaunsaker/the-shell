import { Dialog as DialogPrimitive, Transition } from '@headlessui/react'
import { Button, Text, Title } from '@tremor/react'
import React, { Fragment, ReactElement, ReactNode } from 'react'

import { Backdrop } from '../backdrop/Backdrop'

type DialogProps = {
  open?: boolean
  title?: string
  description?: string
  confirmText?: string
  confirmIsDangerous?: boolean
  cancelText?: string
  children?: ReactNode
  onConfirmClick?: () => void
  onClose: () => void
}

// TODO: SS replace Transition with framer-motion
export const Dialog = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  confirmIsDangerous,
  cancelText = 'Cancel',
  children,
  onConfirmClick,
  onClose,
}: DialogProps): ReactElement => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <DialogPrimitive open={open} onClose={onClose} className="z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Backdrop />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPrimitive.Panel className="relative w-full max-w-lg overflow-hidden rounded-lg bg-tremor-background p-4 text-left shadow-xl dark:bg-dark-tremor-background lg:p-6">
                <div>
                  <DialogPrimitive.Title as={Title}>{title}</DialogPrimitive.Title>

                  <DialogPrimitive.Description className="mt-4" as={Text}>
                    {description}
                  </DialogPrimitive.Description>

                  {children}

                  <div className="mt-6 flex justify-end gap-4">
                    <Button color="gray" variant="secondary" onClick={onClose}>
                      {cancelText}
                    </Button>

                    <Button color={confirmIsDangerous ? 'red' : undefined} onClick={onConfirmClick}>
                      {confirmText}
                    </Button>
                  </div>
                </div>
              </DialogPrimitive.Panel>
            </Transition.Child>
          </div>
        </div>
      </DialogPrimitive>
    </Transition.Root>
  )
}

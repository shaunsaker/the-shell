import { Dialog as DialogPrimitive, Transition } from '@headlessui/react'
import { Button, Text, Title } from '@tremor/react'
import React, { Fragment, ReactElement, ReactNode } from 'react'

import { Backdrop } from '../backdrop/Backdrop'

type DialogProps = {
  open?: boolean
  title?: string
  description?: string
  confirmText?: string
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
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPrimitive.Panel className="relative overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <DialogPrimitive.Title as={Title}>{title}</DialogPrimitive.Title>

                  <DialogPrimitive.Description as={Text}>{description}</DialogPrimitive.Description>

                  {children}

                  <div className="mt-6 flex justify-end gap-4">
                    <Button color="gray" variant="secondary" onClick={onClose}>
                      {cancelText}
                    </Button>

                    <Button onClick={onConfirmClick}>{confirmText}</Button>
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

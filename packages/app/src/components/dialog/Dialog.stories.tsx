import type { Meta, StoryObj } from '@storybook/react'

import { Dialog } from './Dialog'

const meta = {
  title: 'Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    title: 'Dialog',
    description: 'This is a dialog',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onConfirmClick: () => {
      console.log('Confirm clicked')
    },
    onClose: () => {
      console.log('Close clicked')
    },
  },
}

export const Dangerous: Story = {
  args: {
    open: true,
    title: 'Dialog',
    description: 'This is a dialog',
    confirmText: 'Confirm',
    confirmIsDangerous: true,
    cancelText: 'Cancel',
    onConfirmClick: () => {
      console.log('Confirm clicked')
    },
    onClose: () => {
      console.log('Close clicked')
    },
  },
}

export const Loading: Story = {
  args: {
    open: true,
    title: 'Dialog',
    description: 'This is a dialog',
    confirmText: 'Confirm',
    confirmIsDangerous: true,
    confirmLoading: true,
    cancelText: 'Cancel',
    onConfirmClick: () => {
      console.log('Confirm clicked')
    },
    onClose: () => {
      console.log('Close clicked')
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './Alert'

const meta = {
  title: 'Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    kind: 'info',
    children: 'Alert',
    onClose: undefined,
  },
}

export const Success: Story = {
  args: {
    kind: 'success',
    children: 'Alert',
    onClose: undefined,
  },
}

export const Warning: Story = {
  args: {
    kind: 'warning',
    children: 'Alert',
    onClose: undefined,
  },
}

export const Error: Story = {
  args: {
    kind: 'error',
    children: 'Alert',
    onClose: undefined,
  },
}

export const CloseButton: Story = {
  args: {
    kind: 'success',
    children: 'Alert',
    onClose: () => {
      console.log('Close')
    },
  },
}

export const LotsOfText: Story = {
  args: {
    kind: 'info',
    children:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    onClose: () => {
      console.log('Close')
    },
  },
}

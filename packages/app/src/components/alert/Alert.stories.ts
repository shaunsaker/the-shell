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

export const Success: Story = {
  args: {
    kind: 'success',
    children: 'Alert',
  },
}

export const Warning: Story = {
  args: {
    kind: 'warning',
    children: 'Alert',
  },
}

export const Error: Story = {
  args: {
    kind: 'error',
    children: 'Alert',
  },
}

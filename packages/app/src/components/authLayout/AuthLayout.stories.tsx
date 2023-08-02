import type { Meta, StoryObj } from '@storybook/react'

import { AuthLayout } from './AuthLayout'

const meta = {
  title: 'AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLayout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Sign in to your account',
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { TextInput } from './TextInput'

const meta = {
  title: 'TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'First name',
    placeholder: 'Enter your first name...',
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Enter your first name...',
  },
}

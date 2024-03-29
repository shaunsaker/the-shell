import type { Meta, StoryObj } from '@storybook/react'

import { CheckIcon } from './CheckIcon'

const meta = {
  title: 'CheckIcon',
  component: CheckIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CheckIcon>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

import type { Meta, StoryObj } from '@storybook/react'

import { Metric } from './Metric'

const meta = {
  title: 'Metric',
  component: Metric,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Metric>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "I'm a Metric component",
  },
}

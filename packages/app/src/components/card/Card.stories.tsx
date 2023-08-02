import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../text/Text'
import { Card } from './Card'

const meta = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Text>I'm a Card component</Text>,
  },
}

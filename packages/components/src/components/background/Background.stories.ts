import type { Meta, StoryObj } from '@storybook/react'

import { Background } from './Background'

const meta = {
  title: 'Background',
  component: Background,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Background>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: "I'm a Background component",
  },
}

export const Inverted: Story = {
  args: {
    variant: 'inverted',
    children: "I'm a Background component",
  },
}

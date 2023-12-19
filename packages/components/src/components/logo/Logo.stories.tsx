import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Background } from '../background/Background'
import { Logo } from './Logo'

const meta = {
  title: 'Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const Inverted: Story = {
  args: {
    variant: 'inverted',
  },
  decorators: [
    Story => (
      <Background>
        <Story />
      </Background>
    ),
  ],
}

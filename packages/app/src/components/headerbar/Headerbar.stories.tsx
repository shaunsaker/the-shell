import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/Button'
import { Headerbar } from './Headerbar'

const meta = {
  title: 'Headerbar',
  component: Headerbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Headerbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Button variant="light">Sign Out</Button>,
  },
}

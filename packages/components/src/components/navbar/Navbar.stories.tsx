import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Navbar } from './Navbar'

const meta = {
  title: 'Navbar',
  component: Navbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Navbar.Item active>Home</Navbar.Item>

        <Navbar.Item>Settings</Navbar.Item>

        <Navbar.Item>Teams</Navbar.Item>
      </>
    ),
  },
}

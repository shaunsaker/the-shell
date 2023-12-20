import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Sidebar } from '../sidebar/Sidebar'
import { Popover } from './Popover'

const meta = {
  title: 'Popover',
  component: Popover,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta

type Story = StoryObj<typeof meta>

const sidebar = (
  <Sidebar>
    <Sidebar.Item icon={<HomeModernIcon />} active>
      Dashboard
    </Sidebar.Item>

    <Sidebar.Item icon={<Cog6ToothIcon />}>Settings</Sidebar.Item>
  </Sidebar>
)

export const Default: Story = {
  args: {
    open: true,
    children: sidebar,
    onClose: () => {
      console.log('Close')
    },
  },
}

export const Right: Story = {
  args: {
    open: true,
    position: 'right',
    children: sidebar,
    onClose: () => {
      console.log('Close')
    },
  },
}

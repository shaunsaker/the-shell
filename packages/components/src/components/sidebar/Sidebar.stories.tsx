import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/solid'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Sidebar } from './Sidebar'

const meta = {
  title: 'Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Sidebar.Item icon={<HomeModernIcon />} active>
          Dashboard
        </Sidebar.Item>

        <Sidebar.Item icon={<Cog6ToothIcon />}>Settings</Sidebar.Item>
      </>
    ),
  },
}

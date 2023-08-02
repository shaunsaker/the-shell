import { Cog6ToothIcon, HomeModernIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

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
    items: [
      {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeModernIcon,
        isActive: true,
      },
      {
        name: 'Settings',
        href: '/settings',
        icon: Cog6ToothIcon,
        isActive: false,
      },
    ],
    onClick: href => {
      console.log(href)
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const dashboardButton = canvas.getByText('Dashboard')

    await userEvent.click(dashboardButton)

    const settingsButton = canvas.getByText('Settings')

    await userEvent.click(settingsButton)
  },
}

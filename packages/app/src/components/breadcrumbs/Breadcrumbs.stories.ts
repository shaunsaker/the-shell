import type { Meta, StoryObj } from '@storybook/react'

import { Breadcrumbs } from './Breadcrumbs'

const meta = {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        name: 'Home',
        href: '/',
        isActive: false,
      },
      {
        name: 'Settings',
        href: '/settings',
        isActive: false,
      },
      {
        name: 'Teams',
        href: '/teams',
        isActive: true,
      },
    ],
    onClick: (href: string) => {
      console.log(href)
    },
  },
}

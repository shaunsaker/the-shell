import { HomeIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Button } from './Button'

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
}

export const SecondaryNeutral: Story = {
  args: {
    variant: 'secondaryNeutral',
    children: 'Button',
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    children: 'Button',
  },
}

export const LightNeutral: Story = {
  args: {
    variant: 'lightNeutral',
    children: 'Button',
  },
}

export const PrimaryCustomColor: Story = {
  args: {
    variant: 'primary',
    color: 'red',
    icon: <HomeIcon />,
    children: 'Button',
  },
}

export const SecondaryCustomColor: Story = {
  args: {
    variant: 'secondary',
    color: 'red',
    icon: <HomeIcon />,
    children: 'Button',
  },
}

export const LightCustomColor: Story = {
  args: {
    variant: 'light',
    color: 'red',
    icon: <HomeIcon />,
    children: 'Button',
  },
}

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    icon: <HomeIcon />,
    children: 'Button',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Button',
  },
}

export const Icon: Story = {
  args: {
    variant: 'primary',
    icon: <HomeIcon />,
    children: 'Button',
  },
}

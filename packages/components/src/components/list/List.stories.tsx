import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { List } from './List'

const meta = {
  title: 'List',
  component: List,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof List>

export default meta

type Story = StoryObj<typeof meta>

const LIST_ITEMS = [
  {
    label: 'Label 1',
    value: 'Value 1',
  },
  {
    label: 'Label 2',
    value: 'Value 2',
  },
  {
    label: 'Label 3',
    value: 'Value 3',
  },
]

export const Default: Story = {
  args: {
    children: LIST_ITEMS.map(({ label, value }) => <List.Item key={value}>{label}</List.Item>),
  },
}

export const MultipleChildren: Story = {
  args: {
    children: LIST_ITEMS.map(({ label, value }) => (
      <List.Item key={value}>
        <span>{label}</span>
        <span>{value}</span>
      </List.Item>
    )),
  },
  parameters: {
    layout: 'padded',
  },
}

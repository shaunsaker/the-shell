import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { List, ListItem } from './List'

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

export const Default: Story = {
  args: {
    children: [<ListItem>List Item 1</ListItem>, <ListItem>List Item 2</ListItem>, <ListItem>List Item 3</ListItem>],
  },
}

export const MultipleChildren: Story = {
  args: {
    children: [
      <ListItem>
        <span>LabelText 1</span>
        <span>Value 1</span>
      </ListItem>,
      <ListItem>
        <span>LabelText 2</span>
        <span>Value 2</span>
      </ListItem>,
      <ListItem>
        <span>LabelText 3</span>
        <span>Value 3</span>
      </ListItem>,
    ],
  },
  parameters: {
    layout: 'padded',
  },
}

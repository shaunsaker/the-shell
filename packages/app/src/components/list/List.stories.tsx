import type { Meta, StoryObj } from '@storybook/react'

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

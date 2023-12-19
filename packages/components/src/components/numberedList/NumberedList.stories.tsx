import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { NumberedList } from './NumberedList'

const meta = {
  title: 'NumberedList',
  component: NumberedList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberedList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <NumberedList.Item number={1}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</NumberedList.Item>

        <NumberedList.Item number={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</NumberedList.Item>

        <NumberedList.Item number={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</NumberedList.Item>
      </>
    ),
  },
}

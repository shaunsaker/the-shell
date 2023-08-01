import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'

import { BlankState } from './BlankState'

const meta = {
  title: 'BlankState',
  component: BlankState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BlankState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    Icon: QuestionMarkCircleIcon,
    title: 'No data',
    description: 'There is no data to display.',
    buttonText: 'Create new',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const submitButton = canvas.getByRole('button')

    await userEvent.click(submitButton)
  },
}

import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@tremor/react'

import { TextInput } from '../textInput/TextInput'
import { SettingsSection } from './SettingsSection'

const meta = {
  title: 'SettingsSection',
  component: SettingsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsSection>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Settings Section',
    description: 'This is a description',
    action: <Button>A primary action</Button>,
    children: <TextInput label="First name" placeholder="Enter your first name..." />,
  },
}

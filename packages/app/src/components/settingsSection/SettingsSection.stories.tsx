import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button/Button'
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
    children: (
      <>
        <TextInput label="Email" placeholder="Enter your email address..." />

        <div>
          <Button>Save</Button>
        </div>
      </>
    ),
  },
}

export const WithAction: Story = {
  args: {
    title: 'Settings Section',
    description: 'This is a description',
    action: <Button>A primary action</Button>,
  },
}

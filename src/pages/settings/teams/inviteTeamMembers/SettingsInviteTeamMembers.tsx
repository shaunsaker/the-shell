import { XCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import React, { ReactElement, useState } from 'react'
import { useParams } from 'react-router-dom'

import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { SettingsTeamsNavbar } from '../../../../components/settingsTeamsNavbar/SetttingsTeamsNavbar'
import { TextInput } from '../../../../components/textInput/TextInput'
import { useInviteTeamMembers } from '../../../../hooks/teams/useInviteTeamMember'
import { validateEmail } from '../../../../utils/validateEmail'

export const SettingsInviteTeamMembers = (): ReactElement => {
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const { teamId = '' } = useParams()
  const { mutate: inviteTeamMembers, isLoading } = useInviteTeamMembers()

  const submitDisabled = !validateEmail(email)
  const sendInvitesDisabled = emails.length === 0

  return (
    <SettingsList>
      <SettingsTeamsNavbar />

      <SettingsSection
        className="border-b-0"
        title="Invite team members"
        description="Add members to your team by entering their details email addresses."
        action={
          <Button
            disabled={sendInvitesDisabled}
            loading={isLoading}
            onClick={() => {
              inviteTeamMembers({ teamId, emails })
            }}
          >
            Send invites
          </Button>
        }
        fullWidth
      >
        <TextInput
          className="max-w-lg"
          placeholder="Enter an email address"
          value={email}
          onChange={event => {
            setEmail(event.target.value)
          }}
          onKeyDown={event => {
            // on Enter key add the email to the list of emails if it is not already present
            if (!submitDisabled && event.key === 'Enter' && !emails.includes(email)) {
              setEmails([...emails, email])

              // clear the email
              setEmail('')
            }
          }}
          // @ts-expect-error FIXME: @tremor types
          type="email"
        />

        <div className="flex flex-wrap gap-4">
          {emails.map(email => (
            <Button
              key={email}
              variant="light"
              icon={XCircleIcon}
              iconPosition="right"
              onClick={() => {
                // remove the email from the list of emails
                setEmails(emails.filter(e => e !== email))
              }}
            >
              {email}
            </Button>
          ))}
        </div>
      </SettingsSection>
    </SettingsList>
  )
}

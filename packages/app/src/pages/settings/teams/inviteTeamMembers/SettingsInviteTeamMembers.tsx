import { XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useRestrictedSubscriptionRoute } from '../../../../billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '../../../../billing/hooks/useRestrictedTeamPlanRoute'
import { Button } from '../../../../components/button/Button'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { SettingsTeamsBreadcrumbs } from '../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { Text } from '../../../../components/text/Text'
import { TextInput } from '../../../../components/textInput/TextInput'
import { routes } from '../../../../router/routes'
import { useInviteTeamMembers } from '../../../../teams/hooks/useInviteTeamMember'
import { useSubscriptionSeats } from '../../../../teams/hooks/useSubscriptionSeats'
import { validateEmail } from '../../../../utils/validateEmail'

export const SettingsInviteTeamMembers = (): ReactElement => {
  useRestrictedSubscriptionRoute()
  useRestrictedTeamPlanRoute()
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const { teamId = '' } = useParams()
  const { mutate: inviteTeamMembers, isLoading: inviteTeamMembersLoading } = useInviteTeamMembers()
  const { data: subscriptionSeats, isLoading: subscriptionSeatsLoading } = useSubscriptionSeats()
  const navigate = useNavigate()

  const availableSeats = (subscriptionSeats?.availableSeats || 0) - emails.length
  const hasAvailableSeats = availableSeats > 0
  const inputDisabled = !hasAvailableSeats || subscriptionSeatsLoading
  const submitDisabled = !validateEmail(email)
  const sendInvitesDisabled = emails.length === 0

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <SettingsSection
        className="border-b-0"
        title="Invite team members"
        description="Add members to your team by entering their details email addresses."
        action={
          <Button
            disabled={sendInvitesDisabled}
            loading={inviteTeamMembersLoading}
            onClick={() => {
              inviteTeamMembers({
                teamId,
                emails,
              })
            }}
          >
            Send invites
          </Button>
        }
        fullWidth
      >
        <div className="flex items-center gap-x-4">
          <Text>
            Available Seats: {availableSeats} / {subscriptionSeats.totalSeats}
          </Text>

          <Button
            variant="light"
            onClick={() => {
              navigate(routes.settingsSubscription)
            }}
          >
            Buy more
          </Button>
        </div>

        <TextInput
          className="max-w-lg"
          type="email"
          placeholder="Enter an email address"
          value={email}
          disabled={inputDisabled}
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
        />

        <div className="flex flex-wrap gap-4">
          {emails.map(email => (
            <Button
              key={email}
              variant="light"
              icon={<XCircleIcon />}
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

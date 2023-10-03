import { XCircleIcon } from '@heroicons/react/24/outline'
import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useIsSubscriptionOwner } from '../../../../billing/hooks/useIsSubscriptionOwner'
import { useRestrictedSubscriptionRoute } from '../../../../billing/hooks/useRestrictedSubscriptionRoute'
import { useRestrictedTeamPlanRoute } from '../../../../billing/hooks/useRestrictedTeamPlanRoute'
import { useSubscriptionInfo } from '../../../../billing/hooks/useSubscriptionInfo'
import { Button } from '../../../../components/button/Button'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { SettingsTeamsBreadcrumbs } from '../../../../components/settingsTeamsBreadcrumbs/SettingsTeamsBreadcrumbs'
import { Text } from '../../../../components/text/Text'
import { TextInput } from '../../../../components/textInput/TextInput'
import { routes } from '../../../../router/routes'
import { useInviteTeamMembers } from '../../../../teams/hooks/useInviteTeamMember'
import { useRestrictedTeamAdminRoute } from '../../../../teams/hooks/useRestrictedTeamAdminRoute'
import { useTeam } from '../../../../teams/hooks/useTeam'
import { validateEmail } from '../../../../utils/validateEmail'

export const SettingsInviteTeamMembers = (): ReactElement => {
  useRestrictedSubscriptionRoute()
  useRestrictedTeamPlanRoute()
  useRestrictedTeamAdminRoute()
  const [email, setEmail] = useState('')
  const [emails, setEmails] = useState<string[]>([])
  const { data: team, isLoading: teamLoading } = useTeam()
  const { data: subscriptionInfo, isLoading: subscriptionInfoLoading } = useSubscriptionInfo()
  const { data: isSubscriptionOwner, isLoading: isSubscriptionOwnerLoading } = useIsSubscriptionOwner()
  const { mutate: inviteTeamMembers, isLoading: inviteTeamMembersLoading } = useInviteTeamMembers()
  const navigate = useNavigate()

  const availableSeats = (subscriptionInfo?.availableSeats || 0) - emails.length
  const hasAvailableSeats = availableSeats > 0
  const isLoading = teamLoading || subscriptionInfoLoading || isSubscriptionOwnerLoading
  const inputDisabled = !hasAvailableSeats || isLoading
  const submitDisabled = isLoading || !validateEmail(email)
  const sendInvitesDisabled = isLoading || emails.length === 0

  return (
    <SettingsList>
      <SettingsTeamsBreadcrumbs />

      <SettingsSection
        className="border-b-0"
        title="Invite team members"
        description="Add members to your team by entering their email addresses."
        action={
          <Button
            disabled={sendInvitesDisabled}
            loading={inviteTeamMembersLoading}
            onClick={() => {
              if (team?.id) {
                inviteTeamMembers({
                  teamId: team.id,
                  emails,
                  signUpUrl: `${window.location.origin}${routes.signUp}`,
                })
              }
            }}
          >
            Send invites
          </Button>
        }
        fullWidth
      >
        <div className="flex items-center gap-x-4">
          <Text>
            Available Seats: {availableSeats} / {subscriptionInfo?.totalSeats}
          </Text>

          <Button
            variant="light"
            disabled={!isSubscriptionOwner}
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
          placeholder="Enter email address"
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
                setEmails(emails.filter(oldEmail => oldEmail !== email))
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

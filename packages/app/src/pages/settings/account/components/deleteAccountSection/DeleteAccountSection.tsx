import React, { ReactElement, useState } from 'react'

import { useAuthUser } from '../../../../../auth/hooks/useAuthUser'
import { useDeleteUserAccount } from '../../../../../auth/hooks/useDeleteUserAccount'
import { useSubscription } from '../../../../../billing/hooks/useSubscription'
import { Button } from '../../../../../components/button/Button'
import { Dialog } from '../../../../../components/dialog/Dialog'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { useTeams } from '../../../../../teams/hooks/useTeams'

export const DeleteAccountSection = (): ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate: deleteUserAccount, isLoading } = useDeleteUserAccount()
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription()
  const { data: teams, isLoading: teamsLoading } = useTeams()
  const { data: authUser, isLoading: authUserLoading } = useAuthUser()

  const hasActiveSubscription = subscription?.status === 'active'
  const isLastTeamAdminOfAnyTeams = teams.some(
    team => team.members.filter(member => member.userId === authUser?.uid).length === 1,
  )
  const isDisabled =
    subscriptionLoading || teamsLoading || authUserLoading || hasActiveSubscription || isLastTeamAdminOfAnyTeams

  return (
    <SettingsSection
      className="border-b-0"
      title="Delete account"
      description={
        isLastTeamAdminOfAnyTeams
          ? "You can't delete your account because you are the last admin of your team and there are other members on your team that would lose access. Please make someone else team admin or delete your team."
          : hasActiveSubscription
          ? 'You cannot delete your account while you have an active subscription. Please cancel your subscription first.'
          : 'No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently.'
      }
    >
      <div>
        <Button
          color="red"
          disabled={isDisabled}
          onClick={() => {
            setDialogOpen(true)
          }}
        >
          Yes, delete my account
        </Button>
      </div>

      <Dialog
        open={dialogOpen}
        title="Are you sure you want to delete your account?"
        description="This action is not reversible. All information related to this account will be deleted permanently."
        confirmIsDangerous
        confirmLoading={isLoading}
        onConfirmClick={async () => {
          await deleteUserAccount()

          setDialogOpen(false)
        }}
        onClose={() => {
          setDialogOpen(false)
        }}
      />
    </SettingsSection>
  )
}

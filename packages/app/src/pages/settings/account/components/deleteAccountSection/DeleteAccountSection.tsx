import React, { ReactElement, useState } from 'react'

import { useDeleteUserAccount } from '../../../../../auth/hooks/useDeleteUserAccount'
import { useHasActiveSubscription } from '../../../../../billing/hooks/useHasActiveSubscription'
import { Button } from '../../../../../components/button/Button'
import { Dialog } from '../../../../../components/dialog/Dialog'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'

export const DeleteAccountSection = (): ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { data: hasActiveSubscription, isLoading: hasActiveSubscriptionLoading } = useHasActiveSubscription()
  const { mutate: deleteUserAccount, isLoading: deleteUserAccountLoading } = useDeleteUserAccount()

  const isDisabled = hasActiveSubscriptionLoading || hasActiveSubscription

  return (
    <SettingsSection
      className="border-b-0"
      title="Delete account"
      description={
        hasActiveSubscription
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
        confirmLoading={deleteUserAccountLoading}
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

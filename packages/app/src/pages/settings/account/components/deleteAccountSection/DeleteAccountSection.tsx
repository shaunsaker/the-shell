import React, { ReactElement, useState } from 'react'

import { useDeleteUserAccount } from '../../../../../auth/hooks/useDeleteUserAccount'
import { useSubscription } from '../../../../../billing/hooks/useSubscription'
import { Button } from '../../../../../components/button/Button'
import { Dialog } from '../../../../../components/dialog/Dialog'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'
import { Text } from '../../../../../components/text/Text'

export const DeleteAccountSection = (): ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate: deleteUserAccount, isLoading } = useDeleteUserAccount()
  const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription()

  const hasActiveSubscription = subscription?.status === 'active'

  return (
    <SettingsSection
      className="border-b-0"
      title="Delete account"
      description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
    >
      <div>
        <Button
          color="red"
          disabled={isSubscriptionLoading || hasActiveSubscription}
          onClick={() => {
            setDialogOpen(true)
          }}
        >
          Yes, delete my account
        </Button>
      </div>

      {hasActiveSubscription && (
        <Text>
          You cannot delete your account while you have an active subscription. Please cancel your subscription first.
        </Text>
      )}

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

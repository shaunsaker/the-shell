import React, { ReactElement, useState } from 'react'

import { useDeleteUserAccount } from '../../../../../auth/hooks/useDeleteUserAccount'
import { Button } from '../../../../../components/button/Button'
import { Dialog } from '../../../../../components/dialog/Dialog'
import { SettingsSection } from '../../../../../components/settingsSection/SettingsSection'

export const DeleteAccountSection = (): ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate: deleteUserAccount, isLoading } = useDeleteUserAccount()

  return (
    <SettingsSection
      className="border-b-0"
      title="Delete account"
      description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
    >
      <div>
        <Button
          color="red"
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

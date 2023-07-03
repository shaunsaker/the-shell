import { Button } from '@tremor/react'
import React, { ReactElement, useCallback, useState } from 'react'

import { Dialog } from '../../../../components/dialog/Dialog'
import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { useDeleteUserAccount } from '../../../../hooks/auth/useDeleteUserAccount'

export const DeleteAccountSection = (): ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { mutate: deleteUserAccount, isLoading } = useDeleteUserAccount()

  const onDeleteAccount = useCallback(async () => {
    await deleteUserAccount

    setDialogOpen(false)
  }, [deleteUserAccount])

  return (
    <>
      <SettingsSection
        className="border-b-0"
        title="Delete account"
        description="No longer want to use our service? You can delete your account here. This action is not reversible. All information related to this account will be deleted permanently."
      >
        <div>
          <Button
            color="red"
            loading={isLoading}
            onClick={() => {
              setDialogOpen(true)
            }}
          >
            Yes, delete my account
          </Button>
        </div>
      </SettingsSection>

      <Dialog
        open={dialogOpen}
        title="Are you sure you want to delete your account?"
        description="This action is not reversible. All information related to this account will be deleted permanently."
        confirmIsDangerous
        onConfirmClick={onDeleteAccount}
        onClose={() => {
          setDialogOpen(false)
        }}
      />
    </>
  )
}

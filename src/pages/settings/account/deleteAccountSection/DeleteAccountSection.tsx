import { Button } from '@tremor/react'
import React, { ReactElement, useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Dialog } from '../../../../components/dialog/Dialog'
import { SettingsSection } from '../../../../components/settingsSection/SettingsSection'
import { supabase } from '../../../../services/supabase'

export const DeleteAccountSection = (): ReactElement => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDeleteAccount = useCallback(async () => {
    setLoading(true)

    const { error } = await supabase.rpc('delete_user')

    if (error) {
      toast.error(error.message)
    } else {
      await supabase.auth.signOut()

      toast.success('Your account has been deleted')
    }

    setLoading(false)
    setDialogOpen(false)
  }, [])

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
            loading={loading}
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

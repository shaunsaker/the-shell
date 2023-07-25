import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { ChangePasswordSection } from '../../../../components/changePasswordSection/ChangePasswordSection'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { routes } from '../../../../routes'

export default function SettingsAccountResetPassword() {
  const router = useRouter()

  return (
    <SettingsList>
      <Button
        variant="light"
        icon={ArrowLeftIcon}
        onClick={() => {
          router.replace(routes.settingsAccount)
        }}
      >
        Back to Account Settings
      </Button>

      <ChangePasswordSection />
    </SettingsList>
  )
}

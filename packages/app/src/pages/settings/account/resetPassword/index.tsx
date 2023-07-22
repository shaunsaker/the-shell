import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@tremor/react'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { ChangePasswordSection } from '../../../../components/changePasswordSection/ChangePasswordSection'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { routes } from '../../../../routes'

export const SettingsResetPassword = (): ReactElement => {
  const navigate = useNavigate()

  return (
    <SettingsList>
      <Button
        variant="light"
        icon={ArrowLeftIcon}
        onClick={() => {
          navigate(routes.settingsAccount)
        }}
      >
        Back to Account Settings
      </Button>

      <ChangePasswordSection />
    </SettingsList>
  )
}

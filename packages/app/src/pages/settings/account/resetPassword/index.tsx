import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import React, { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../../../components/button/Button'
import { ChangePasswordSection } from '../../../../components/changePasswordSection/ChangePasswordSection'
import { SettingsList } from '../../../../components/settingsList/SettingsList'
import { routes } from '../../../../routes'

export const SettingsResetPassword = (): ReactElement => {
  const navigate = useNavigate()

  return (
    <SettingsList>
      <Button
        variant="light"
        icon={<ArrowLeftIcon />}
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

import React, { ReactElement, ReactNode } from 'react'

type SettingsListProps = { children: ReactNode }

export const SettingsList = ({ children }: SettingsListProps): ReactElement => {
  return <main className="flex flex-col items-start gap-y-8">{children}</main>
}

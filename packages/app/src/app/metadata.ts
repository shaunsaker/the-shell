import { app } from 'common'
import { Metadata } from 'next'

export const metadata: Metadata = {
  applicationName: app.displayName,
  title: app.displayName,
  description: app.description,
  themeColor: app.baseColor,
}

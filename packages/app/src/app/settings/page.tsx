import { redirect } from 'next/navigation'

import { routes } from '../../routes'

export default function Settings() {
  redirect(routes.settingsAccount)
}

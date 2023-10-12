import { Button, Headerbar, Logo } from 'components'
import React, { ReactElement } from 'react'

// TODO: SS handle navigation
export const Header = (): ReactElement => {
  return (
    <Headerbar>
      <button className="mr-4 flex items-center">
        <Logo />
      </button>

      <Button variant="lightNeutral">Features</Button>

      <Button variant="lightNeutral">Testimonials</Button>

      <Button variant="lightNeutral">Pricing</Button>

      <div className="flex flex-1 items-center justify-end gap-x-2">
        <Button variant="lightNeutral">Sign in</Button>

        <Button>Get started today</Button>
      </div>
    </Headerbar>
  )
}

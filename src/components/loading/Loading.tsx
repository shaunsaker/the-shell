import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'

import { FullPage } from '../fullPage/FullPage'
import { Logo } from '../logo/Logo'

export const Loading = (): ReactElement => {
  return (
    <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <FullPage>
        <Logo />
      </FullPage>
    </motion.div>
  )
}

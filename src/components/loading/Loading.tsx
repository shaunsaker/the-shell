import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'

import { FullPage } from '../fullPage/FullPage'
import { Logo } from '../logo/Logo'

export const Loading = (): ReactElement => {
  return (
    <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <FullPage>
        <motion.div
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ rotate: 360, scale: 2, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1,
            repeatDelay: 0.1,
            ease: 'backInOut',
          }}
        >
          <Logo />
        </motion.div>
      </FullPage>
    </motion.div>
  )
}

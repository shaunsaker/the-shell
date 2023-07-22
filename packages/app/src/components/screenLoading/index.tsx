import { motion } from 'framer-motion'
import React, { ReactElement } from 'react'

import { Loading } from '../loading/Loading'

export const ScreenLoading = (): ReactElement => {
  return (
    <motion.div className="h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Loading />
    </motion.div>
  )
}

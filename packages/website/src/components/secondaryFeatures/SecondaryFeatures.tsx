'use client'

import { app } from 'config'
import React from 'react'

import screenshotExpenses from '@/assets/screenshots/expenses.png'
import screenshotPayroll from '@/assets/screenshots/payroll.png'
import screenshotReporting from '@/assets/screenshots/reporting.png'
import screenshotVatReturns from '@/assets/screenshots/vat-returns.png'

import { Features } from '../features/Features'

const getFeatureScreenshot = (feature: string) => {
  switch (feature) {
    case 'Feature 1':
      return screenshotPayroll
    case 'Feature 2':
      return screenshotExpenses
    case 'Feature 3':
      return screenshotVatReturns
    case 'Feature 4':
      return screenshotReporting
    default:
      return screenshotExpenses
  }
}

export const SecondaryFeatures = () => {
  return (
    <Features
      variant="inverted"
      title={app.website.secondaryFeatures.title}
      subtitle={app.website.secondaryFeatures.subtitle}
      features={app.website.secondaryFeatures.features.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: getFeatureScreenshot(feature.title),
      }))}
    />
  )
}

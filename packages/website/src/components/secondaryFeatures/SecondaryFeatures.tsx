'use client'

import { app } from 'config'
import React from 'react'

import { Features } from '../features/Features'

export const SecondaryFeatures = () => {
  return (
    <Features
      variant="inverted"
      title={app.website.secondaryFeatures.title}
      subtitle={app.website.secondaryFeatures.subtitle}
      features={app.website.secondaryFeatures.features.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: feature.image,
      }))}
    />
  )
}

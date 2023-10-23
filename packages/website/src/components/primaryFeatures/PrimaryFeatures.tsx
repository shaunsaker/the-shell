'use client'

import { app } from 'config'
import React from 'react'

import { routes } from '@/routes'

import { Features } from '../features/Features'

export const PrimaryFeatures = () => {
  return (
    <Features
      id={routes.features.replace('/#', '')}
      title={app.website.primaryFeatures.title}
      subtitle={app.website.primaryFeatures.subtitle}
      features={app.website.primaryFeatures.features.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: feature.image,
      }))}
    />
  )
}

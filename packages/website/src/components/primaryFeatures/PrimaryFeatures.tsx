'use client'

import React from 'react'

import { getRoutePartialId, routes } from '@/routes'

import { Feature, Features } from '../features/Features'

const FEATURES: Feature[] = [
  {
    title: 'Feature 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 3',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 4',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
]

export const PrimaryFeatures = () => {
  return (
    <Features
      id={getRoutePartialId(routes.features)}
      title="Primary Features"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      features={FEATURES.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: feature.image,
      }))}
    />
  )
}

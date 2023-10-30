'use client'

import React from 'react'

import { Feature, Features } from '../features/Features'

const FEATURES: Feature[] = [
  {
    title: 'Feature 5',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 7',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 8',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/screenshots/contacts.png',
  },
]

export const SecondaryFeatures = () => {
  return (
    <Features
      variant="inverted"
      title="Secondary Features"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      features={FEATURES.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: feature.image,
      }))}
    />
  )
}

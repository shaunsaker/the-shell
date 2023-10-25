'use client'

import React from 'react'

import { Feature, Features } from '../features/Features'

const FEATURES: Feature[] = [
  {
    title: 'Feature 5',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 6',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 7',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 8',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
]

export const SecondaryFeatures = () => {
  return (
    <Features
      variant="inverted"
      title="Secondary Features"
      subtitle="Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript."
      features={FEATURES.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: feature.image,
      }))}
    />
  )
}

'use client'

import React from 'react'

import { getRoutePartialId, routes } from '@/routes'

import { Feature, Features } from '../features/Features'

const FEATURES: Feature[] = [
  {
    title: 'Feature 1',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 2',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 3',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
  {
    title: 'Feature 4',
    description:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: '/screenshots/contacts.png',
  },
]

export const PrimaryFeatures = () => {
  return (
    <Features
      id={getRoutePartialId(routes.features)}
      title="Primary Features"
      subtitle="Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript."
      features={FEATURES.map(feature => ({
        title: feature.title,
        description: feature.description,
        image: feature.image,
      }))}
    />
  )
}

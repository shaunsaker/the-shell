'use client'

import {
  Background,
  Button,
  Heading,
  ParagraphText,
  Text,
  Title,
} from 'components'
import { app } from 'config'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/container/Container'
import screenshotExpenses from '@/images/screenshots/expenses.png'
import screenshotPayroll from '@/images/screenshots/payroll.png'
import screenshotReporting from '@/images/screenshots/reporting.png'
import screenshotVatReturns from '@/images/screenshots/vat-returns.png'
import { routes } from '@/routes'

import { Section } from '../section/Section'

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

export const PrimaryFeatures = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <Section
      id={routes.features.replace('/#', '')}
      aria-label={app.website.primaryFeatures.title}
      className="relative overflow-hidden lg:pr-0"
    >
      <Background className="absolute inset-0" />

      <div className="relative">
        <Container className="mb-16">
          <Title className="text-white">
            {app.website.primaryFeatures.title}
          </Title>

          <ParagraphText className="text-white">
            {app.website.primaryFeatures.subtitle}
          </ParagraphText>
        </Container>

        {/* MOBILE */}
        <div className="flex flex-col rounded-lg bg-white/10 ring-1 ring-inset ring-white/10 lg:hidden">
          <div className="p-6">
            <div className="flex items-center gap-x-4 overflow-x-auto">
              {app.website.primaryFeatures.features.map((feature, index) => (
                <Button
                  className="rounded-full"
                  variant={
                    activeTabIndex === index
                      ? 'secondaryInverted'
                      : 'lightInverted'
                  }
                  size="lg"
                  onClick={() => {
                    setActiveTabIndex(index)
                  }}
                >
                  {feature.title}
                </Button>
              ))}
            </div>

            <ParagraphText className="mt-8 text-center text-white">
              {app.website.primaryFeatures.features[activeTabIndex].description}
            </ParagraphText>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl">
            <Image
              src={getFeatureScreenshot(
                app.website.primaryFeatures.features[activeTabIndex].title,
              )}
              alt={app.website.primaryFeatures.features[activeTabIndex].title}
              priority
            />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden grid-cols-12 lg:grid">
          <ul className="col-span-5 py-24">
            {app.website.primaryFeatures.features.map((feature, index) => (
              <li key={feature.title}>
                <Button
                  className={twMerge(
                    'flex-col items-start whitespace-normal rounded-r-none border-none bg-transparent p-6 text-left shadow-none hover:bg-white/10',
                    activeTabIndex === index
                      ? 'bg-white/10 ring-1 ring-inset ring-white/10'
                      : '',
                  )}
                  onClick={() => {
                    setActiveTabIndex(index)
                  }}
                >
                  <Heading className="text-white">{feature.title}</Heading>

                  <Text className="mt-2 text-white">{feature.description}</Text>
                </Button>
              </li>
            ))}
          </ul>

          <div className="col-span-7 overflow-hidden rounded-l-xl bg-theme-background-muted shadow-xl dark:bg-dark-theme-background-muted">
            <Image
              src={getFeatureScreenshot(
                app.website.primaryFeatures.features[activeTabIndex].title,
              )}
              alt={app.website.primaryFeatures.features[activeTabIndex].title}
              priority
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

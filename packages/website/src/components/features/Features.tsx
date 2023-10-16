'use client'

import { Background, Button, Heading, ParagraphText, Text, Title } from 'components'
import Image from 'next/image'
import { ComponentPropsWithoutRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/container/Container'

import { Section } from '../section/Section'

type Feature = {
  title: string
  description: string
  image: string
}

type Props = {
  variant?: 'default' | 'inverted'
  title: string
  subtitle: string
  features: Feature[]
} & ComponentPropsWithoutRef<'section'>

export const Features = ({ className, variant = 'default', title, subtitle, features, ...props }: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const activeFeature = features[activeTabIndex]
  const imageComponent = (
    <Image
      className="h-full w-full object-cover object-left-top"
      src={activeFeature.image}
      alt={activeFeature.image}
      priority
    />
  )

  return (
    <Section aria-label={title} className={twMerge('relative lg:pr-0', className)} {...props}>
      <Background className="absolute inset-0" variant={variant} />

      <div className="relative">
        <Container className="mb-16">
          <Title className={variant === 'default' ? 'text-white dark:text-white' : ''}>{title}</Title>

          <ParagraphText className={variant === 'default' ? 'text-white dark:text-white' : ''}>
            {subtitle}
          </ParagraphText>
        </Container>

        {/* MOBILE */}
        <div className="flex flex-col rounded-lg bg-white/10 ring-1 ring-inset ring-white/10 lg:hidden">
          <div className="p-6">
            <ul className="flex items-center gap-x-4 overflow-x-auto">
              {features.map((feature, index) => (
                <li key={feature.title}>
                  <Button
                    className="rounded-full"
                    variant={activeTabIndex === index ? 'secondaryInverted' : 'lightInverted'}
                    size="lg"
                    onClick={() => {
                      setActiveTabIndex(index)
                    }}
                  >
                    {feature.title}
                  </Button>
                </li>
              ))}
            </ul>

            <ParagraphText className="mt-8 text-center text-white dark:text-white">
              {activeFeature.description}
            </ParagraphText>
          </div>

          <div className="mt-4 overflow-hidden rounded-xl">{imageComponent}</div>
        </div>

        {/* DESKTOP */}
        <div className="hidden grid-cols-12 lg:grid">
          <ul className="col-span-5 py-24">
            {features.map((feature, index) => (
              <li key={feature.title}>
                <Button
                  variant="light"
                  className={twMerge(
                    'flex-col items-start whitespace-normal rounded-r-none bg-transparent p-6 text-left',
                    variant === 'default'
                      ? 'hover:bg-white/10 dark:hover:bg-white/10'
                      : 'hover:bg-theme-brand/10 dark:hover:bg-dark-theme-brand/10',
                    activeTabIndex === index
                      ? variant === 'default'
                        ? 'bg-white/10 ring-1 ring-inset ring-white/10 dark:bg-white/10 dark:ring-white/10'
                        : 'bg-theme-brand/10 ring-1 ring-inset ring-theme-brand/10 dark:bg-dark-theme-brand/10 dark:ring-dark-theme-brand/10'
                      : '',
                  )}
                  onClick={() => {
                    setActiveTabIndex(index)
                  }}
                >
                  <Heading className={variant === 'default' ? 'text-white dark:text-white' : ''}>
                    {feature.title}
                  </Heading>

                  <Text className={twMerge(variant === 'default' ? 'text-white dark:text-white' : '', 'mt-2')}>
                    {feature.description}
                  </Text>
                </Button>
              </li>
            ))}
          </ul>

          <div className="col-span-7 overflow-hidden rounded-l-xl shadow-xl">{imageComponent}</div>
        </div>
      </div>
    </Section>
  )
}

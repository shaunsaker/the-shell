'use client'

import { Background, Button, HeadingText, ParagraphText, SmallText, TitleText } from 'components'
import Image from 'next/image'
import React, { ComponentPropsWithoutRef, useState } from 'react'
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
      alt={activeFeature.title}
      priority
      width={802}
      height={696}
    />
  )

  return (
    <Section aria-label={title} className={twMerge('relative lg:pr-0', className)} {...props}>
      <Background className="absolute inset-0" variant={variant} />

      <div className="relative">
        <Container className="mb-16">
          <TitleText className={variant === 'default' ? 'text-white dark:text-white' : ''}>{title}</TitleText>

          <ParagraphText className={variant === 'default' ? 'text-white dark:text-white' : ''}>
            {subtitle}
          </ParagraphText>
        </Container>

        {/* MOBILE */}
        <div className="flex flex-col rounded-lg bg-white/10 ring-1 ring-inset ring-white/10 lg:hidden">
          <ul className="flex items-center gap-x-4 overflow-x-auto p-6">
            {features.map((feature, index) => (
              <li key={feature.title}>
                <Button
                  className="rounded-full"
                  variant={
                    variant === 'default'
                      ? activeTabIndex === index
                        ? 'secondaryInverted'
                        : 'lightInverted'
                      : activeTabIndex === index
                      ? 'secondary'
                      : 'light'
                  }
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

          <ParagraphText
            className={twMerge('px-6 py-4 text-center', variant === 'default' ? 'text-white dark:text-white' : '')}
          >
            {activeFeature.description}
          </ParagraphText>

          <div className="mt-4 overflow-hidden rounded-xl shadow-xl">{imageComponent}</div>
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
                  <HeadingText className={twMerge(variant === 'default' ? 'text-white dark:text-white' : '', 'mb-2')}>
                    {feature.title}
                  </HeadingText>

                  <SmallText className={twMerge(variant === 'default' ? 'text-white dark:text-white' : '')}>
                    {feature.description}
                  </SmallText>
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

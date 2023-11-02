'use client'

import { Background, Button, HeadingText, ParagraphText, TitleText } from 'components'
import Image from 'next/image'
import React, { ComponentPropsWithoutRef, ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { Container } from '@/components/container/Container'

import { Section } from '../section/Section'

export type Feature = {
  title: string
  description: string
  image: string
}

type Props = {
  variant?: 'default' | 'inverted'
  title: ReactNode
  subtitle: ReactNode
  features: Feature[]
  asScreenshots?: boolean
} & Omit<ComponentPropsWithoutRef<'section'>, 'title'>

export const Features = ({
  className,
  variant = 'default',
  title,
  subtitle,
  features,
  asScreenshots = true,
  ...props
}: Props) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  const activeFeature = features[activeTabIndex]

  return (
    <Section className={twMerge('relative lg:pr-0', className)} {...props}>
      <Background className="absolute inset-0" variant={variant} />

      <div className="relative">
        <Container className="mb-16">
          <TitleText className={variant === 'default' ? 'text-white dark:text-white' : ''}>{title}</TitleText>

          <ParagraphText className={variant === 'default' ? 'text-white dark:text-white' : ''}>
            {subtitle}
          </ParagraphText>
        </Container>

        {/* MOBILE */}
        <ul
          className={twMerge(
            'flex flex-col rounded-lg bg-white/10 ring-1 ring-inset ring-white/10 lg:hidden pb-6',
            asScreenshots ? 'gap-y-12' : '',
          )}
        >
          {features.map(feature => (
            <li key={feature.title} className="flex flex-col items-center">
              <div className={twMerge('', asScreenshots ? 'rounded-md shadow-xl overflow-hidden mb-12' : '')}>
                <Image
                  className={twMerge('w-full', asScreenshots ? '' : 'max-w-xs')}
                  src={feature.image}
                  alt={feature.title}
                  priority
                  width={320}
                  height={320}
                />
              </div>

              <Container className="px-4 pb-0 flex flex-col items-center gap-y-4">
                <HeadingText className={variant === 'default' ? 'text-white dark:text-white' : ''}>
                  {feature.title}
                </HeadingText>

                <ParagraphText
                  className={twMerge('text-center', variant === 'default' ? 'text-white dark:text-white' : '')}
                >
                  {feature.description}
                </ParagraphText>
              </Container>
            </li>
          ))}
        </ul>

        {/* DESKTOP */}
        <div className="hidden grid-cols-12 lg:grid">
          <ul className="col-span-5 py-24 flex flex-col justify-center">
            {features.map((feature, index) => (
              <li key={feature.title}>
                <Button
                  variant="light"
                  className={twMerge(
                    'flex-col items-start whitespace-normal bg-transparent p-6 text-left w-full',
                    variant === 'default'
                      ? 'hover:bg-white/10 dark:hover:bg-white/10'
                      : 'hover:bg-theme-brand/10 dark:hover:bg-dark-theme-brand/10',
                    activeTabIndex === index
                      ? variant === 'default'
                        ? 'bg-white/10 ring-1 ring-inset ring-white/10 dark:bg-white/10 dark:ring-white/10'
                        : 'bg-theme-brand/10 ring-1 ring-inset ring-theme-brand/10 dark:bg-dark-theme-brand/10 dark:ring-dark-theme-brand/10'
                      : '',
                    asScreenshots ? 'rounded-r-none' : '',
                  )}
                  onClick={() => {
                    setActiveTabIndex(index)
                  }}
                >
                  <HeadingText className={twMerge(variant === 'default' ? 'text-white dark:text-white' : '', 'mb-2')}>
                    {feature.title}
                  </HeadingText>

                  <ParagraphText className={twMerge(variant === 'default' ? 'text-white dark:text-white' : '')}>
                    {feature.description}
                  </ParagraphText>
                </Button>
              </li>
            ))}
          </ul>

          <div
            className={twMerge(
              'col-span-7 overflow-hidden',
              asScreenshots
                ? 'rounded-l-xl shadow-xl border-2 border-r-0 border-theme-brand-subtle dark-border-dark-theme-brand-subtle'
                : '',
            )}
          >
            <Image
              className={twMerge(asScreenshots ? 'h-full w-full object-cover object-left-top' : '')}
              src={activeFeature.image}
              alt={activeFeature.title}
              priority
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

import { SmallText } from 'components'
import Image, { ImageProps } from 'next/image'
import React from 'react'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'

import { PrimaryActionButton } from '../primaryActionButton/PrimaryActionButton'
import { Section, SectionProps } from '../section/Section'

type Props = {
  image?: ImageProps
  cta?: string
  footer?: string
} & SectionProps

export const Hero = ({ className = '', image, cta, footer, ...sectionProps }: Props) => {
  return (
    <Section
      className={className}
      prefix={
        image && (
          <Image
            className="bg-theme-background-subtle dark:bg-dark-theme-background-subtle rounded-lg shadow-lg"
            priority
            {...image}
          />
        )
      }
      {...sectionProps}
    >
      <div className="mt-12 flex justify-center">
        <div className="flex flex-col items-center gap-y-4">
          {cta && (
            <PrimaryActionButton size="lg" name={AnalyticsPrimaryButtonName.Hero}>
              {cta}
            </PrimaryActionButton>
          )}

          {footer && <SmallText>{footer}</SmallText>}
        </div>
      </div>
    </Section>
  )
}

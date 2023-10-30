'use client'

import { Background, Button, ParagraphText, TitleText } from 'components'
import React from 'react'
import { useLink } from 'utils'

import { PRIMARY_ACTION_LINK, PRIMARY_ACTION_TEXT } from '@/constants'

import { Container } from '../container/Container'
import { Section } from '../section/Section'

export const CallToAction = () => {
  const link = useLink()

  return (
    <Section className="relative">
      <Background className="absolute inset-0" />

      <Container>
        <TitleText className="text-white dark:text-white">Get started today</TitleText>

        <ParagraphText className="text-white dark:text-white">
          The ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and
          TypeScript.
        </ParagraphText>

        <Button
          variant="secondaryInverted"
          size="lg"
          onClick={() => {
            link(PRIMARY_ACTION_LINK, '_blank')
          }}
        >
          {PRIMARY_ACTION_TEXT}
        </Button>
      </Container>
    </Section>
  )
}

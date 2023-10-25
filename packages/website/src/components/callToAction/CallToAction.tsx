'use client'

import { Background, Button, ParagraphText, TitleText } from 'components'
import { useRouter } from 'next/navigation'
import React from 'react'

import { BOOK_DEMO_LINK } from '@/constants'

import { Container } from '../container/Container'
import { Section } from '../section/Section'

export function CallToAction() {
  const router = useRouter()

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
            router.push(BOOK_DEMO_LINK)
          }}
        >
          Book a demo
        </Button>
      </Container>
    </Section>
  )
}

'use client'

import { Background, Button, HugeText, ParagraphText } from 'components'
import { app } from 'config'
import Image from 'next/image'
import React from 'react'
import { useLink } from 'utils'

import { PRIMARY_ACTION_LINK, PRIMARY_ACTION_TEXT } from '@/constants'

import { Container } from '../container/Container'
import { HighlightedText } from '../highlightedText/HighlightedText'
import { Section } from '../section/Section'

const TITLE = '0. to 0.5 in no time.'
const TITLE_HIGHLIGHTED = 'no time.'

export const Hero = () => {
  const link = useLink()

  return (
    <Section aria-label={TITLE} className="relative flex h-screen flex-col pt-[63px]">
      <Background variant="inverted" className="absolute inset-0" />

      <Container className="flex-1 justify-center">
        <Image src="/rocket-shuttle.png" alt="rocket shuttle" priority width={240} height={240} />

        <HugeText>
          {TITLE.replace(TITLE_HIGHLIGHTED, '')}

          {TITLE_HIGHLIGHTED && <HighlightedText>{TITLE_HIGHLIGHTED}</HighlightedText>}
        </HugeText>

        <ParagraphText>{app.description}</ParagraphText>

        <Button
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

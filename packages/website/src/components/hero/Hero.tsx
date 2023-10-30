'use client'

import { Background, Button, HeadingText, HugeText, ParagraphText } from 'components'
import { app } from 'config'
import React from 'react'
import { useLink } from 'utils'

import Logoipsum1Logo from '@/assets/logos/logoipsum-1.svg'
import Logoipsum2Logo from '@/assets/logos/logoipsum-2.svg'
import Logoipsum3Logo from '@/assets/logos/logoipsum-3.svg'
import Logoipsum4Logo from '@/assets/logos/logoipsum-4.svg'
import Logoipsum5Logo from '@/assets/logos/logoipsum-5.svg'
import { PRIMARY_ACTION_LINK, PRIMARY_ACTION_TEXT } from '@/constants'

import { Container } from '../container/Container'
import { HighlightedText } from '../highlightedText/HighlightedText'
import { Section } from '../section/Section'

const TITLE = '0. to 0.5 in no time.'
const TITLE_HIGHLIGHTED = 'no time.'

const SOCIAL_PROOF_LINKS = [
  {
    label: 'Logoipsum 1',
    link: '',
    image: <Logoipsum1Logo />,
  },
  {
    label: 'Logoipsum 2',
    link: '',
    image: <Logoipsum2Logo />,
  },
  {
    label: 'Logoipsum 3',
    link: '',
    image: <Logoipsum3Logo />,
  },
  {
    label: 'Logoipsum 4',
    link: '',
    image: <Logoipsum4Logo />,
  },
  {
    label: 'Logoipsum 5',
    link: '',
    image: <Logoipsum5Logo />,
  },
]

export const Hero = () => {
  const link = useLink()

  return (
    <Section aria-label={TITLE} className="relative flex min-h-screen flex-col pb-[95px] mt-[63px]">
      <Background variant="inverted" className="absolute inset-0" />

      <Container className="flex-1 justify-center">
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

      {SOCIAL_PROOF_LINKS.length && (
        <div className="relative mt-16 flex flex-col items-center">
          <HeadingText>Trusted by the best</HeadingText>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:gap-6">
            {SOCIAL_PROOF_LINKS.map(company => (
              <li key={company.label}>
                <Button
                  aria-label={company.label}
                  variant="lightNeutral"
                  onClick={() => {
                    link(company.link, '_blank')
                  }}
                >
                  {company.image}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}

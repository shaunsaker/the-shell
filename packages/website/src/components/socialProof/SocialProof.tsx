import { AnchorText } from 'components'
import React, { ReactNode } from 'react'

import { constants } from '@/constants'

import { Section } from '../section/Section'

const SOCIAL_PROOF_LINKS: Array<{
  label: string
  link: string
  image: ReactNode
}> = []

export const SocialProof = () => {
  return (
    <Section
      title={constants.socialProof.title}
      highlighted={constants.socialProof.highlighted}
      subtitle={constants.socialProof.subtitle}
    >
      <ul className="flex flex-wrap items-center justify-center gap-6 lg:gap-12">
        {SOCIAL_PROOF_LINKS.map(company => (
          <li key={company.label}>
            <AnchorText
              className="text-theme-content-inverted dark:text-dark-theme-content hover:text-white/67"
              aria-label={company.label}
              href={company.link}
              target="_blank"
            >
              {company.image}
            </AnchorText>
          </li>
        ))}
      </ul>
    </Section>
  )
}

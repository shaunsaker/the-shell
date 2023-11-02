import { AnchorText, HeadingText } from 'components'
import React from 'react'

import CypressLogo from '@/assets/logos/cypress.svg'
import FigmaLogo from '@/assets/logos/figma.svg'
import FirebaseLogo from '@/assets/logos/firebase.svg'
import GithubLogo from '@/assets/logos/github.svg'
import MixpanelLogo from '@/assets/logos/mixpanel.svg'
import SentryLogo from '@/assets/logos/sentry.svg'
import StripeLogo from '@/assets/logos/stripe.svg'

import { Section } from '../section/Section'

const TITLE = 'Our trusted partners'

const SOCIAL_PROOF_LINKS = [
  {
    label: 'Github',
    link: 'https://github.com/',
    image: <GithubLogo className="h-8" />,
  },
  {
    label: 'Firebase',
    link: 'https://firebase.google.com/',
    image: <FirebaseLogo className="h-10" />,
  },
  {
    label: 'Stripe',
    link: 'https://stripe.com/',
    image: <StripeLogo className="h-8" />,
  },
  {
    label: 'Mixpanel',
    link: 'https://mixpanel.com/',
    image: <MixpanelLogo className="h-12" />,
  },
  {
    label: 'Sentry',
    link: 'https://sentry.io/',
    image: <SentryLogo className="h-7" />,
  },
  {
    label: 'Figma',
    link: 'https://www.figma.com/',
    image: <FigmaLogo className="h-7" />,
  },
  {
    label: 'Cypress',
    link: 'https://www.cypress.io/',
    image: <CypressLogo className="h-10" />,
  },
]

export const SocialProof = () => {
  return (
    <Section aria-label={TITLE} className="flex flex-col items-center">
      <HeadingText>{TITLE}</HeadingText>

      <ul className="mt-4 flex flex-wrap items-center justify-center gap-8">
        {SOCIAL_PROOF_LINKS.map(company => (
          <li key={company.label}>
            <AnchorText className="text-inherit" aria-label={company.label} href={company.link} target="_blank50">
              {company.image}
            </AnchorText>
          </li>
        ))}
      </ul>
    </Section>
  )
}

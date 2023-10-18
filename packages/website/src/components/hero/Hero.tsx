'use client'

import { Background, Button, Heading, HugeText, ParagraphText } from 'components'
import { app } from 'config/src'
import { useRouter } from 'next/navigation'

import Logoipsum1Logo from '@/assets/logos/logoipsum-1.svg'
import Logoipsum2Logo from '@/assets/logos/logoipsum-2.svg'
import Logoipsum3Logo from '@/assets/logos/logoipsum-3.svg'
import Logoipsum4Logo from '@/assets/logos/logoipsum-4.svg'
import Logoipsum5Logo from '@/assets/logos/logoipsum-5.svg'

import { Container } from '../container/Container'
import { HighlightedText } from '../highlightedText/HighlightedText'
import { Section } from '../section/Section'

const getCompanyLogo = (company: string) => {
  switch (company) {
    case 'Logoipsum 1':
      return <Logoipsum1Logo />
    case 'Logoipsum 2':
      return <Logoipsum2Logo />
    case 'Logoipsum 3':
      return <Logoipsum3Logo />
    case 'Logoipsum 4':
      return <Logoipsum4Logo />
    case 'Logoipsum 5':
      return <Logoipsum5Logo />
    default:
      // TODO: SS maybe add a bg here
      return <div />
  }
}

export const Hero = () => {
  const router = useRouter()

  return (
    <Section className="relative flex min-h-full flex-col pb-8 lg:pb-8">
      <Background variant="inverted" className="absolute inset-0" />

      <Container className="flex-1 justify-center">
        <HugeText>
          {app.website.hero.title.replace(app.website.hero.titleHighlighted, '')}

          {app.website.hero.titleHighlighted && <HighlightedText>{app.website.hero.titleHighlighted}</HighlightedText>}
        </HugeText>

        <ParagraphText className="text-center">{app.website.hero.subtitle}</ParagraphText>

        <Button
          size="lg"
          onClick={() => {
            router.push(app.website.primaryAction.link)
          }}
        >
          {app.website.primaryAction.label}
        </Button>
      </Container>

      {app.website.hero.trustedByCompanies.length && (
        <div className="relative mt-8 flex flex-col items-center">
          <Heading>Trusted by the best</Heading>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 lg:gap-6">
            {app.website.hero.trustedByCompanies.map(company => (
              <li key={company.label}>
                <Button
                  variant="lightNeutral"
                  onClick={() => {
                    window.open(company.link, '_blank')
                  }}
                >
                  {getCompanyLogo(company.label)}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  )
}

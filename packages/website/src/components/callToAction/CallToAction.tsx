'use client'

import { Background, Button, ParagraphText, Title } from 'components'
import { app } from 'config'
import { useRouter } from 'next/navigation'

import { Container } from '../container/Container'
import { Section } from '../section/Section'

export function CallToAction() {
  const router = useRouter()

  return (
    <Section className="relative">
      <Background className="absolute inset-0" />

      <Container>
        <Title className="text-white dark:text-white">{app.website.cta.title}</Title>

        <ParagraphText className="text-white dark:text-white">{app.website.cta.subtitle}</ParagraphText>

        <Button
          variant="secondaryInverted"
          size="lg"
          onClick={() => {
            router.push(app.website.primaryAction.link)
          }}
        >
          {app.website.primaryAction.label}
        </Button>
      </Container>
    </Section>
  )
}

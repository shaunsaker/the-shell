import { Background, Heading, ParagraphText, Text, Title } from 'components'
import { app } from 'config'

import { routes } from '@/routes'

import { Columns } from '../columns/Columns'
import { Container } from '../container/Container'
import { Section } from '../section/Section'

export function Faqs() {
  return (
    <Section id={routes.faq.replace('/#', '')} aria-label={app.website.faqs.title} className="relative overflow-hidden">
      <Background className="absolute inset-0" variant="inverted" />

      <div className="relative">
        <Container>
          <Title>{app.website.faqs.title}</Title>

          <ParagraphText className="mt-4">{app.website.faqs.subtitle}</ParagraphText>
        </Container>

        <Columns className="mt-16">
          {app.website.faqs.questions.map(faq => (
            <li key={faq.question} className="mb-8">
              <Heading>{faq.question}</Heading>

              <Text className="mt-4">{faq.answer}</Text>
            </li>
          ))}
        </Columns>
      </div>
    </Section>
  )
}

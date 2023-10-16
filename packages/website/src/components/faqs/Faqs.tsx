import { Background, Heading, ParagraphText, Text, Title } from 'components'
import { app } from 'config'

import { routes } from '@/routes'

import { Columns } from '../columns/Columns'
import { Section } from '../section/Section'

export function Faqs() {
  return (
    <Section
      id={routes.faq.replace('/#', '')}
      aria-label={app.website.primaryFeatures.title}
      className="relative overflow-hidden"
    >
      <Background className="absolute inset-0" variant="inverted" />

      <div className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <Title>Frequently asked questions</Title>

          <ParagraphText className="mt-4">
            If you can’t find what you’re looking for, email our support team and if you’re lucky someone will get back
            to you.
          </ParagraphText>
        </div>

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

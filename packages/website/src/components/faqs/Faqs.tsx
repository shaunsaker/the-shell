import { Background, HeadingText, ParagraphText, SmallText, TitleText } from 'components'
import { app } from 'config'
import React from 'react'

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
          <TitleText>{app.website.faqs.title}</TitleText>

          <ParagraphText className="mt-4">{app.website.faqs.subtitle}</ParagraphText>
        </Container>

        <Columns className="mt-16">
          {app.website.faqs.questions.map(faq => (
            <li key={faq.question} className="mb-8">
              <HeadingText>{faq.question}</HeadingText>

              <SmallText className="mt-4">{faq.answer}</SmallText>
            </li>
          ))}
        </Columns>
      </div>
    </Section>
  )
}

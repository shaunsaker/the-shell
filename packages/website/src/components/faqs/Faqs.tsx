import { Background, Card, Columns, HeadingText, ParagraphText, SmallText, TitleText } from 'components'
import React from 'react'

import { getRoutePartialId, routes } from '@/routes'

import { Container } from '../container/Container'
import { Section } from '../section/Section'

const TITLE = 'Frequently asked questions'

const QUESTIONS = [
  {
    question: 'Question 1',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Question 2',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Question 3',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Question 4',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Question 5',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    question: 'Question 6',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]

export const Faqs = () => {
  return (
    <Section id={getRoutePartialId(routes.faq)} aria-label={TITLE} className="relative overflow-hidden">
      <Background className="absolute inset-0" variant="inverted" />

      <div className="relative">
        <Container>
          <TitleText>{TITLE}</TitleText>

          <ParagraphText className="mt-4">
            The ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and
            TypeScript.
          </ParagraphText>
        </Container>

        <Columns className="mt-16">
          {QUESTIONS.map(faq => (
            <li key={faq.question}>
              <Card>
                <HeadingText className="mb-4">{faq.question}</HeadingText>

                <SmallText>{faq.answer}</SmallText>
              </Card>
            </li>
          ))}
        </Columns>
      </div>
    </Section>
  )
}

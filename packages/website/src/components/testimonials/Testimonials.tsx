import { Background, Columns, ParagraphText, TitleText } from 'components'
import React from 'react'

import { routes } from '@/routes'

import { Container } from '../container/Container'
import { Section } from '../section/Section'
import { Testimonial, TestimonialProps } from './Testimonial'

const TITLE = 'Loved by businesses worldwide.'

const TESTIMONIALS: TestimonialProps[] = [
  {
    name: 'John Doe',
    title: 'CEO',
    company: 'Company',
    testimonial:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: 'https://gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    name: 'John Doe 2',
    title: 'CEO',
    company: 'Company',
    testimonial:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: 'https://gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
  {
    name: 'John Doe 3',
    title: 'CEO',
    company: 'Company',
    testimonial:
      'Launchpad is the ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and TypeScript.',
    image: 'https://gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  },
]

export const Testimonials = () => {
  return (
    <Section id={routes.testimonials.replace('/#', '')} aria-label={TITLE} className="relative">
      <Background variant="inverted" className="absolute inset-0" />

      <div className="relative">
        <Container>
          <TitleText>{TITLE}</TitleText>

          <ParagraphText>
            The ultimate boilerplate for building SAAS applications with React, Firebase, Stripe, Tailwind CSS and
            TypeScript.
          </ParagraphText>
        </Container>

        <Columns className="mt-16">
          {TESTIMONIALS.length &&
            TESTIMONIALS.map(testimonial => (
              <li key={testimonial.name}>
                <Testimonial
                  name={testimonial.name}
                  title={testimonial.title}
                  company={testimonial.company}
                  testimonial={testimonial.testimonial}
                  image={testimonial.image}
                />
              </li>
            ))}
        </Columns>
      </div>
    </Section>
  )
}
